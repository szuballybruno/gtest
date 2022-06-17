import { ActivationCode } from '../../models/entity/ActivationCode';
import { ActivitySession } from '../../models/entity/ActivitySession';
import { ActivityStreak } from '../../models/entity/ActivityStreak';
import { AnswerData } from '../../models/entity/answer/AnswerData';
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
import { CourseData } from '../../models/entity/course/CourseData';
import { CourseAccessBridge } from '../../models/entity/CourseAccessBridge';
import { CourseCategory } from '../../models/entity/CourseCategory';
import { ModuleData } from '../../models/entity/module/ModuleData';
import { CourseRatingGroup } from '../../models/entity/courseRating/CourseRatingGroup';
import { CourseRatingQuestion } from '../../models/entity/courseRating/CourseRatingQuestion';
import { CourseRatingQuestionUserAnswer } from '../../models/entity/courseRating/CourseRatingQuestionUserAnswer';
import { DailyTip } from '../../models/entity/DailyTip';
import { DailyTipOccurrence } from '../../models/entity/DailyTipOccurrence';
import { DiscountCode } from '../../models/entity/DiscountCode';
import { Event } from '../../models/entity/Event';
import { ExamData } from '../../models/entity/exam/ExamData';
import { GivenAnswer } from '../../models/entity/GivenAnswer';
import { GivenAnswerStreak } from '../../models/entity/GivenAnswerStreak';
import { Group } from '../../models/entity/Group';
import { JobTitle } from '../../models/entity/JobTitle';
import { Like } from '../../models/entity/Like';
import { PersonalityTraitCategory } from '../../models/entity/PersonalityTraitCategory';
import { PrequizAnswer } from '../../models/entity/prequiz/PrequizAnswer';
import { PrequizQuestion } from '../../models/entity/prequiz/PrequizQuestion';
import { PrequizUserAnswer } from '../../models/entity/prequiz/PrequizUserAnswer';
import { QuestionData } from '../../models/entity/question/QuestionData';
import { QuestionType } from '../../models/entity/QuestionType';
import { ShopItem } from '../../models/entity/ShopItem';
import { ShopItemCategory } from '../../models/entity/ShopItemCategory';
import { StorageFile } from '../../models/entity/StorageFile';
import { Task } from '../../models/entity/Task';
import { TeacherInfo } from '../../models/entity/TeacherInfo';
import { TempomatAdjustmentValue } from '../../models/entity/TempomatAdjustmentValue';
import { User } from '../../models/entity/User';
import { UserCourseBridge } from '../../models/entity/UserCourseBridge';
import { ExamCompletion } from '../../models/entity/UserExamProgressBridge';
import { UserSessionActivity } from '../../models/entity/UserSessionActivity';
import { UserVideoProgressBridge } from '../../models/entity/UserVideoProgressBridge';
import { VideoData } from '../../models/entity/video/VideoData';
import { VideoPlaybackSample } from '../../models/entity/playback/VideoPlaybackSample';
import { VideoRating } from '../../models/entity/VideoRating';
import { ActivityStreakView } from '../../models/views/ActivityStreakView';
import { AdminUserListView } from '../../models/views/AdminUserListView';
import { AnswerSessionView } from '../../models/views/AnswerSessionView';
import { AvailableCourseView } from '../../models/views/AvailableCourseView';
import { CoinBalanceView } from '../../models/views/CoinBalanceView';
import { CoinTransactionView } from '../../models/views/CoinTransactionView';
import { CommentListView } from '../../models/views/CommentListView';
import { CourseAdminContentView } from '../../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../../models/views/CourseAdminDetailedView';
import { CourseAdminShortView } from '../../models/views/CourseAdminShortView';
import { CourseDetailsView } from '../../models/views/CourseDetailsView';
import { CourseItemEditView } from '../../models/views/CourseItemEditView';
import { CourseItemStateView } from '../../models/views/CourseItemStateView';
import { CourseLearningStatsView } from '../../models/views/CourseLearningStatsView';
import { CourseModuleOverviewView } from '../../models/views/CourseModuleOverviewView';
import { CourseOverviewView } from '../../models/views/CourseOverviewView';
import { CourseProgressView } from '../../models/views/CourseProgressView';
import { CourseRatingQuestionView } from '../../models/views/CourseRatingQuestionView';
import { DailyTipView } from '../../models/views/DailyTipView';
import { ExamCompletedView } from '../../models/views/ExamCompletedView';
import { ExamResultView } from '../../models/views/ExamResultView';
import { ExamView } from '../../models/views/ExamView';
import { ModuleView } from '../../models/views/ModuleView';
import { PersonalityTraitCategoryView } from '../../models/views/PersonalityTraitCategoryView';
import { PersonalityTraitView } from '../../models/views/PersonalityTraitView';
import { PractiseQuestionView } from '../../models/views/PractiseQuestionView';
import { PrequizQuestionView } from '../../models/views/PrequizQuestionView';
import { PretestResultView } from '../../models/views/PretestResultView';
import { ShopItemStatefulView } from '../../models/views/ShopItemStatefulView';
import { ShopItemView } from '../../models/views/ShopItemView';
import { SignupCompletedView } from '../../models/views/SignupCompletedView';
import { SignupQuestionView } from '../../models/views/SignupQuestionView';
import { UserActiveCourseView } from '../../models/views/UserActiveCourseView';
import { UserSessionDailyView } from '../../models/views/UserSessionDailyView';
import { UserAnswerView } from '../../models/views/UserAnswerView';
import { UserCourseBridgeView } from '../../models/views/UserCourseBridgeView';
import { UserCourseCompletionCurrentView } from '../../models/views/UserCourseCompletionCurrentView';
import { UserCourseCompletionOriginalEstimationView } from '../../models/views/UserCourseCompletionOriginalEstimationView';
import { UserCourseProgressView } from '../../models/views/UserCourseProgressView';
import { UserCourseRecommendedItemQuotaView } from '../../models/views/UserCourseRecommendedItemQuotaView';
import { UserCourseStatsView } from '../../models/views/UserCourseStatsView';
import { UserDailyCourseItemProgressView } from '../../models/views/UserDailyCourseItemProgressView';
import { UserDailyProgressView } from '../../models/views/UserDailyProgressView';
import { UserEngagementView } from '../../models/views/UserEngagementView';
import { UserExamStatsView } from '../../models/views/UserExamStatsView';
import { UserInactiveCourseView } from '../../models/views/UserInactiveCourseView';
import { UserLearningOverviewStatsView } from '../../models/views/UserLearningOverviewStatsView';
import { UserPerformanceAnswerGroupView } from '../../models/views/UserPerformanceAnswerGroupView';
import { UserPerformanceView } from '../../models/views/UserPerformanceView';
import { UserPractiseRecommendationView } from '../../models/views/UserPractiseRecommendationView';
import { UserReactionTimeView } from '../../models/views/UserReactionTimeView';
import { UserRoleAssignCompanyView } from '../../models/views/UserRoleAssignCompanyView';
import { UserRoleView } from '../../models/views/UserRoleView';
import { UserSessionBlockView } from '../../models/views/UserSessionBlockView';
import { UserSessionView } from '../../models/views/UserSessionView';
import { UserSpentTimeRatioView } from '../../models/views/UserSpentTimeRatioView';
import { UserStatsView } from '../../models/views/UserStatsView';
import { UserTempomatAdjustmentValueView } from '../../models/views/UserTempomatAdjustmentValueView';
import { UserVideoPractiseProgressView } from '../../models/views/UserVideoPractiseProgressView';
import { UserVideoStatsView } from '../../models/views/UserVideoStatsView';
import { UserWeeklyCourseItemProgressView } from '../../models/views/UserWeeklyCourseItemProgressView';
import { VideoCursorSecondsView } from '../../models/views/VideoCursorSecondsView';
import { getActivationCodeSeedData } from '../../sql/seed/seed_activation_codes';
import { getAnswerDatasSeedData } from '../../sql/seed/seed_answer_datas';
import { getAnswerSessionSeedData } from '../../sql/seed/seed_answer_sessions';
import { getCommentsSeedData } from '../../sql/seed/seed_comments';
import { getCompaniesSeedData } from '../../sql/seed/seed_companies';
import { getCompanyOwnerBridgeSeedData } from '../../sql/seed/seed_company_owner_bridges';
import { getCourseDatasSeedData } from '../../sql/seed/seed_course_datas';
import { getCourseAccessBridgeSeedData } from '../../sql/seed/seed_course_access_bridge';
import { getCourseCategoriesSeedData } from '../../sql/seed/seed_course_categories';
import { getCourseRatingGroupSeedData } from '../../sql/seed/seed_course_rating_groups';
import { getCourseRatingQuestionSeedData } from '../../sql/seed/seed_course_rating_question';
import { getDailyTipsSeed } from '../../sql/seed/seed_daily_tips';
import { getDiscountCodesSeedData } from '../../sql/seed/seed_discount_codes';
import { getExamDatasSeedData } from '../../sql/seed/seed_exam_datas';
import { getJobTitlesSeedData } from '../../sql/seed/seed_job_titles';
import { getModuleDatasSeedData } from '../../sql/seed/seed_module_datas';
import { getPermissionsSeedData } from '../../sql/seed/seed_permissions';
import { getPermissionAssignmentBridgeSeedData } from '../../sql/seed/seed_permission_assignment_bridges';
import { getPersonalityTraitCategoriesSeed } from '../../sql/seed/seed_personality_trait_categories';
import { getPrequizAnswersSeedData } from '../../sql/seed/seed_prequiz_answers';
import { getPrequizQuestionsSeedData } from '../../sql/seed/seed_prequiz_questions';
import { getQuestionDatasSeedData } from '../../sql/seed/seed_question_datas';
import { getQuestionTypeSeedData } from '../../sql/seed/seed_question_types';
import { getRolesSeedData } from '../../sql/seed/seed_roles';
import { getRoleAssignmentBridgeSeedData } from '../../sql/seed/seed_role_assignment_bridges';
import { getRolePermissionBridgeSeedData } from '../../sql/seed/seed_role_permission_bridges';
import { getShopItemSeedData } from '../../sql/seed/seed_shop_items';
import { getShopItemCategoriesSeedData } from '../../sql/seed/seed_shop_item_categories';
import { getStorageFileSeedData } from '../../sql/seed/seed_storage_file';
import { getTeacherInfoSeedData } from '../../sql/seed/seed_teacher_info';
import { getTempomatAdjustmentValueSeedData } from '../../sql/seed/seed_tempomat_adjustment_values';
import { getUserSeedData } from '../../sql/seed/seed_users';
import { getVideoDataSeedData } from '../../sql/seed/seed_video_datas';
import { XDInjector } from '../../utilities/XDInjection/XDInjector';
import { XDBMSchemaType } from '../XDBManager/XDBManagerTypes';
import { VideoPlaybackSession } from '../../models/entity/playback/VideoPlaybackSession';
import { VideoSeekEvent } from '../../models/entity/playback/VideoSeekEvent';
import { getVideoVersionSeedData } from '../../sql/seed/seed_video_versions';
import { VideoVersion } from '../../models/entity/video/VideoVersion';
import { getVideosSeedData } from '../../sql/seed/seed_videos';
import { getModuleVersionsSeedData } from '../../sql/seed/seed_module_versions';
import { Video } from '../../models/entity/video/Video';
import { ModuleVersion } from '../../models/entity/module/ModuleVersion';
import { getModulesSeedData } from '../../sql/seed/seed_modules';
import { Module } from '../../models/entity/module/Module';
import { Course } from '../../models/entity/course/Course';
import { getCourseSeedData } from '../../sql/seed/seed_courses';
import { getCourseVersionsSeedData } from '../../sql/seed/seed_course_versions';
import { CourseVersion } from '../../models/entity/course/CourseVersion';
import { ExamVersion } from '../../models/entity/exam/ExamVersion';
import { Exam } from '../../models/entity/exam/Exam';
import { AnswerVersion } from '../../models/entity/answer/AnswerVersion';
import { Answer } from '../../models/entity/answer/Answer';
import { VideoFile } from '../../models/entity/video/VideoFile';
import { QuestionVersion } from '../../models/entity/question/QuestionVersion';
import { Question } from '../../models/entity/question/Question';
import { getQuestionSeedData } from '../../sql/seed/seed_questions';
import { getSeedQuestionVersions } from '../../sql/seed/seed_question_versions';
import { getExamVersionsSeedData } from '../../sql/seed/seed_exam_versions';
import { getExamSeedData } from '../../sql/seed/seed_exams';
import { getVideoFilesSeedData } from '../../sql/seed/seed_video_files';

export const createDBSchema = (): XDBMSchemaType => {

    const injector = new XDInjector<Function>()
        .add(getQuestionTypeSeedData, [], QuestionType)
        .add(getPermissionsSeedData, [], Permission)
        .add(getJobTitlesSeedData, [], JobTitle)
        .add(getCompaniesSeedData, [], Company)
        .add(getStorageFileSeedData, [], StorageFile)
        .add(getPersonalityTraitCategoriesSeed, [], PersonalityTraitCategory)
        .add(getQuestionDatasSeedData, [], QuestionData)
        .add(getCourseCategoriesSeedData, [], CourseCategory)
        .add(getCourseRatingGroupSeedData, [], CourseRatingGroup)
        .add(getShopItemCategoriesSeedData, [], ShopItemCategory)
        .add(getPrequizQuestionsSeedData, [], PrequizQuestion)
        .add(getExamDatasSeedData, [], ExamData)
        .add(getVideosSeedData, [], Video)
        .add(getExamSeedData, [], Exam)
        .add(getModulesSeedData, [], Module)
        .add(getCourseSeedData, [], Course)
        .add(getQuestionSeedData, [], Question)
        .add(getActivationCodeSeedData, [getCompaniesSeedData], ActivationCode)
        .add(getRolesSeedData, [getCompaniesSeedData], Role)
        .add(getRolePermissionBridgeSeedData, [getPermissionsSeedData, getRolesSeedData], RolePermissionBridge)
        .add(getPrequizAnswersSeedData, [getPrequizQuestionsSeedData], PrequizAnswer)
        .add(getTempomatAdjustmentValueSeedData, [getPrequizAnswersSeedData], TempomatAdjustmentValue)
        .add(getShopItemSeedData, [getStorageFileSeedData, getShopItemCategoriesSeedData], ShopItem)
        .add(getDiscountCodesSeedData, [getShopItemSeedData], DiscountCode)
        .add(getCourseRatingQuestionSeedData, [getCourseRatingGroupSeedData], CourseRatingQuestion)
        .add(getUserSeedData, [getCompaniesSeedData, getJobTitlesSeedData], User)
        .add(getCompanyOwnerBridgeSeedData, [getUserSeedData, getCompaniesSeedData], CompanyOwnerBridge)
        .add(getTeacherInfoSeedData, [getUserSeedData], TeacherInfo)
        .add(getAnswerSessionSeedData, [getUserSeedData], AnswerSession)
        .add(getCourseDatasSeedData, [getCourseCategoriesSeedData, getStorageFileSeedData, getUserSeedData], CourseData)
        .add(getModuleDatasSeedData, [getCourseDatasSeedData], ModuleData)
        .add(getDailyTipsSeed, [getStorageFileSeedData, getPersonalityTraitCategoriesSeed], DailyTip)
        .add(getCourseVersionsSeedData, [getCourseDatasSeedData, getCourseSeedData], CourseVersion)
        .add(getVideoFilesSeedData, [getStorageFileSeedData], VideoFile)
        .add(getVideoDataSeedData, [getVideoFilesSeedData], VideoData)
        .add(getModuleVersionsSeedData, [getCourseVersionsSeedData, getModuleDatasSeedData, getModulesSeedData], ModuleVersion)
        .add(getVideoVersionSeedData, [getVideoDataSeedData, getVideosSeedData, getModuleVersionsSeedData], VideoVersion)
        .add(getExamVersionsSeedData, [getModuleVersionsSeedData, getExamDatasSeedData, getExamSeedData], ExamVersion)
        .add(getCommentsSeedData, [getVideoVersionSeedData, getUserSeedData], Comment)
        .add(getSeedQuestionVersions, [getQuestionSeedData, getQuestionDatasSeedData, getExamVersionsSeedData, getVideoVersionSeedData, getPersonalityTraitCategoriesSeed], QuestionVersion)
        .add(getAnswerDatasSeedData, [getQuestionDatasSeedData], AnswerData)
        .add(getCourseAccessBridgeSeedData, [getCompaniesSeedData, getCourseSeedData], CourseAccessBridge)
        .add(getRoleAssignmentBridgeSeedData, [getCompaniesSeedData, getRolesSeedData, getUserSeedData], RoleAssignmentBridge)
        .add(getPermissionAssignmentBridgeSeedData, [getCompaniesSeedData, getCourseSeedData, getPermissionsSeedData, getUserSeedData], PermissionAssignmentBridge)
        .build();

    const seedScripts = injector
        .getFunctions()
        .map((func): [Function, any] => {

            return [func.props, injector.getInstance(func.fn)];
        });

    return {
        seedScripts,

        views: [
            ['video_version_view'],
            ['latest_course_version_view'],
            ['answer_session_view', AnswerSessionView],
            ['answer_session_evaluation_view'],
            ['exam_completed_view', ExamCompletedView],
            ['video_cursor_seconds_view', VideoCursorSecondsView],
            ['course_item_view'],
            ['user_practise_recommendation_view', UserPractiseRecommendationView],
            ['course_item_playlist_view', CourseItemStateView],
            ['signup_question_view', SignupQuestionView],
            ['user_role_view', UserRoleView],
            ['latest_given_answer_view'],
            ['personality_trait_view', PersonalityTraitView],
            ['signup_completed_view', SignupCompletedView],
            ['company_permission_view'],
            ['user_permission_view'],
            ['available_course_view', AvailableCourseView],
            ['exam_result_view', ExamResultView],
            ['practise_question_view', PractiseQuestionView],
            ['daily_tip_view', DailyTipView],
            ['course_admin_short_view', CourseAdminShortView],
            ['course_admin_detailed_view', CourseAdminDetailedView],
            ['course_admin_content_view', CourseAdminContentView],
            ['video_playback_sample_view'],
            ['user_session_view', UserSessionView],
            ['user_stats_view', UserStatsView],
            ['user_session_daily_view', UserSessionDailyView],
            ['activity_streak_view', ActivityStreakView],
            ['shop_item_view', ShopItemView],
            ['shop_item_stateful_view', ShopItemStatefulView],
            ['course_length_estimation_view'],
            ['coin_transaction_view', CoinTransactionView],
            ['coin_balance_view', CoinBalanceView],
            ['course_questions_success_view'],
            ['exam_latest_success_rate_view'],
            ['course_spent_time_view'],
            ['course_item_edit_view', CourseItemEditView]
            // ['course_item_count_view'],
            // ['course_learning_stats_view', CourseLearningStatsView],
            // ['course_progress_view', CourseProgressView],
            // ['course_module_overview_view', CourseModuleOverviewView],
            // ['course_details_view', CourseDetailsView],
            // ['exam_view', ExamView],
            // ['coin_acquire_per_course_view'],
            // ['course_overview_view', CourseOverviewView],
            // ['personality_trait_category_view', PersonalityTraitCategoryView],
            // ['course_item_completed_view'],
            // ['user_latest_activity_view'],
            // ['admin_user_list_view', AdminUserListView],
            // ['prequiz_question_view', PrequizQuestionView],
            // ['pretest_result_view', PretestResultView],
            // ['course_rating_question_view', CourseRatingQuestionView],
            // ['user_prequiz_answers_view'],
            // ['user_course_bridge_view', UserCourseBridgeView],
            // ['user_course_completion_original_estimation_view', UserCourseCompletionOriginalEstimationView],
            // ['user_course_completion_current_view', UserCourseCompletionCurrentView],
            // ['user_answer_view', UserAnswerView],
            // ['user_performance_answer_group_view', UserPerformanceAnswerGroupView],
            // ['user_reaction_time_view', UserReactionTimeView],
            // ['user_performance_view', UserPerformanceView],
            // ['user_session_block_view', UserSessionBlockView],
            // ['user_inactive_course_view', UserInactiveCourseView],
            // ['user_engagement_view', UserEngagementView],
            // ['user_learning_overview_stats_view', UserLearningOverviewStatsView],
            // ['user_daily_progress_view', UserDailyProgressView],
            // ['user_daily_course_item_progress_view', UserDailyCourseItemProgressView],
            // ['user_active_course_view', UserActiveCourseView],
            // ['user_weekly_course_item_progress_view', UserWeeklyCourseItemProgressView],
            // ['user_course_progress_actual'],
            // ['user_course_progress_view', UserCourseProgressView],
            // ['user_course_recommended_item_quota_view', UserCourseRecommendedItemQuotaView],
            // ['user_tempomat_adjustment_value_view', UserTempomatAdjustmentValueView],
            // ['user_course_stats_view', UserCourseStatsView],
            // ['user_video_practise_progress_view', UserVideoPractiseProgressView],
            // ['user_video_stats_view', UserVideoStatsView],
            // ['user_exam_stats_view', UserExamStatsView],
            // ['course_item_question_edit_view', CourseItemQuestionEditView],
            // ['comment_list_view', CommentListView],
            // ['user_spent_time_ratio_view', UserSpentTimeRatioView],
            // ['module_view', ModuleView],
            // ['role_list_view'],
            // ['company_view'],
            // ['assignable_permission_view'],
            // ['assignable_role_view'],
            // ['user_assigned_auth_item_view'],
            // ['user_role_assign_company_view', UserRoleAssignCompanyView]
        ],

        functionScripts: [
            'answer_signup_question_fn',
            'acquire_task_lock_fn',
            'answer_question_fn',
            'create_daily_tip_fn',
            'insert_coin_transaction',
            'get_user_session_first_activity_id',
            'save_user_session_activity'
        ],

        constraints: [
            {
                tableName: 'coin_transaction',
                name: 'coin_transaction_valid_relation_enforce_constraint'
            },
            {
                tableName: 'activation_code',
                name: 'activation_code_uniqe_constraint'
            },
            {
                tableName: 'role_permission_bridge',
                name: 'role_permission_bridge_constraint'
            },
            {
                tableName: 'role',
                name: 'role_constraint'
            }
        ],

        indices: [
            {
                tableName: 'user',
                name: 'user_email_unique_index'
            }
        ],

        triggers: [
            'role_assignment_validity_check_trigger',
            'permission_assignment_validity_check_trigger',
            'role_permission_bridge_validity_trigger'
        ],

        entities: [
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
            ExamCompletion,
            TempomatAdjustmentValue
        ],
    };
};