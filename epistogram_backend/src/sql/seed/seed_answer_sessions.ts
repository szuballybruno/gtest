import { AnswerSession } from '../../models/entity/AnswerSession';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { UserSeedDataType } from './seed_users';

export const getAnswerSessionSeedData = (users: UserSeedDataType) => getSeedList<AnswerSession>()({
    answer_session_1: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.god.id,
        isCompleted: false
    },
    answer_session_2: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.almostGod.id,
        isCompleted: false
    },
    answer_session_3: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_3.id,
        isCompleted: false
    },
    answer_session_4: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_4.id,
        isCompleted: false
    },
    answer_session_5: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_5.id,
        isCompleted: false
    },
    answer_session_6: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_6.id,
        isCompleted: false
    },
    answer_session_7: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_7.id,
        isCompleted: false
    },
    answer_session_8: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_8.id,
        isCompleted: false
    },
    answer_session_9: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_9.id,
        isCompleted: false
    },
    answer_session_10: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_10.id,
        isCompleted: false
    },
    answer_session_11: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_11.id,
        isCompleted: false
    },
    answer_session_12: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_12.id,
        isCompleted: false
    },
    answer_session_13: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_13.id,
        isCompleted: false
    },
    answer_session_14: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_14.id,
        isCompleted: false
    },
    answer_session_15: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_15.id,
        isCompleted: false
    },
    answer_session_16: {
        startDate: null,
        endDate: null,
        isPractise: true,
        examVersionId: null,
        videoVersionId: null,
        userId: users.user_kovacskrisz.id,
        isCompleted: false
    }
});

export type AnswerSessionSeedDataType = ReturnType<typeof getAnswerSessionSeedData>;