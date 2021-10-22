import { UploadedFile } from "express-fileupload";
import { StorageFile } from "../models/entity/StorageFile";
import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { staticProvider } from "../staticProvider";
import { deleteStorageFileAsync, uploadToStorageAsync } from "./storageService";
import { getUserById, setUserAvatarFileId } from "./userService";
import { getVideoByIdAsync, setVideoFileIdAsync, setVideoThumbnailFileId } from "./videoService";

export const uploadVideoFileAsync = (videoId: number, file: UploadedFile) => {

    return uploadAssigendFileAsync<Video>(
        getFilePath("videos", "video", videoId, "mp4"),
        () => getVideoByIdAsync(videoId),
        (fileId) => setVideoFileIdAsync(videoId, fileId),
        (entity) => entity.videoFileId,
        file);
}

export const uploadVideoThumbnailFileAsync = (videoId: number, file: UploadedFile) => {

    return uploadAssigendFileAsync<Video>(
        getFilePath("videoThumbnails", "video_thumbnail", videoId, "png"),
        () => getVideoByIdAsync(videoId),
        (fileId) => setVideoThumbnailFileId(videoId, fileId),
        (entity) => entity.thumbnailFileId,
        file);
};

export const uploadAvatarFileAsync = async (userId: number, file: UploadedFile) => {
    // upload new avatar
    await uploadAssigendFileAsync<User>(
        getFilePath("userAvatars", "user_avatar", userId, "png"),
        () => getUserById(userId),
        (fileId) => setUserAvatarFileId(userId, fileId),
        (entity) => entity.avatarFileId,
        file);
};

export const uploadCourseCoverFileAsync = (courseId: number, file: UploadedFile) => {

    // return uploadAssigendFileAsync<Video>(
    //     getFilePath("videos", "video_thumbnail", videoId, ".png"),
    //     () => getVideoByIdAsync(videoId),
    //     (fileId) => setVideoThumbnailFileId(videoId, fileId),
    //     (entity) => entity.thumbnailFileId,
    //     file);

    return Promise.resolve();
};

const uploadAssigendFileAsync = async <T>(
    filePath: string,
    getEntityAsync: () => Promise<T>,
    assignFileToEntity: (fileId: number) => Promise<void>,
    getFileEntityId: (entity: T) => number,
    file: UploadedFile) => {

    // crate pending storage file
    const newStorageFileEntity = await insertFileEntityAsync(filePath);

    // get entity
    const entity = await getEntityAsync();

    // assing to entity
    await assignFileToEntity(newStorageFileEntity.id);

    // delete previous file, and file entity
    const oldFileEntityId = getFileEntityId(entity);
    if (oldFileEntityId) {

        const oldFileEntity = await getFileEntityAsync(oldFileEntityId)
        await deleteFileEntityAsync(oldFileEntityId);

        await deleteStorageFileAsync(oldFileEntity.filePath);
    }

    // upload to storage
    await uploadToStorageAsync(file, filePath);
}

const getFilePath = (folderPath: string, fileType: string, fileId: number, extension: string) => {

    return `${folderPath}/${fileType}_${fileId}_${Date.now()}.${extension}`
}

const deleteFileEntityAsync = async (id: number) => {

    await staticProvider
        .ormConnection
        .getRepository(StorageFile)
        .delete(id);
}

const insertFileEntityAsync = async (path: string) => {

    const file = {
        filePath: path
    } as StorageFile;

    await staticProvider
        .ormConnection
        .getRepository(StorageFile)
        .insert(file);

    return file;
}

const getFileEntityAsync = (id: number) => {

    return staticProvider
        .ormConnection
        .getRepository(StorageFile)
        .findOneOrFail(id);
}
