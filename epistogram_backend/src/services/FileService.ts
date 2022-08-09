import { UploadedFile } from 'express-fileupload';
import { StorageFile } from '../models/entity/StorageFile';
import { User } from '../models/entity/User';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { Id } from '../shared/types/versionId';
import { fileCodes, FileCodesType } from '../static/FileCodes';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { StringKeyof } from '../utilities/misc';
import { ClassType } from './misc/advancedTypes/ClassType';
import { log } from './misc/logger';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { StorageService } from './StorageService';
import { UserService } from './UserService';
import { EntityType } from './XORM/XORMTypes';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { AuthorizationService } from './AuthorizationService';

export class FileService {

    private _userService: UserService;
    private _storageService: StorageService;
    private _ormService: ORMConnectionService;
    private _authorizationService: AuthorizationService;

    constructor(
        userService: UserService,
        storageService: StorageService,
        ormService: ORMConnectionService,
        authorizationService: AuthorizationService) {

        this._userService = userService;
        this._storageService = storageService;
        this._ormService = ormService;
        this._authorizationService = authorizationService;
    }

    uploadAvatarFileAsync(principalId: PrincipalId, file: UploadedFile): ControllerActionReturnType {

        return {
            action: async () => {
                const userId = principalId.getId();

                //TODO: Create a validation function
                if (!['image/png', 'image/jpeg'].includes(file.mimetype))
                    throw new ErrorWithCode('File upload failed: Only jpeg or png', 'bad request');

                await this
                    .uploadAssigendFileAsync({
                        entityId: userId,
                        entitySignature: User,
                        fileBuffer: file.data,
                        fileCode: 'user_avatar',
                        storageFileIdField: 'avatarFileId'
                    });
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    async uploadAssigendFileAsync<TField extends StringKeyof<T>, T extends EntityType>({
        entitySignature,
        fileBuffer,
        fileCode,
        storageFileIdField,
        entityId
    }: {
        entityId: Id<any>,
        fileCode: FileCodesType,
        entitySignature: ClassType<T>,
        storageFileIdField: TField,
        fileBuffer: Buffer,
    }) {

        // path
        const newCDNFilePath = this.getFilePath(fileCode, entityId);

        // upload to storage
        await this._storageService
            .uploadBufferToStorageAsync(fileBuffer, newCDNFilePath);

        /**
         * All operations after uploading file 
         * to CDN are in a try block, because if there's a failure,
         * we have to revert the upload manually.
         * DB operations will be reverted automatically, 
         * since we are in a global transaction scope.
         */
        try {

            // crate pending storage file
            const newStorageFileEntityId = await this
                ._insertFileEntityAsync(newCDNFilePath);

            // get entity
            const entity = await this._ormService
                .query(entitySignature, { entityId })
                .where('id', '=', 'entityId')
                .getSingle();

            // get old file id 
            const oldStorageFileId = entity[storageFileIdField] as any as Id<any> | null;

            // save entity
            const saveData = { id: entityId } as T;
            (saveData as any)[storageFileIdField] = newStorageFileEntityId;
            await this._ormService
                .save(entitySignature, saveData);

            // delete previous file, and file entity
            if (oldStorageFileId) {

                const oldFileEntity = await this.getFileEntityAsync(oldStorageFileId);

                try {

                    // TODO delete temporarily disabled
                    // since while testing, we don't want to lose 
                    // files from the dev bucket 

                    // await this.deleteFileEntityAsync(oldStorageFileId);
                    // await this._storageService
                    //     .deleteStorageFileAsync(oldFileEntity.filePath);
                }
                catch (e) {

                    log(e, { entryType: 'warning' });
                }
            }
        }
        catch (e) {

            /**
             * In case of any failure, 
             * delete file from storage bucket
             */
            await this._storageService
                .deleteStorageFileAsync(newCDNFilePath);

            /**
             * Than throw the error.
             */
            throw e;
        }
    }

    getFilePath = (fileType: FileCodesType, entityId: Id<any>) => {

        const extension = fileCodes[fileType][0];

        return `${fileType}_container/${fileType}_${entityId}_${Date.now()}.${extension}`;
    };

    deleteFileEntityAsync = async (id: Id<'any'>) => {

        await this._ormService
            .hardDelete(StorageFile, [id]);
    };

    private async _insertFileEntityAsync(path: string) {

        return await this._ormService
            .createAsync(StorageFile, {
                filePath: path
            });
    }

    getFileEntityAsync = (id: Id<any>) => {

        return this._ormService
            .getSingleById(StorageFile, id);
    };
}