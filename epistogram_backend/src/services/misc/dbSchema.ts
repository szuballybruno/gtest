import { ActivationCode } from '../../models/entity/ActivationCode';
import { ActivitySession } from '../../models/entity/ActivitySession';
import { ActivityStreak } from '../../models/entity/ActivityStreak';
import { Answer } from '../../models/entity/answer/Answer';
import { AnswerData } from '../../models/entity/answer/AnswerData';
import { AnswerVersion } from '../../models/entity/answer/AnswerVersion';
import { AnswerGivenAnswerBridge } from '../../models/entity/AnswerGivenAnswerBridge';
import { AnswerSession } from '../../models/entity/AnswerSession';
import { CompanyOwnerBridge } from '../../models/entity/authorization/CompanyOwnerBridge';
import { Permission } from '../../models/entity/authorization/Permission';
import { PermissionAssignmentBridge } from '../../models/entity/authorization/PermissionAssignmentBridge';
import { Role } from '../../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { RolePermissionBridge } from '../../models/entity/authorization/RolePermissionBridge';
import { CoinTransaction } from '../../models/entity/CoinTransaction';
import { Comment } from '../../models/entity/Comment';
import { Company } from '../../models/entity/Company';
import { ConstantValue } from '../../models/entity/ConstantValue';
import { Course } from '../../models/entity/course/Course';
import { CourseData } from '../../models/entity/course/CourseData';
import { CourseVersion } from '../../models/entity/course/CourseVersion';
import { CourseAccessBridge } from '../../models/entity/CourseAccessBridge';
import { CourseCategory } from '../../models/entity/CourseCategory';
import { CourseCompletion } from '../../models/entity/CourseCompletion';
import { CourseItemCompletion } from '../../models/entity/CourseItemCompletion';
import { CourseRatingGroup } from '../../models/entity/courseRating/CourseRatingGroup';
import { CourseRatingQuestion } from '../../models/entity/courseRating/CourseRatingQuestion';
import { CourseRatingQuestionUserAnswer } from '../../models/entity/courseRating/CourseRatingQuestionUserAnswer';
import { DailyTip } from '../../models/entity/DailyTip';
import { DailyTipOccurrence } from '../../models/entity/DailyTipOccurrence';
import { DiscountCode } from '../../models/entity/DiscountCode';
import { Event } from '../../models/entity/Event';
import { Exam } from '../../models/entity/exam/Exam';
import { ExamData } from '../../models/entity/exam/ExamData';
import { ExamVersion } from '../../models/entity/exam/ExamVersion';
import { GivenAnswer } from '../../models/entity/GivenAnswer';
import { GivenAnswerStreak } from '../../models/entity/GivenAnswerStreak';
import { Group } from '../../models/entity/Group';
import { JobTitle } from '../../models/entity/JobTitle';
import { Like } from '../../models/entity/Like';
import { Module } from '../../models/entity/module/Module';
import { ModuleData } from '../../models/entity/module/ModuleData';
import { ModuleVersion } from '../../models/entity/module/ModuleVersion';
import { PersonalityTraitCategory } from '../../models/entity/PersonalityTraitCategory';
import { VideoPlaybackSample } from '../../models/entity/playback/VideoPlaybackSample';
import { VideoPlaybackSession } from '../../models/entity/playback/VideoPlaybackSession';
import { VideoSeekEvent } from '../../models/entity/playback/VideoSeekEvent';
import { PrequizAnswer } from '../../models/entity/prequiz/PrequizAnswer';
import { PrequizCompletion } from '../../models/entity/prequiz/PrequizCompletion';
import { PrequizQuestion } from '../../models/entity/prequiz/PrequizQuestion';
import { PrequizUserAnswer } from '../../models/entity/prequiz/PrequizUserAnswer';
import { Question } from '../../models/entity/question/Question';
import { QuestionData } from '../../models/entity/question/QuestionData';
import { QuestionVersion } from '../../models/entity/question/QuestionVersion';
import { QuestionType } from '../../models/entity/QuestionType';
import { ShopItem } from '../../models/entity/ShopItem';
import { ShopItemCategory } from '../../models/entity/ShopItemCategory';
import { StorageFile } from '../../models/entity/StorageFile';
import { Task } from '../../models/entity/Task';
import { TeacherInfo } from '../../models/entity/TeacherInfo';
import { TempomatAdjustmentValue } from '../../models/entity/TempomatAdjustmentValue';
import { User } from '../../models/entity/User';
import { UserCourseBridge } from '../../models/entity/UserCourseBridge';
import { UserSessionActivity } from '../../models/entity/UserSessionActivity';
import { UserVideoProgressBridge } from '../../models/entity/UserVideoProgressBridge';
import { Video } from '../../models/entity/video/Video';
import { VideoData } from '../../models/entity/video/VideoData';
import { VideoFile } from '../../models/entity/video/VideoFile';
import { VideoVersion } from '../../models/entity/video/VideoVersion';
import { VideoRating } from '../../models/entity/VideoRating';
import { ActivityStreakView } from '../../models/views/ActivityStreakView';
import { AdminUserListView } from '../../models/views/AdminUserListView';
import { AnswerSessionGroupView } from '../../models/views/AnswerSessionGroupView';
import { AnswerSessionView } from '../../models/views/AnswerSessionView';
import { AvailableCourseView } from '../../models/views/AvailableCourseView';
import { CoinBalanceView } from '../../models/views/CoinBalanceView';
import { CoinTransactionView } from '../../models/views/CoinTransactionView';
import { CommentListView } from '../../models/views/CommentListView';
import { CorrectAnswerRatesSplitView } from '../../models/views/CorrectAnswerRatesSplitView';
import { CourseAdminContentView } from '../../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../../models/views/CourseAdminDetailedView';
import { CourseAdminShortView } from '../../models/views/CourseAdminShortView';
import { CourseAllItemsCompletedView } from '../../models/views/CourseAllItemsCompletedView';
import { CourseDetailsView } from '../../models/views/CourseDetailsView';
import { CourseItemEditView } from '../../models/views/CourseItemEditView';
import { PlaylistView } from '../../models/views/PlaylistView';
import { CourseLearningStatsView } from '../../models/views/CourseLearningStatsView';
import { CourseModuleOverviewView } from '../../models/views/CourseModuleOverviewView';
import { CourseOverviewView } from '../../models/views/CourseOverviewView';
import { CourseProgressView } from '../../models/views/CourseProgressView';
import { CourseRatingQuestionView } from '../../models/views/CourseRatingQuestionView';
import { CourseShopItemListView } from '../../models/views/CourseShopItemListView';
import { CoursesProgressListView } from '../../models/views/CoursesProgressListView';
import { DailyTipView } from '../../models/views/DailyTipView';
import { ExamCompletedView } from '../../models/views/ExamCompletedView';
import { ExamPlayerDataView } from '../../models/views/ExamPlayerDataView';
import { ExamResultStatsView } from '../../models/views/ExamResultStatsView';
import { ExamResultView } from '../../models/views/ExamResultView';
import { ExamScoreView } from '../../models/views/ExamScoreView';
import { ExamVersionView } from '../../models/views/ExamVersionView';
import { GivenAnswerScoreView } from '../../models/views/GivenAnswerScoreView';
import { HomePageStatsView } from '../../models/views/HomePageStatsView';
import { ImproveYourselfPageStatsView } from '../../models/views/ImproveYourselfPageStatsView';
import { LatestCourseVersionView } from '../../models/views/LatestCourseVersionView';
import { LatestExamView } from '../../models/views/LatestExamView';
import { LatestVideoView } from '../../models/views/LatestVideoView';
import { ModuleEditView } from '../../models/views/ModuleEditView';
import { ModulePlayerView } from '../../models/views/ModulePlayerView';
import { MostProductiveTimeRangeView } from '../../models/views/MostProductiveTimeRangeView';
import { PersonalityTraitCategoryView } from '../../models/views/PersonalityTraitCategoryView';
import { PersonalityTraitView } from '../../models/views/PersonalityTraitView';
import { PractiseQuestionView } from '../../models/views/PractiseQuestionView';
import { PrequizQuestionView } from '../../models/views/PrequizQuestionView';
import { PretestResultView } from '../../models/views/PretestResultView';
import { QuestionDataView } from '../../models/views/QuestionDataView';
import { ShopItemStatefulView } from '../../models/views/ShopItemStatefulView';
import { ShopItemView } from '../../models/views/ShopItemView';
import { SignupCompletedView } from '../../models/views/SignupCompletedView';
import { SignupQuestionView } from '../../models/views/SignupQuestionView';
import { TempomatCalculationDataView } from '../../models/views/TempomatCalculationDataView';
import { UserActiveCourseView } from '../../models/views/UserActiveCourseView';
import { UserAnswerView } from '../../models/views/UserAnswerView';
import { UserCourseBridgeView } from '../../models/views/UserCourseBridgeView';
import { UserCourseCompletionCurrentView } from '../../models/views/UserCourseCompletionCurrentView';
import { UserCourseCompletionOriginalEstimationView } from '../../models/views/UserCourseCompletionOriginalEstimationView';
import { UserCourseProgressView } from '../../models/views/UserCourseProgressView';
import { UserCourseStatsView } from '../../models/views/UserCourseStatsView';
import { UserDailyActivityChartView } from '../../models/views/UserDailyActivityChartView';
import { UserDailyCourseItemProgressView } from '../../models/views/UserDailyCourseItemProgressView';
import { UserDailyProgressView } from '../../models/views/UserDailyProgressView';
import { UserEngagementView } from '../../models/views/UserEngagementView';
import { UserExamStatsView } from '../../models/views/UserExamStatsView';
import { UserInactiveCourseView } from '../../models/views/UserInactiveCourseView';
import { UserLearningOverviewStatsView } from '../../models/views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from '../../models/views/UserLearningPageStatsView';
import { UserPerformanceAnswerGroupView } from '../../models/views/UserPerformanceAnswerGroupView';
import { UserPerformanceView } from '../../models/views/UserPerformanceView';
import { UserPractiseRecommendationView } from '../../models/views/UserPractiseRecommendationView';
import { UserReactionTimeView } from '../../models/views/UserReactionTimeView';
import { UserRoleAssignCompanyView } from '../../models/views/UserRoleAssignCompanyView';
import { UserRoleView } from '../../models/views/UserRoleView';
import { UserSessionDailyView } from '../../models/views/UserSessionDailyView';
import { UserSessionView } from '../../models/views/UserSessionView';
import { UserSpentTimeRatioView } from '../../models/views/UserSpentTimeRatioView';
import { UserVideoPractiseProgressView } from '../../models/views/UserVideoPractiseProgressView';
import { UserVideoStatsView } from '../../models/views/UserVideoStatsView';
import { UserWeeklyCourseItemProgressView } from '../../models/views/UserWeeklyCourseItemProgressView';
import { VideoCursorSecondsView } from '../../models/views/VideoCursorSecondsView';
import { VideoPlayerDataView } from '../../models/views/VideoPlayerDataView';
import { VideoVersionView } from '../../models/views/VideoVersionView';
import { getActivationCodeSeedData } from '../../sql/seed/seed_activation_codes';
import { getAnswersSeedData } from '../../sql/seed/seed_answers';
import { getAnswerDatasSeedData } from '../../sql/seed/seed_answer_datas';
import { getAnswerSessionSeedData } from '../../sql/seed/seed_answer_sessions';
import { getAnswerVersionsSeedData } from '../../sql/seed/seed_answer_versions';
import { getCommentsSeedData } from '../../sql/seed/seed_comments';
import { getCompaniesSeedData } from '../../sql/seed/seed_companies';
import { getCompanyOwnerBridgeSeedData } from '../../sql/seed/seed_company_owner_bridges';
import { getConstantValuesSeedData } from '../../sql/seed/seed_constant_values';
import { getCourseSeedData } from '../../sql/seed/seed_courses';
import { getCourseAccessBridgeSeedData } from '../../sql/seed/seed_course_access_bridge';
import { getCourseCategoriesSeedData } from '../../sql/seed/seed_course_categories';
import { getCourseDatasSeedData } from '../../sql/seed/seed_course_datas';
import { getCourseRatingGroupSeedData } from '../../sql/seed/seed_course_rating_groups';
import { getCourseRatingQuestionSeedData } from '../../sql/seed/seed_course_rating_question';
import { getCourseVersionsSeedData } from '../../sql/seed/seed_course_versions';
import { getDailyTipsSeed } from '../../sql/seed/seed_daily_tips';
import { getDiscountCodesSeedData } from '../../sql/seed/seed_discount_codes';
import { getExamSeedData } from '../../sql/seed/seed_exams';
import { getExamDatasSeedData } from '../../sql/seed/seed_exam_datas';
import { getExamVersionsSeedData } from '../../sql/seed/seed_exam_versions';
import { getJobTitlesSeedData } from '../../sql/seed/seed_job_titles';
import { getModulesSeedData } from '../../sql/seed/seed_modules';
import { getModuleDatasSeedData } from '../../sql/seed/seed_module_datas';
import { getModuleVersionsSeedData } from '../../sql/seed/seed_module_versions';
import { getPermissionsSeedData } from '../../sql/seed/seed_permissions';
import { getPermissionAssignmentBridgeSeedData } from '../../sql/seed/seed_permission_assignment_bridges';
import { getPersonalityTraitCategoriesSeed } from '../../sql/seed/seed_personality_trait_categories';
import { getPrequizAnswersSeedData } from '../../sql/seed/seed_prequiz_answers';
import { getPrequizQuestionsSeedData } from '../../sql/seed/seed_prequiz_questions';
import { getPrequizUserAnswerSeedData } from '../../sql/seed/seed_prequiz_user_answer';
import { getQuestionSeedData } from '../../sql/seed/seed_questions';
import { getQuestionDatasSeedData } from '../../sql/seed/seed_question_datas';
import { getQuestionTypeSeedData } from '../../sql/seed/seed_question_types';
import { getQuestionVersionsSeedData } from '../../sql/seed/seed_question_versions';
import { getRolesSeedData } from '../../sql/seed/seed_roles';
import { getRoleAssignmentBridgeSeedData } from '../../sql/seed/seed_role_assignment_bridges';
import { getRolePermissionBridgeSeedData } from '../../sql/seed/seed_role_permission_bridges';
import { getShopItemSeedData } from '../../sql/seed/seed_shop_items';
import { getShopItemCategoriesSeedData } from '../../sql/seed/seed_shop_item_categories';
import { getStorageFileSeedData } from '../../sql/seed/seed_storage_file';
import { getTeacherInfoSeedData } from '../../sql/seed/seed_teacher_info';
import { getTempomatAdjustmentValueSeedData } from '../../sql/seed/seed_tempomat_adjustment_values';
import { getUserSeedData } from '../../sql/seed/seed_users';
import { getUserCourseBridgeSeedData } from '../../sql/seed/seed_user_course_bridges';
import { getUserVideoProgressBridgeSeedData } from '../../sql/seed/seed_user_video_progress_bridges';
import { getVideosSeedData } from '../../sql/seed/seed_videos';
import { getVideoDataSeedData } from '../../sql/seed/seed_video_datas';
import { getVideoFilesSeedData } from '../../sql/seed/seed_video_files';
import { getVideoVersionSeedData } from '../../sql/seed/seed_video_versions';
import { XDependency } from '../../utilities/XDInjection/XDInjector';
import { XDBMSchemaType } from '../XDBManager/XDBManagerTypes';
import { ParametrizedFunction } from './advancedTypes/ParametrizedFunction';

export const createDBSchema = (): XDBMSchemaType => {

    const hierarchy = XDependency
        .getFunctionBuilder()
        .addFunction(getConstantValuesSeedData, [], ConstantValue)
        .addFunction(() => 1, [], CourseItemCompletion)
        .addFunction(getQuestionTypeSeedData, [], QuestionType)
        .addFunction(getPermissionsSeedData, [], Permission)
        .addFunction(getJobTitlesSeedData, [], JobTitle)
        .addFunction(getCompaniesSeedData, [], Company)
        .addFunction(() => 1, [], CourseCompletion)
        .addFunction(getStorageFileSeedData, [], StorageFile)
        .addFunction(getPersonalityTraitCategoriesSeed, [], PersonalityTraitCategory)
        .addFunction(getQuestionDatasSeedData, [], QuestionData)
        .addFunction(getCourseCategoriesSeedData, [], CourseCategory)
        .addFunction(getCourseRatingGroupSeedData, [], CourseRatingGroup)
        .addFunction(getShopItemCategoriesSeedData, [], ShopItemCategory)
        .addFunction(getPrequizQuestionsSeedData, [], PrequizQuestion)
        .addFunction(getExamDatasSeedData, [], ExamData)
        .addFunction(getVideosSeedData, [], Video)
        .addFunction(getExamSeedData, [], Exam)
        .addFunction(getModulesSeedData, [], Module)
        .addFunction(getCourseSeedData, [], Course)
        .addFunction(getQuestionSeedData, [], Question)
        .addFunction(getAnswersSeedData, [], Answer)
        .addFunction(getActivationCodeSeedData, [getCompaniesSeedData], ActivationCode)
        .addFunction(getRolesSeedData, [getCompaniesSeedData], Role)
        .addFunction(getRolePermissionBridgeSeedData, [getPermissionsSeedData, getRolesSeedData], RolePermissionBridge)
        .addFunction(getPrequizAnswersSeedData, [getPrequizQuestionsSeedData], PrequizAnswer)
        .addFunction(getTempomatAdjustmentValueSeedData, [getPrequizAnswersSeedData], TempomatAdjustmentValue)
        .addFunction(getShopItemSeedData, [getStorageFileSeedData, getShopItemCategoriesSeedData], ShopItem)
        .addFunction(getDiscountCodesSeedData, [getShopItemSeedData], DiscountCode)
        .addFunction(getCourseRatingQuestionSeedData, [getCourseRatingGroupSeedData], CourseRatingQuestion)
        .addFunction(getUserSeedData, [getCompaniesSeedData, getJobTitlesSeedData], User)
        .addFunction(getCompanyOwnerBridgeSeedData, [getUserSeedData, getCompaniesSeedData], CompanyOwnerBridge)
        .addFunction(getTeacherInfoSeedData, [getUserSeedData], TeacherInfo)
        .addFunction(getAnswerSessionSeedData, [getUserSeedData], AnswerSession)
        .addFunction(getCourseDatasSeedData, [getCourseCategoriesSeedData, getStorageFileSeedData, getUserSeedData], CourseData)
        .addFunction(getModuleDatasSeedData, [getCourseDatasSeedData], ModuleData)
        .addFunction(getDailyTipsSeed, [getStorageFileSeedData, getPersonalityTraitCategoriesSeed], DailyTip)
        .addFunction(getCourseVersionsSeedData, [getCourseDatasSeedData, getCourseSeedData], CourseVersion)
        .addFunction(getVideoFilesSeedData, [getStorageFileSeedData], VideoFile)
        .addFunction(getVideoDataSeedData, [getVideoFilesSeedData], VideoData)
        .addFunction(getModuleVersionsSeedData, [getCourseVersionsSeedData, getModuleDatasSeedData, getModulesSeedData], ModuleVersion)
        .addFunction(getVideoVersionSeedData, [getVideoDataSeedData, getVideosSeedData, getModuleVersionsSeedData], VideoVersion)
        .addFunction(getExamVersionsSeedData, [getModuleVersionsSeedData, getExamDatasSeedData, getExamSeedData], ExamVersion)
        .addFunction(getCommentsSeedData, [getVideoVersionSeedData, getUserSeedData], Comment)
        .addFunction(getQuestionVersionsSeedData, [getQuestionSeedData, getQuestionDatasSeedData, getExamVersionsSeedData, getVideoVersionSeedData, getPersonalityTraitCategoriesSeed], QuestionVersion)
        .addFunction(getAnswerDatasSeedData, [getQuestionDatasSeedData], AnswerData)
        .addFunction(getAnswerVersionsSeedData, [getAnswersSeedData, getAnswerDatasSeedData, getQuestionVersionsSeedData], AnswerVersion)
        .addFunction(getCourseAccessBridgeSeedData, [getCompaniesSeedData, getCourseSeedData], CourseAccessBridge)
        .addFunction(getUserCourseBridgeSeedData, [getUserSeedData, getCourseSeedData, getVideosSeedData], UserCourseBridge)
        .addFunction(getUserVideoProgressBridgeSeedData, [getUserSeedData, getVideoVersionSeedData, getVideoFilesSeedData], UserVideoProgressBridge)
        .addFunction(getRoleAssignmentBridgeSeedData, [getCompaniesSeedData, getRolesSeedData, getUserSeedData], RoleAssignmentBridge)
        .addFunction(getPermissionAssignmentBridgeSeedData, [getCompaniesSeedData, getCourseSeedData, getPermissionsSeedData, getUserSeedData], PermissionAssignmentBridge)
        .addFunction(getPrequizUserAnswerSeedData, [getUserSeedData, getCourseSeedData, getPrequizQuestionsSeedData, getPrequizAnswersSeedData], PrequizUserAnswer)
        .getContainer();

    const { itemInstancePairs } = XDependency
        .instantiate(hierarchy);

    const getSeedData = <T extends ParametrizedFunction>(fn: T): ReturnType<T> => {

        return itemInstancePairs
            .single(x => x[0].key.name === fn.name)[1];
    };

    const seedScripts = itemInstancePairs
        .map(([item, instance]): [Function, any] => {

            return [item.params, instance];
        });

    const schema: XDBMSchemaType = {
        seed: {
            data: seedScripts,
            getSeedData
        },
        
        views: [
            GivenAnswerScoreView,
            ActivityStreakView,
            AnswerSessionView,
            CoinBalanceView,
            CommentListView,
            CourseModuleOverviewView,
            CourseRatingQuestionView,
            LatestCourseVersionView,
            LatestExamView,
            LatestVideoView,
            ModulePlayerView,
            ModuleEditView,
            PersonalityTraitCategoryView,
            PersonalityTraitView,
            PractiseQuestionView,
            PrequizQuestionView,
            ShopItemStatefulView,
            ShopItemView,
            SignupQuestionView,
            UserActiveCourseView,
            UserCourseBridgeView,
            UserPractiseRecommendationView,
            UserRoleView,
            UserSessionView,
            VideoCursorSecondsView,
            VideoVersionView,
            ExamVersionView,
            CourseShopItemListView,
            CourseAllItemsCompletedView,
            ExamScoreView,
            VideoPlayerDataView,
            ExamCompletedView,
            PlaylistView,
            CourseDetailsView,
            AvailableCourseView,
            ExamResultView,
            CourseAdminShortView,
            QuestionDataView,
            UserCourseCompletionOriginalEstimationView,
            UserCourseCompletionCurrentView,
            UserAnswerView,
            UserDailyCourseItemProgressView,
            UserCourseProgressView,
            UserVideoPractiseProgressView,
            TempomatCalculationDataView,
            UserDailyActivityChartView,
            AnswerSessionGroupView,
            CorrectAnswerRatesSplitView,
            UserPerformanceAnswerGroupView,
            UserReactionTimeView,
            MostProductiveTimeRangeView,
            UserSessionDailyView,
            UserPerformanceView,
            SignupCompletedView,
            DailyTipView,
            CourseAdminDetailedView,
            CourseAdminContentView,
            CoinTransactionView,
            CourseItemEditView,
            ExamPlayerDataView,
            PretestResultView,
            UserDailyProgressView,
            UserWeeklyCourseItemProgressView,
            UserRoleAssignCompanyView,
            CourseLearningStatsView,
            ExamResultStatsView,
            CourseProgressView,
            CoursesProgressListView,
            CourseOverviewView,
            UserInactiveCourseView,
            HomePageStatsView,
            UserEngagementView,
            UserLearningOverviewStatsView,
            UserCourseStatsView,
            UserVideoStatsView,
            UserExamStatsView,
            UserSpentTimeRatioView,
            UserLearningPageStatsView,
            ImproveYourselfPageStatsView,
            AdminUserListView
        ],

        functionScripts: [
            'answer_signup_question_fn',
            'acquire_task_lock_fn',
            'answer_question_fn',
            'create_daily_tip_fn',
            'insert_coin_transaction',
            'get_user_session_first_activity_id'
        ],

        constraints: [
            {
                tableName: 'coin_transaction',
                fileName: 'coin_transaction_valid_relation_enforce_constraint'
            },
            {
                tableName: 'activation_code',
                fileName: 'activation_code_uniqe_constraint'
            },
            {
                tableName: 'role_permission_bridge',
                fileName: 'role_permission_bridge_constraint'
            },
            {
                tableName: 'role',
                fileName: 'role_constraint'
            },
            { fileName: 'course_item_completion_constraints' },
            { fileName: 'prequiz_completion_constraints' },
            { fileName: 'course_completion_constraints' }
        ],

        indices: [
            {
                tableName: 'user',
                name: 'user_email_unique_index'
            },
            {
                tableName: 'user_course_bridge',
                name: 'single_current_course_bridge_unique_index'
            }
        ],

        triggers: [
            'role_assignment_validity_check_trigger',
            'exam_pretest_module_integrity_trigger',
            'permission_assignment_validity_check_trigger',
            'role_permission_bridge_validity_trigger',
            'ucb_stage_trigger'
        ],

        entities: [
            PrequizCompletion,
            VideoVersion,
            Video,
            ExamVersion,
            Exam,
            ModuleVersion,
            Module,
            CourseVersion,
            Course,
            AnswerVersion,
            Answer,
            QuestionVersion,
            Question,
            ActivationCode,
            CourseData,
            VideoFile,
            Group,
            CourseCategory,
            ExamData,
            Company,
            User,
            VideoData,
            PermissionAssignmentBridge,
            Task,
            GivenAnswer,
            CompanyOwnerBridge,
            AnswerGivenAnswerBridge,
            QuestionData,
            AnswerData,
            StorageFile,
            AnswerSession,
            VideoPlaybackSample,
            VideoPlaybackSession,
            VideoSeekEvent,
            TeacherInfo,
            UserCourseBridge,
            PersonalityTraitCategory,
            Role,
            Permission,
            RolePermissionBridge,
            RoleAssignmentBridge,
            JobTitle,
            Comment,
            Like,
            DailyTip,
            DailyTipOccurrence,
            QuestionType,
            UserSessionActivity,
            ModuleData,
            CoinTransaction,
            GivenAnswerStreak,
            ActivitySession,
            ActivityStreak,
            Event,
            ActivationCode,
            CourseAccessBridge,
            ShopItem,
            ShopItemCategory,
            DiscountCode,
            VideoRating,
            PrequizQuestion,
            PrequizAnswer,
            PrequizUserAnswer,
            CourseRatingGroup,
            CourseRatingQuestion,
            CourseRatingQuestionUserAnswer,
            UserVideoProgressBridge,
            TempomatAdjustmentValue,
            CourseItemCompletion,
            ConstantValue,
            CourseCompletion
        ],
    };

    return new XDBMSchemaType(schema);
};