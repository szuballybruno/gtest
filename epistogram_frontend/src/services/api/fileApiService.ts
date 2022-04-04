import { apiRoutes } from '../../shared/types/apiRoutes';
import { usePostMultipartDataUnsafe } from '../core/httpClient';

export const useUploadAvatarFile = () => {

    const { postMultipartDataAsync, state } = usePostMultipartDataUnsafe(apiRoutes.file.uploadUserAvatar);

    return {
        postAvatarFileAsync: (file: File) => postMultipartDataAsync(undefined, file),
        postAvatarFileState: state
    };
};