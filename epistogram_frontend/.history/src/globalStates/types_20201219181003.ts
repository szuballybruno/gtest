//FELHASZNÁLÓ

export type userData = {
    timeOfAdd?: number
    role: string,
    innerRole: string,
    username: string,
    firstName: string
    lastName: string,
    email: string,
    supervisorId?: string,
    currentVideoId?: string,
    currentCourseId?: string
}

export type userStatistics = {
    pageName: string,
    pageViewStartDate: number,
    pageViewEndDate: number,
    pageViewLengthInMinutes: number,
    sessionStartDate: number,
    sessionEndDate: number,
    sessionLengthInMinutes: number,
    timeOfVideoWatchStart: number,
    watchedVideoId: string,
    watchTimeInMinutes: number,
    videoPauseTimes: number,
    overlayId?: string,
    isOverlayDone?: boolean,
    isOverlayAnswerTrue?: boolean,
    voteId: string,
    voteValue: string,
    timeOfVote: number
}

export type user = {
    _id: string
    userData: userData
    //userStatistics: userStatistics
}

//VIDEÓ

export type overlayData = {
    overlayType: number,
    overlayQuestion: string,
    overlayTimecode: number,
    overlayAnswers: overlayDataAnswer[]
}

export type overlayDataAnswer = {
    answer: string,
    isTheAnswerTrue: boolean
}

export type video = {
    _id: string,
    videoMainTitle: string,
    videoSubTitle: string,
    videoUrl: string,
    videoLength: number,
    videoDescription: string,
    videoThumbnailUrl: string,
    overlayData: overlayData,
}

//KURZUS

export type course = {
    _id: string,
    name: string,
    category: string,
    group: string,
    creatorId: string,
    teacherId: string,
    supervisorId: string,
    organizationId: string
    teacherName: string,
    courseLength: number
    colorOne: string
    colorTwo: string
}






//SZAVAZÁS
export type vote = {
    responseText: string,
    _id: string,
    voteQuestion: string,
    voteFirstAnswerName: string,
    voteFirstAnswerPath: string,
    voteSecondAnswerName: string,
    voteSecondAnswerPath: string,
    voteAnswersCount: number,
    voteFirstAnswerCount: number,
    voteSecondAnswerCount: number
}