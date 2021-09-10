import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { staticProvider } from "../staticProvider";
import { hasValue } from "../utilities/helpers";
import { getCourseItemAsync, getCourseItemDTOsAsync, getCurrentCourseItemDescriptor, getExamDTOAsync } from "./courseService";
import { readCourseItemDescriptorCode } from "./encodeService";
import { toVideoDTO } from "./mappings";
import { createAnswerSessionAsync } from "./questionAnswerService";
import { getUserById } from "./userService";
import { getSampleChunksAsync, getVideoWatchedPercentAsync, squishSamplesAsync } from "./videoPlaybackSampleService";
import { getVideoPlaybackData, saveVideoPlaybackDataAsync } from "./videoService";

export const getPlayerDataAsync = async (
    userId: number,
    descriptorCode: string) => {

    const { itemId: courseItemId, itemType: courseItemType } = readCourseItemDescriptorCode(descriptorCode);

    // get course item
    const currentCourseItem = await getCourseItemAsync({ itemId: courseItemId, itemType: courseItemType });

    const videoDTO = courseItemType == "video" ? toVideoDTO(currentCourseItem as Video) : null;
    const videoId = courseItemType == "video" ? courseItemId : null;

    const examDTO = courseItemType == "exam" ? await getExamDTOAsync(userId, courseItemId) : null;
    const examId = courseItemType == "exam" ? courseItemId : null;

    // set current course item
    await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            currentVideoId: videoId,
            currentExamId: examId
        });

    // get new answer session
    const answerSessionId = await createAnswerSessionAsync(userId, examId, videoId);

    return {
        video: videoDTO,
        exam: examDTO,
        answerSessionId: answerSessionId
    } as PlayerDataDTO;
}

export const saveVideoPlaybackSample = async (userId: number, dto: VideoPlaybackSampleDTO) => {

    const user = await getUserById(userId);
    const currentItemDesc = getCurrentCourseItemDescriptor(user);

    if (!currentItemDesc)
        throw new Error("Cannot add video playback sample while current course item is not set!");

    if (currentItemDesc.itemType !== "video")
        throw new Error("Cannot add video playback sample while current course item is not a video!");

    const videoId = currentItemDesc.itemId;

    await staticProvider
        .ormConnection
        .getRepository(VideoPlaybackSample)
        .insert({
            videoId: videoId,
            userId: userId,
            fromSeconds: dto.fromSeconds,
            toSeconds: dto.toSeconds
        });

    // get sample chunks
    const chunks = await getSampleChunksAsync(userId, videoId);

    // calucate and save watched percent
    const watchedPercent = await getVideoWatchedPercentAsync(userId, videoId, chunks);
    const newIsWatchedState = isVideoConsideredWatched(watchedPercent);

    // get old watched state, can be null on first sampling.
    const oldIsWatchedState = await getOldIsWatchedState(userId, videoId);

    // squish chunks to store less data 
    await squishSamplesAsync(userId, videoId, chunks);
    await saveVideoPlaybackDataAsync(userId, videoId, watchedPercent, newIsWatchedState);

    // calculate is watched state changed
    // 
    const isWatchedStateChanged = hasValue(oldIsWatchedState)
        ? oldIsWatchedState != newIsWatchedState
        : newIsWatchedState;

    return isWatchedStateChanged;
}

const isVideoConsideredWatched = (watchedPercent: number) => {

    // 10% is a very low number only for development
    const percentReached = watchedPercent > 10;

    return percentReached;
}

const getOldIsWatchedState = async (userId: number, videoId: number) => {

    const videoPlaybackData = await getVideoPlaybackData(userId, videoId);
    if (!videoPlaybackData)
        return null;

    const oldIsWatchedState = isVideoConsideredWatched(videoPlaybackData!.watchedPercent);

    return oldIsWatchedState;
}
