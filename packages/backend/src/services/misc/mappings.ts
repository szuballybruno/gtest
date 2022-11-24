import { instantiate } from '@episto/commonlogic';
import { Id, LeaderboardPeriodType, TeacherBadgeNameType, UserActivityDistributionChartData } from '@episto/commontypes';
import { ActivationCodeListDTO, AdminCourseUserStatsDTO, AdminHomePageOverviewDTO, AnswerDTO, AnswerEditDTO, AvailableCourseDTO, CoinTransactionDTO, CommentListDTO, CompanyAssociatedCourseDTO, CompanyDTO, CompanyEditDataDTO, CompanyPublicDTO, CourseAdminListItemDTO, CourseBriefData, CourseCategoryDTO, CourseContentItemAdminDTO, CourseContentItemIssueDTO, CourseDetailsDTO, CourseDetailsEditDataDTO, CourseItemEditDTO, CourseLearningDTO, CourseOverviewDataDTO, CourseProgressShortDTO, CourseRatingGroupDTO, CourseRatingQuestionDTO, CourseShopItemListDTO, CourseStatDTO, DailyTipDTO, DailyTipEditDataDTO, DiscountCodeDTO, EventDTO, ExamPlayerDataDTO, ExamResultQuestionDTO, ExamResultsDTO, ExamStatsDTO, HomePageStatsDTO, ImproveYourselfPageStatsDTO, LeaderboardListItemDTO, ModuleEditDTO, ModulePlayerDTO, PermissionListDTO, PersonalityTraitCategoryDTO, PersonalityTraitCategoryShortDTO, PlaylistItemDTO, PlaylistModuleDTO, PrequizAnswerDTO, PrequizQuestionDTO, PretestResultDTO, QuestionDTO, QuestionModuleCompareDTO, ResultAnswerDTO, RoleAdminListDTO, RoleDTO, ShopItemAdminShortDTO, ShopItemBriefData, ShopItemCategoryDTO, ShopItemDTO, ShopItemEditDTO, SignupAnswerDTO, SignupQuestionDTO, SurveyDataDTO, TaskDTO, TeacherInfoEditDTO, UserActiveCourseDTO, UserAdminListDTO, UserCourseProgressChartDTO, UserCourseStatsDTO, UserCourseStatsOverviewDTO, UserDTO, UserExamStatsDTO, UserLearningPageStatsDTO, UserModuleStatsDTO, UserVideoStatsDTO, VideoPlayerDataDTO } from '@episto/communication';
import { Mutable, XMappingsBuilder } from '@episto/xmapper';
import { Permission } from '../../models/entity/authorization/Permission';
import { Role } from '../../models/entity/authorization/Role';
import { CourseData } from '../../models/entity/course/CourseData';
import { Company } from '../../models/entity/misc/Company';
import { CourseCategory } from '../../models/entity/misc/CourseCategory';
import { DailyTip } from '../../models/entity/misc/DailyTip';
import { DiscountCode } from '../../models/entity/misc/DiscountCode';
import { Event } from '../../models/entity/misc/Event';
import { PersonalityTraitCategory } from '../../models/entity/misc/PersonalityTraitCategory';
import { ShopItem } from '../../models/entity/misc/ShopItem';
import { ShopItemCategory } from '../../models/entity/misc/ShopItemCategory';
import { Task } from '../../models/entity/misc/Task';
import { TeacherInfo } from '../../models/entity/misc/TeacherInfo';
import { User } from '../../models/entity/misc/User';
import { ActivationCodeListView } from '../../models/views/ActivationCodeListView';
import { AdminCourseUserStatsView } from '../../models/views/AdminCourseUserStatsView';
import { AdminHomePageOverviewView } from '../../models/views/AdminHomePageOverviewView';
import { AvailableCourseView } from '../../models/views/AvailableCourseView';
import { CoinTransactionView } from '../../models/views/CoinTransactionView';
import { CommentListView } from '../../models/views/CommentListView';
import { CompanyAssociatedCoursesView } from '../../models/views/CompanyAssociatedCoursesView';
import { CompanyView } from '../../models/views/CompanyView';
import { CourseAdminContentView } from '../../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../../models/views/CourseAdminDetailedView';
import { CourseAdminShortView } from '../../models/views/CourseAdminShortView';
import { CourseDetailsView } from '../../models/views/CourseDetailsView';
import { CourseItemEditView } from '../../models/views/CourseItemEditView';
import { CourseLearningStatsView } from '../../models/views/CourseLearningStatsView';
import { CourseOverviewView } from '../../models/views/CourseOverviewView';
import { CourseProgressView } from '../../models/views/CourseProgressView';
import { CourseRatingQuestionView } from '../../models/views/CourseRatingQuestionView';
import { CourseShopItemListView } from '../../models/views/CourseShopItemListView';
import { DailyTipView } from '../../models/views/DailyTipView';
import { ExamPlayerDataView } from '../../models/views/ExamPlayerDataView';
import { ExamResultStatsView } from '../../models/views/ExamResultStatsView';
import { ExamResultView } from '../../models/views/ExamResultView';
import { HomePageStatsView } from '../../models/views/HomePageStatsView';
import { ImproveYourselfPageStatsView } from '../../models/views/ImproveYourselfPageStatsView';
import { LeaderboardView } from '../../models/views/LeaderboardView';
import { ModuleEditView } from '../../models/views/ModuleEditView';
import { ModulePlayerView } from '../../models/views/ModulePlayerView';
import { MostProductiveTimeRangeView } from '../../models/views/MostProductiveTimeRangeView';
import { PersonalityTraitCategoryView } from '../../models/views/PersonalityTraitCategoryView';
import { PrequizQuestionView } from '../../models/views/PrequizQuestionView';
import { PretestResultView } from '../../models/views/PretestResultView';
import { QuestionDataView } from '../../models/views/QuestionDataView';
import { QuestionModuleCompareView } from '../../models/views/QuestionModuleCompareView';
import { RoleListView } from '../../models/views/RoleListView';
import { ShopItemStatefulView } from '../../models/views/ShopItemStatefulView';
import { ShopItemView } from '../../models/views/ShopItemView';
import { SignupQuestionView } from '../../models/views/SignupQuestionView';
import { UserActiveCourseView } from '../../models/views/UserActiveCourseView';
import { AdminUserCoursesView } from '../../models/views/UserCourseStatsView';
import { UserDailyActivityChartView } from '../../models/views/UserDailyActivityChartView';
import { UserExamStatsView } from '../../models/views/UserExamStatsView';
import { UserLearningPageStatsView } from '../../models/views/UserLearningPageStatsView';
import { UserModuleStatsView } from '../../models/views/UserModuleStatsView';
import { UserOverviewView } from '../../models/views/UserOverviewView';
import { UserPlaylistView } from '../../models/views/UserPlaylistView';
import { UserSpentTimeRatioView } from '../../models/views/UserSpentTimeRatioView';
import { UserVideoStatsView } from '../../models/views/UserVideoStatsView';
import { VideoPlayerDataView } from '../../models/views/VideoPlayerDataView';
import { relativeDiffInPercentage, toFullName } from '../../utilities/helpers';
import { CalculatedTempomatValueType } from '../TempomatService';
import { UrlService } from '../UrlService';
import { UserLagbehindStatType } from './types';

export const epistoMappingsBuilder = new XMappingsBuilder<[UrlService]>();

const marray = [

    epistoMappingsBuilder
        .addArrayMapping(QuestionModuleCompareDTO, () => (
            views: QuestionModuleCompareView[],
        ) => {

            return views.map(x => instantiate<QuestionModuleCompareDTO>({
                moduleVersionId: x.moduleVersionId,
                moduleName: x.moduleName,
                pretestExamScorePercentage: x.pretestExamScorePercentage,
                finalExamScorePercentage: x.finalExamScorePercentage,
                scoreDifferencePercentage: relativeDiffInPercentage(x.pretestExamScorePercentage, x.finalExamScorePercentage)
            }));
        }),

    epistoMappingsBuilder
        .addArrayMapping(AdminCourseUserStatsDTO, () => (
            views: (AdminCourseUserStatsView & {
                previsionedDate: Date | null,
                lagBehindDays: number | null
            })[],
        ) => {

            return views.map(x => instantiate<AdminCourseUserStatsDTO>({
                companyId: x.companyId,
                userId: x.userId,
                courseId: x.courseId,
                firstName: x.firstName,
                lastName: x.lastName,
                avatarUrl: x.avatarUrl,
                completedPercentage: x.completedPercentage,
                performancePercentage: x.performancePercentage,
                completedVideoCount: x.completedVideoCount,
                completedExamCount: x.completedExamCount,
                videoCount: x.videoCount,
                examCount: x.examCount,
                totalSpentSeconds: x.totalSpentSeconds,
                finalExamScorePercentage: x.finalExamScorePercentage,
                summerizedScore: x.summerizedScore,
                requiredCompletionDate: x.requiredCompletionDate,
                completionDate: x.completionDate,
                previsionedDate: x.previsionedDate,
                lagBehindDays: x.lagBehindDays,
            }));
        }),

    epistoMappingsBuilder
        .addMapping(AdminHomePageOverviewDTO, () => (
            companyCourseStats: AdminHomePageOverviewView[],
            flaggedUsers: number,
            avgUsers: number,
            outstandingUsers: number
        ) => {
            return instantiate<AdminHomePageOverviewDTO>({
                companyId: companyCourseStats
                    .first()
                    .companyId,
                flaggedUsers: flaggedUsers,
                avgUsers: avgUsers,
                outstandingUsers: outstandingUsers,
                companyCourseStats: companyCourseStats
                    .groupBy(x => x.courseId)
                    .map(companyCourseStatGroups => {

                        const courseStats = companyCourseStatGroups.first;

                        return {
                            courseId: courseStats.courseId,
                            title: courseStats.title,
                            thumbnailUrl: courseStats.thumbnailUrl,
                            activeUsersCount: courseStats.activeUsersCount,
                            suspendedUsersCount: courseStats.suspendedUsersCount,
                            completedUsersCount: courseStats.completedUsersCount,
                            avgCoursePerformancePercentage: courseStats.avgCoursePerformancePercentage,
                            difficultVideosCount: courseStats.difficultVideosCount,
                            questionsWaitingToBeAnswered: courseStats.questionsWaitingToBeAnswered
                        };
                    })
            });
        }),
    epistoMappingsBuilder
        .addArrayMapping(UserAdminListDTO, () => (views: UserOverviewView[], lagBehindStats: UserLagbehindStatType[]) => {

            return views
                .map(view => {

                    const lagBehindStat = lagBehindStats
                        .single(x => x.userId === view.userId);

                    return instantiate<UserAdminListDTO>({
                        userId: view.userId,
                        companyId: view.companyId,
                        userEmail: view.userEmail,
                        signupDate: view.signupDate,
                        firstName: view.firstName,
                        lastName: view.lastName,
                        avatarFilePath: view.avatarFilePath ?? '',
                        summerizedScoreAvg: view.summerizedScoreAvg,
                        totalSessionLengthSeconds: view.totalSessionLengthSeconds,
                        engagementPoints: view.engagementPoints,
                        completedVideoCount: view.completedVideoCount,
                        reactionTime: view.reactionTime,
                        username: view.username,
                        productivityPercentage: lagBehindStat.productivityPercentage,
                        invertedLagBehind: lagBehindStat.invertedLagBehind,
                    });
                });
        }),
    epistoMappingsBuilder
        .addArrayMapping(UserModuleStatsDTO, () => (
            views: UserModuleStatsView[]) => {

            return views.map(x => instantiate<UserModuleStatsDTO>({
                userId: x.userId,
                courseId: x.courseId,
                moduleId: x.moduleId,
                moduleName: x.moduleName,
                moduleProgress: x.moduleProgress,
                performancePercentage: x.performancePercentage,
                lastExamScore: x.lastExamScore,
                moduleQuestionSuccessRate: x.moduleQuestionSuccessRate,
                videosToBeRepeatedCount: x.videosToBeRepeatedCount
            }));
        }),

    epistoMappingsBuilder
        .addMapping(UserCourseStatsOverviewDTO, () => (
            view: AdminUserCoursesView,
            userSpentTimeRatio: UserSpentTimeRatioView,
            progressChartData: UserCourseProgressChartDTO
        ) => instantiate<UserCourseStatsOverviewDTO>({
            courseId: view.courseId,
            userId: view.userId,
            courseName: view.title,
            answeredPractiseQuestionCount: view.answeredPractiseQuestionCount,
            answeredVideoQuestionCount: view.answeredVideoQuestionCount,
            courseProgressPercentage: view.courseProgressPercentage,
            correctAnswerRate: view.correctAnswerRate,
            performancePercentage: view.performancePercentage,
            startDate: view.startDate,
            completedVideoCount: view.completedVideoCount,
            totalSpentSeconds: view.totalSpentSeconds,
            userActivityDistributionChartData: instantiate<UserActivityDistributionChartData>({
                watchingVideosPercentage: userSpentTimeRatio.totalVideoWatchElapsedTime,
                completingExamsPercentage: userSpentTimeRatio.totalExamSessionElapsedTime,
                answeringQuestionsPercentage: userSpentTimeRatio.totalQuestionElapsedTime,
                noActivityPercentage: userSpentTimeRatio.otherTotalSpentSeconds
            }),
            progressChartData: progressChartData
        })),

    epistoMappingsBuilder
        .addMapping(VideoPlayerDataDTO, ([assetUrlService]) => (
            playerData: VideoPlayerDataView,
            videoQuestions: QuestionDataView[],
            videoPlaybackSessionId: Id<'VideoPlaybackSession'>,
            maxWatchedSeconds: number
        ) => instantiate<VideoPlayerDataDTO>({
            videoVersionId: playerData.videoVersionId,
            subTitle: playerData.subtitle,
            title: playerData.title,
            description: playerData.description,
            thumbnailUrl: '',
            url: assetUrlService.getAssetUrl(playerData.videoFilePath) ?? assetUrlService.getAssetUrl('images/videoImage.jpg'),
            questions: toQuestionDTO(videoQuestions),
            maxWatchedSeconds: maxWatchedSeconds,
            videoPlaybackSessionId: videoPlaybackSessionId
        })),

    epistoMappingsBuilder
        .addMapping(SurveyDataDTO, ([assetUrlService]) => (questions: SignupQuestionView[], isCompletedSignup: boolean) => {

            return {
                questions: questions
                    .groupBy(x => x.questionVersionId)
                    .map(questionGrouping => {

                        const viewAsQuestion = questionGrouping.items.first();

                        return {
                            questionVersionId: viewAsQuestion.questionVersionId,
                            questionText: viewAsQuestion.questionText,
                            imageUrl: assetUrlService.getAssetUrl(viewAsQuestion.imageUrl),
                            typeId: viewAsQuestion.typeId,
                            answers: questionGrouping
                                .items
                                .map(viewAsAnswer => {

                                    return {
                                        answerVersionId: viewAsAnswer.answerVersionId,
                                        answerText: viewAsAnswer.answerText,
                                        isGiven: viewAsAnswer.isGivenAnswer
                                    } as SignupAnswerDTO;
                                })
                        } as SignupQuestionDTO;
                    }),
                isCompleted: isCompletedSignup
            } as SurveyDataDTO;
        }),

    epistoMappingsBuilder
        .addArrayMapping(UserCourseStatsDTO, ([assetUrlService]) => (
            adminUserCourseViews: AdminUserCoursesView[],
            tempomatValues: Partial<CalculatedTempomatValueType>[]) => adminUserCourseViews
                .map((view, index) => {

                    const { recommendedItemsPerWeek, lagBehindPercentage, previsionedCompletionDate } = tempomatValues
                        .byIndex(index);

                    return instantiate<UserCourseStatsDTO>({
                        userId: view.userId,
                        courseId: view.courseId,
                        courseName: view.title,
                        isAccessible: view.isAccessible,
                        isAssigned: view.isAssigned,
                        thumbnailImageUrl: assetUrlService.getAssetUrl(view.coverFilePath),
                        startDate: view.startDate,
                        differenceFromAveragePerformancePercentage: view.differenceFromAveragePerformancePercentage,
                        courseProgressPercentage: view.courseProgressPercentage,
                        performancePercentage: view.performancePercentage,
                        completedVideoCount: view.completedVideoCount,
                        completedExamCount: view.completedExamCount,
                        totalSpentSeconds: view.totalSpentSeconds,
                        averagePerformanceOnCourse: view.avgPerformance,
                        answeredVideoQuestionCount: view.answeredVideoQuestionCount,
                        answeredPractiseQuestionCount: view.answeredPractiseQuestionCount,
                        isFinalExamCompleted: view.isFinalExamCompleted,
                        requiredCompletionDate: view.requiredCompletionDate,
                        tempomatMode: view.tempomatMode,
                        recommendedItemsPerWeek: recommendedItemsPerWeek ?? null,
                        lagBehindPercentage: lagBehindPercentage ?? null,
                        previsionedCompletionDate: previsionedCompletionDate ?? null,
                    });
                })
        ),

    epistoMappingsBuilder
        .addArrayMapping(LeaderboardListItemDTO, ([assetUrlService]) => (views: LeaderboardView[], period: LeaderboardPeriodType) => {

            return views
                .map(x => instantiate<LeaderboardListItemDTO>({
                    acquiredCoins: period === 'daily'
                        ? x.acquiredCoinsPastDay
                        : period === 'weekly'
                            ? x.acquiredCoinsPastWeek
                            : x.acquiredCoinsPastMonth,
                    rank: period === 'daily'
                        ? x.rankDay
                        : period === 'weekly'
                            ? x.rankWeek
                            : x.rankMonth,
                    avatarUrl: x.avatarFilePath,
                    username: x.username,
                    userId: x.userId
                }));
        }),

    epistoMappingsBuilder
        .addArrayMapping(RoleAdminListDTO, () => (roles: RoleListView[]) => {

            return roles
                .groupBy(x => x.roleId)
                .map((grouping): RoleAdminListDTO => {

                    const viewAsRole = grouping.first;

                    return {
                        roleId: viewAsRole.roleId,
                        roleName: viewAsRole.roleName,
                        ownerName: viewAsRole.ownerName,
                        companyId: viewAsRole.ownerCompanyId,
                        companyName: viewAsRole.ownerName,
                        permissions: grouping
                            .items
                            .map((viewAsPermission): PermissionListDTO => ({
                                code: viewAsPermission.permissionCode,
                                scope: 'USER' // not used
                            }))
                    };
                });
        }),

    epistoMappingsBuilder
        .addArrayMapping(ActivationCodeListDTO, () => (views: ActivationCodeListView[], domain: string, urlTemplate: string) => {

            return views
                .map(view => {

                    const url = urlTemplate
                        .replace('%DOMAIN%', domain)
                        .replace('%CODE%', view.code);

                    return instantiate<ActivationCodeListDTO>({
                        activationCodeId: view.activationCodeId,
                        companyName: view.companyName,
                        code: view.code,
                        companyId: view.companyId,
                        daysElapsedFromTrial: view.daysElapsedFromTrial,
                        email: view.email,
                        isTrialOver: view.isTrialOver,
                        isUsed: view.isUsed,
                        trialLengthDays: view.trialLengthDays,
                        userId: view.userId,
                        url
                    });
                });
        }),

    epistoMappingsBuilder
        .addMapping(CourseItemEditDTO, ([urlService]) => (views: CourseItemEditView[]) => {

            const viewAsItem = views
                .first();

            const videoFileUrl = urlService
                .getAssetUrlNullable(viewAsItem.videoFilePath);

            // map item
            const dto: CourseItemEditDTO = {
                examVersionId: viewAsItem.examVersionId,
                videoVersionId: viewAsItem.videoVersionId,
                title: viewAsItem.title,
                subtitle: viewAsItem.subtitle,
                videoLengthSeconds: viewAsItem.videoLengthSeconds,
                videoUrl: videoFileUrl,
                videoAudioText: viewAsItem.videoAudioText,

                // map questions
                questions: views
                    .filter(x => !!x.questionVersionId)
                    .groupBy(x => x.questionVersionId)
                    .map(questionGroup => {

                        const viewAsQuestion = questionGroup
                            .first;

                        return {
                            questionVersionId: viewAsQuestion.questionVersionId,
                            questionText: viewAsQuestion.questionText,
                            questionShowUpTimeSeconds: viewAsQuestion.questionShowUpTimeSeconds,
                            examVersionId: viewAsQuestion.examVersionId,
                            videoVersionId: viewAsQuestion.videoVersionId,
                            moduleId: viewAsQuestion.moduleId,

                            // map answers
                            answers: questionGroup
                                .items
                                .filter(x => !!x.answerVersionId)
                                .map((viewAsAnswer): AnswerEditDTO => ({
                                    answerVersionId: viewAsAnswer.answerVersionId,
                                    text: viewAsAnswer.answerText,
                                    isCorrect: viewAsAnswer.answerIsCorrect,
                                    questionVersionId: viewAsQuestion.questionVersionId
                                }))
                        };
                    })
            };

            return dto;
        }),

    epistoMappingsBuilder
        .addArrayMapping(PlaylistModuleDTO, () => (views: UserPlaylistView[]) => {

            return views
                .groupBy(x => x.moduleId)
                .map(moduleGrouping => {

                    const viewAsModule = moduleGrouping.first;
                    const isLockedModule = moduleGrouping.items[0]?.itemState === 'locked';
                    const isCompletedModule = moduleGrouping.items.all(x => x.itemState === 'completed');
                    const isCurrentModule = moduleGrouping.items.some(x => x.itemState === 'current') || viewAsModule.moduleIsCurrent;

                    const items = moduleGrouping
                        .items
                        .map(viewAsItem => instantiate<PlaylistItemDTO>({
                            subTitle: viewAsItem.itemSubtitle,
                            title: viewAsItem.itemTitle,
                            orderIndex: viewAsItem.itemOrderIndex,
                            state: viewAsItem.itemState,
                            playlistItemCode: viewAsItem.playlistItemCode,
                            type: viewAsItem.itemType === 'video' ? 'video' : 'exam',
                            shouldRepeatVideo: viewAsItem.isRecommendedForPractise,
                            thumbnailUrl: '',
                            correctAnswerRate: viewAsItem.scorePercentage,
                            videoAudioText: viewAsItem.videoAudioText
                        }));

                    const moduleState = isCurrentModule
                        ? 'current'
                        : isLockedModule
                            ? 'locked'
                            : isCompletedModule
                                ? 'completed'
                                : 'available';

                    return instantiate<PlaylistModuleDTO>({
                        moduleId: viewAsModule.moduleId,
                        moduleName: viewAsModule.moduleName,
                        moduleOrderIndex: viewAsModule.moduleOrderIndex,
                        moduleCode: viewAsModule.moduleCode,
                        moduleState,
                        items: items,
                    });
                });
        }),

    epistoMappingsBuilder
        .addMapping(ExamPlayerDataDTO, () => (
            view: ExamPlayerDataView,
            questions: QuestionDataView[],
            statsView: ExamResultStatsView | null) => {

            return instantiate<ExamPlayerDataDTO>({
                examVersionId: view.examVersionId,
                subTitle: view.subtitle,
                title: view.title,
                thumbnailUrl: view.thumbnailUrl,
                isFinalExam: view.isFinalExam,
                canTakeAgain: view.canRetake,
                questions: toQuestionDTO(questions),
                type: 'exam',
                examStats: statsView ? toStatsDTO(statsView) : null,
            });
        }),

    epistoMappingsBuilder
        .addMapping(ExamResultsDTO, () => (
            views: ExamResultView[],
            statsView: ExamResultStatsView) => {

            const viewAsExam = views
                .first();

            const questionDTOs = views
                .groupBy(x => x.questionVersionId)
                .map(questsionGroup => {

                    const viewAsQuestion = questsionGroup.items.first();

                    return instantiate<ExamResultQuestionDTO>({
                        text: viewAsQuestion.questionText,
                        maxScore: viewAsQuestion.questionMaxScore,
                        score: viewAsQuestion.questionScore,
                        state: viewAsQuestion.givenAnswerState,
                        answers: questsionGroup
                            .items
                            .map(x => toResultAnswerDTO(x)),
                    });
                });

            return instantiate<ExamResultsDTO>({
                isSuccessful: viewAsExam.isCompletedSession,
                questions: questionDTOs,
                isCompletedPrevoiusly: !viewAsExam.onlySuccessfulSession,
                isFinalExam: viewAsExam.isFinalExam,
                shouldShowCourseCompleted: viewAsExam.onlySuccessfulSession && viewAsExam.isFinalExam,
                examStats: toStatsDTO(statsView)
            });
        }),

    epistoMappingsBuilder
        .addMapping(PretestResultDTO, () => (
            prv: PretestResultView,
            firstItemPlaylistCode: string,
            originalPrevisionedCompletionDate: Date | null,
            requiredCompletionDate: Date | null,
            recommendedItemsPerDay: number | null
        ) => {

            return instantiate<PretestResultDTO>({
                correctAnswerRate: prv.scorePercentage,
                firstItemCode: firstItemPlaylistCode,
                estimatedCompletionDate: originalPrevisionedCompletionDate,
                requiredCompletionDate: requiredCompletionDate,
                recommendedVideosPerDay: recommendedItemsPerDay
            });
        }),

    epistoMappingsBuilder
        .addArrayMapping(CourseCategoryDTO, () => (entities: CourseCategory[]) => {

            return toCourseCategoryDTO(entities);
        }),

    epistoMappingsBuilder
        .addMapping(CourseDetailsEditDataDTO, ([urlService]) => (view: CourseAdminDetailedView, categories: CourseCategory[], teachers: User[]) => {

            const courseCategoryDTOs = toCourseCategoryDTO(categories);

            const thumbnailImageURL = view.coverFilePath
                ? urlService.getAssetUrl(view.coverFilePath)
                : urlService.getAssetUrl('/images/defaultCourseCover.jpg');

            return instantiate<CourseDetailsEditDataDTO>({
                title: view.title,
                courseId: view.courseId,
                thumbnailURL: thumbnailImageURL,
                shortDescription: view.shortDescription,
                language: view.languageName,
                difficulty: view.difficulty,
                description: view.description,
                benchmark: view.benchmark,
                previouslyCompletedCount: view.previouslyCompletedCount,
                visibility: view.visibility,
                teacherId: view.teacherId,
                humanSkillBenefitsDescription: view.humanSkillBenefitsDescription,
                technicalRequirementsDescription: view.technicalRequirements,
                isPrecourseSurveyRequired: view.isPrecourseSurveyRequired,

                skillBenefits: parseCommaSeparatedStringList(view.skillBenefits),
                technicalRequirements: parseCommaSeparatedStringList(view.technicalRequirements),
                humanSkillBenefits: parseSkillBenefits(view.humanSkillBenefits),

                category: {
                    id: view.categoryId,
                    name: view.categoryName,
                    childCategories: []
                },
                subCategory: {
                    id: view.subCategoryId,
                    name: view.subCategoryName,
                    childCategories: []
                },
                teachers: teachers
                    .map(x => ({
                        fullName: toFullName(x.firstName, x.lastName),
                        id: x.id
                    })),
                categories: courseCategoryDTOs
            });
        }),
    epistoMappingsBuilder
        .addMapping(UserLearningPageStatsDTO, () => (view: UserLearningPageStatsView, totalLagBehindPercentage: number | null) => {
            return instantiate<UserLearningPageStatsDTO>({
                userId: view.userId,
                userEmail: view.userEmail,
                totalLagBehindPercentage: totalLagBehindPercentage,
                videosToBeRepeatedCount: view.videosToBeRepeatedCount,
                questionsToBeRepeatedCount: view.questionsToBeRepeatedCount,
                completedVideoCount: view.completedVideoCount,
                totalSessionLengthSeconds: view.totalSessionLengthSeconds,
                answeredQuestionsCount: view.answeredQuestionsCount,
                totalCorrectAnswerRate: view.totalCorrectAnswerRate,
                rankInsideCompany: view.rankInsideCompany
            });
        }),
    epistoMappingsBuilder
        .addMapping(HomePageStatsDTO, () => (view: HomePageStatsView, lagBehindPercentage: number | null) => {
            return instantiate<HomePageStatsDTO>({
                userId: view.userId,
                videosToBeRepeatedCount: view.videosToBeRepeatedCount,
                completedVideosLastMonth: view.completedVideosLastMonth,
                lagBehindPercentage: lagBehindPercentage,
                performanceLastMonth: view.performanceLastMonth
            });
        }),
    epistoMappingsBuilder
        .addMapping(ModulePlayerDTO, ([urlService]) => (view: ModulePlayerView) => {
            return instantiate<ModulePlayerDTO>({
                moduleId: view.moduleId,
                name: view.name,
                description: view.description,
                imageFilePath: urlService
                    .getAssetUrlNullable(view.imageFilePath)
            });
        }),
    epistoMappingsBuilder
        .addMapping(ImproveYourselfPageStatsDTO, () => (stats: ImproveYourselfPageStatsView, mostProductiveTimeRangeChartData: MostProductiveTimeRangeView[], userDailyActivityChartData: UserDailyActivityChartView[]) => {
            return instantiate<ImproveYourselfPageStatsDTO>({
                userId: stats.userId,
                mostProductiveTimeRange: stats.mostProductiveTimeRange,
                mostProductiveTimeRangeChartData: mostProductiveTimeRangeChartData.map((x, index) => {
                    return [index, x.performancePercentage];
                }),
                mostActiveDay: stats.mostActiveDay,
                mostActiveDayChartData: userDailyActivityChartData.map((x, index) => {
                    return [index, x.totalSessionLengthSeconds / 60];
                })
            });
        }),
    epistoMappingsBuilder
        .addArrayMapping(ModuleEditDTO, ([url]) => (views: ModuleEditView[]) => {

            return views
                .map(x => instantiate<ModuleEditDTO>({
                    description: x.description,
                    moduleVersionId: x.moduleVersionId,
                    isPretestModule: x.isPretestModule,
                    name: x.name,
                    orderIndex: x.orderIndex,
                    imageFilePath: url.getAssetUrlNullable(x.coverFilePath),
                    moduleId: x.moduleId
                }));
        }),
    epistoMappingsBuilder
        .addArrayMapping(UserVideoStatsDTO, () => (stats: UserVideoStatsView[]) => {
            return stats.map(x => {
                return {
                    userId: x.userId,
                    videoId: x.videoId,
                    videoTitle: x.videoTitle,
                    courseId: x.courseId,
                    lengthSeconds: x.lengthSeconds,
                    totalSpentTimeSeconds: x.totalSpentTimeSeconds,
                    videoReplaysCount: x.videoReplaysCount,
                    isRecommendedForRetry: x.isRecommendedForRetry,
                    lastThreeAnswerAverage: x.lastThreeAnswerAverage,
                    averageReactionTime: x.averageReactionTime,
                    lastWatchTime: x.lastWatchTime
                };
            });
        }),
    epistoMappingsBuilder
        .addArrayMapping(UserExamStatsDTO, () => (stats: UserExamStatsView[]) => {

            return stats
                .map(x => {
                    return {
                        userId: x.userId,
                        examId: x.examId,
                        examTitle: x.examTitle,
                        courseId: x.courseId,
                        answerSessionId: x.answerSessionId,
                        correctAnswerRate: x.correctAnswerRate,
                        shouldPractiseExam: x.shouldPractiseExam,
                        correctAnswerCount: x.correctAnswerCount,
                        examLengthSeconds: x.examLengthSeconds,
                        lastCompletionDate: x.lastCompletionDate,
                        averageReactionTime: x.averageReactionTime
                    };
                });
        }),
    epistoMappingsBuilder
        .addArrayMapping(CommentListDTO, () => (comments: CommentListView[]) => {

            return comments
                .map(comment => (instantiate<CommentListDTO>({
                    id: comment.id,
                    userId: comment.userId,
                    threadId: comment.threadId,
                    fullName: comment.fullName,
                    commentText: comment.commentText,
                    creationDate: comment.creationDate,
                    parentCommentId: comment.parentCommentId,
                    avatarUrl: comment.avatarUrl,
                    commentLikeCount: comment.commentLikeCount,
                    isCurrentUserLikedComment: comment.isLike,
                    isQuestion: comment.isQuestion
                })));
        }),
    epistoMappingsBuilder
        .addMapping(EventDTO, () => (event: Event) => {

            return instantiate<EventDTO>({
                data: JSON.parse(event.data),
                type: event.type
            });
        }),
    epistoMappingsBuilder
        .addArrayMapping(CoinTransactionDTO, () => (coinTransactions: CoinTransactionView[]) => {
            return coinTransactions.map(x => {
                return instantiate<CoinTransactionDTO>({
                    ...x
                });
            });
        }),
    epistoMappingsBuilder
        .addArrayMapping(ShopItemDTO, ([urlService]) => (shopItemViews: ShopItemStatefulView[]) => {
            return shopItemViews
                .map(shopItem => {
                    return instantiate<ShopItemDTO>({
                        id: shopItem.id,
                        courseId: shopItem.courseId,
                        userId: shopItem.userId,
                        name: shopItem.name,
                        canPurchase: shopItem.canPurchase,
                        purchaseCount: shopItem.purchaseCount,
                        purchaseLimit: shopItem.purchaseLimit,
                        coinPrice: shopItem.coinPrice,
                        currencyPrice: shopItem.currencyPrice,
                        shopItemCategoryId: shopItem.shopItemCategoryId,
                        shopItemCategoryName: shopItem.shopItemCategoryName,
                        coverFilePath: urlService.getAssetUrl(shopItem.coverFilePath),
                        detailsUrl: shopItem.detailsUrl
                    });
                });
        }),
    epistoMappingsBuilder
        .addArrayMapping(ShopItemCategoryDTO, () => (shopItemCategories: ShopItemCategory[]) => {
            return shopItemCategories
                .map(shopItemCategory => {
                    return instantiate<ShopItemCategoryDTO>({
                        id: shopItemCategory.id,
                        name: shopItemCategory.name
                    });
                });
        }),
    epistoMappingsBuilder
        .addArrayMapping(CourseLearningDTO, ([urlService]) => (stats: CourseLearningStatsView[]) => {

            return stats.map(stat => {
                const thumbnailImageURL = stat.filePath
                    ? urlService.getAssetUrl(stat.filePath)
                    : urlService.getAssetUrl('/images/defaultCourseCover.jpg');

                return instantiate<CourseLearningDTO>({
                    courseId: stat.courseId,
                    title: stat.title,
                    categoryName: stat.categoryName,
                    subCategoryName: stat.subCategoryName,
                    currentItemCode: stat.currentItemCode,
                    teacherName: toFullName(stat.teacherFirstName, stat.teacherLastName),
                    thumbnailImageURL: thumbnailImageURL,
                    firstItemCode: '',
                    isComplete: stat.isCompleted,
                    totalSpentSeconds: stat.totalSpentSeconds,
                    totalCourseItemCount: stat.totalCourseItemCount,
                    completedCourseItemCount: stat.completedCourseItemCount,
                    totalVideoCount: stat.totalVideoCount,
                    completedVideoCount: stat.completedVideoCount,
                    totalVideoQuestionCount: stat.totalVideoQuestionCount,
                    answeredVideoQuestionCount: stat.answeredVideoQuestionCount,
                    examSuccessRateAverage: stat.avgExamScorePercentage,
                    questionSuccessRate: stat.questionSuccessRate,
                    finalExamSuccessRate: stat.finalExamScorePercentage
                });
            });
        }),
    epistoMappingsBuilder
        .addArrayMapping(CourseProgressShortDTO, () => (courseProgressViews: CourseProgressView[]) => {
            return courseProgressViews
                .map(courseProgressView => (instantiate<CourseProgressShortDTO>({
                    courseId: courseProgressView.courseId,
                    courseTitle: courseProgressView.courseTitle,
                    completedCourseItemCount: courseProgressView.completedCourseItemCount,
                    progressPercentage: courseProgressView.progressPercentage,
                    totalCourseItemCount: courseProgressView.totalCourseItemCount
                })));
        }),
    epistoMappingsBuilder
        .addArrayMapping(CourseContentItemAdminDTO, () => (views: CourseAdminContentView[]) => {

            return views.map(view => {

                const getIssueList = (issues: string) => issues
                    .split('\n')
                    .filter(x => !!x)
                    .map((x): CourseContentItemIssueDTO => {

                        if (x.includes(': ')) {
                            const parts = x.split(': ');
                            return {
                                code: parts[1] as any,
                                questionName: parts[0]
                            };
                        }

                        return {
                            code: x as any
                        };
                    });

                const errors = getIssueList(view.errors);
                const warnings = getIssueList(view.warnings);

                return instantiate<CourseContentItemAdminDTO>({
                    courseId: view.courseId,
                    examVersionId: view.examVersionId,
                    versionCode: view.versionCode,
                    itemOrderIndex: view.itemOrderIndex,
                    itemSubtitle: view.itemSubtitle,
                    itemTitle: view.itemTitle,
                    moduleVersionId: view.moduleVersionId,
                    moduleName: view.moduleName,
                    moduleOrderIndex: view.moduleOrderIndex,
                    videoVersionId: view.videoVersionId,
                    errors,
                    warnings,
                    videoLength: view.videoLength,
                    videoAudioText: view.videoAudioText,
                    itemType: view.itemType,
                    questionMutations: [],
                    answerMutations: [],
                });
            });
        }),
    epistoMappingsBuilder
        .addMapping(CourseDetailsDTO, ([urlService]) => (detailsView: CourseDetailsView, modules: PlaylistModuleDTO[]) => {

            const thumbnailImageURL = detailsView.coverFilePath
                ? urlService.getAssetUrl(detailsView.coverFilePath)
                : urlService.getAssetUrl('/images/defaultCourseCover.jpg');

            return instantiate<CourseDetailsDTO>({

                title: detailsView.title,
                modificationDate: detailsView.modificationDate ? detailsView.modificationDate.toString() : '-',
                description: detailsView.description,
                categoryName: detailsView.categoryName,
                subCategoryName: detailsView.subCategoryName,
                thumbnailURL: thumbnailImageURL,
                canStartCourse: detailsView.canStartCourse,
                courseId: detailsView.courseId,
                shortDescription: detailsView.shortDescription,
                language: detailsView.languageName,
                difficulty: detailsView.difficulty,
                benchmark: detailsView.benchmark,
                previouslyCompletedCount: detailsView.previouslyCompletedCount,
                visibility: detailsView.visibility,
                humanSkillBenefitsDescription: detailsView.humanSkillBenefitsDescription,
                currentItemCode: detailsView.currentItemCode,
                stageName: detailsView.stageName,

                skillBenefits: parseCommaSeparatedStringList(detailsView.skillBenefits),
                technicalRequirements: parseCommaSeparatedStringList(detailsView.technicalRequirements),
                humanSkillBenefits: parseSkillBenefits(detailsView.humanSkillBenefits),

                modules: modules,

                teacherData: {
                    teacherFullName: toFullName(detailsView.teacherFirstName, detailsView.teacherLastName),
                    teacherFirstName: detailsView.teacherFirstName,
                    teacherLastName: detailsView.teacherLastName,
                    teacherBadges: parseCommaSeparatedStringList(detailsView.teacherBadges) as TeacherBadgeNameType[],
                    teacherCourseCount: detailsView.teacherCourseCount,
                    teacherDescription: detailsView.teacherDescription,
                    teacherRating: detailsView.teacherRating,
                    teacherSkills: detailsView.teacherSkills,
                    teacherStudentCount: detailsView.teacherStudentCount,
                    teacherVideoCount: detailsView.teacherVideoCount,
                    teacherAvatarFilePath: detailsView.teacherAvatarFilePath
                        ? urlService.getAssetUrl(detailsView.teacherAvatarFilePath)
                        : null
                },

                totalModuleCount: detailsView.totalModuleCount,
                totalVideoCount: detailsView.totalVideoCount,
                totalVideoQuestionCount: detailsView.totalVideoQuestionCount,
                totalVideoSumLengthSeconds: detailsView.totalVideoSumLengthSeconds
            });

        }),
    epistoMappingsBuilder
        .addMapping(UserDTO, ([urlService]) => (
            user: User,
            avatarPath: string | null,
            departmentId: Id<'Department'> | null,
            departmentName: string | null) => {

            return instantiate<UserDTO>({
                id: user.id,
                companyId: user.companyId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber || '',
                isTrusted: user.isTrusted,
                isInvitationAccepted: user.isInvitationAccepted,
                name: `${user.lastName} ${user.firstName}`,
                username: user.username,
                department: (departmentId && departmentName)
                    ? {
                        id: departmentId,
                        name: departmentName
                    }
                    : null,
                avatarUrl: avatarPath
                    ? avatarPath
                    : null
            });
        }),
    epistoMappingsBuilder
        .addMapping(CompanyEditDataDTO, ([urlService]) => (company: Company, logoFilePath: string | null, coverFilePath: string | null) => {

            return instantiate<CompanyEditDataDTO>({
                id: company.id,
                name: company.name,
                legalName: company.legalName,
                backdropColor: company.backdropColor,
                domain: company.domain,
                isCustomDomainCompany: true,
                primaryColor: company.primaryColor,
                secondaryColor: company.secondaryColor,
                logoUrl: urlService.getAssetUrlNullable(logoFilePath),
                coverUrl: urlService.getAssetUrlNullable(coverFilePath),
                isSurveyRequired: company.isSurveyRequired
            });
        }),
    epistoMappingsBuilder
        .addMapping(CompanyPublicDTO, ([urlService]) => (company: Company, logoFilePath: string | null, coverFilePath: string | null) => instantiate<CompanyPublicDTO>({
            name: company.name,
            legalName: company.legalName,
            backdropColor: company.backdropColor,
            domain: company.domain,
            primaryColor: company.primaryColor,
            secondaryColor: company.secondaryColor,
            logoUrl: urlService.getAssetUrlNullable(logoFilePath),
            coverUrl: urlService.getAssetUrlNullable(coverFilePath),
        })),
    // TODO: unused mapping, check DTO's and endpoints too
    epistoMappingsBuilder
        .addMapping(CourseStatDTO, () => (view: AvailableCourseView) => {

            return instantiate<CourseStatDTO>({
                title: view.title,
                /* coverImageUrl: view.filePath
                    ? urlService.getAssetUrl(view.filePath)
                    : urlService.getAssetUrl('/images/defaultCourseCover.jpg') */
            });
        }),
    epistoMappingsBuilder
        .addMapping(DailyTipDTO, ([urlService]) => (view: DailyTipView) => {

            return instantiate<DailyTipDTO>({
                id: view.dailyTipId,
                description: view.description,
                videoUrl: urlService.getAssetUrl(view.videoFilePath)
            });
        }),

    epistoMappingsBuilder
        .addArrayMapping(AvailableCourseDTO, ([urlService]) => (views: AvailableCourseView[]) => {

            return views
                .map(view => {

                    const thumbnailImageURL = view.filePath
                        ? urlService.getAssetUrl(view.filePath)
                        : urlService.getAssetUrl('/images/defaultCourseCover.jpg');

                    const currentItemCode = view.isStarted
                        ? view.currentItemCode
                        : null;

                    return instantiate<AvailableCourseDTO>({
                        courseId: view.courseId,
                        title: view.title,
                        categoryId: view.categoryId,
                        categoryName: view.categoryName,
                        subCategoryId: view.subCategoryId,
                        subCategoryName: view.subCategoryName,
                        currentItemCode: currentItemCode,
                        stageName: view.stageName,
                        courseLength: 0,
                        teacherName: toFullName(view.teacherFirstName, view.teacherLastName),
                        thumbnailImageURL: thumbnailImageURL,
                        isComplete: view.isCompleted,
                        benchmark: view.benchmark,
                        difficulty: view.difficulty,
                        totalVideoCount: view.totalVideoCount,
                        totalVideoSumLengthSeconds: view.totalVideoSumLengthSeconds,
                        isStarted: view.isStarted,
                        completedVideoCount: view.completedVideoCount,
                        requiredCompletionDate: view.requiredCompletionDate,
                        finalExamScorePercentage: view.finalExamScorePercentage
                    });
                });
        }),

    epistoMappingsBuilder
        .addArrayMapping(CourseAdminListItemDTO, ([urlService]) => (views: CourseAdminShortView[]) => {
            return views.map(view => {

                const thumbnailImageURL = view.coverFilePath
                    ? urlService.getAssetUrl(view.coverFilePath)
                    : urlService.getAssetUrl('/images/defaultCourseCover.jpg');

                return instantiate<CourseAdminListItemDTO>({
                    title: view.title,
                    courseId: view.courseId,
                    videosCount: view.videoCount,
                    examCount: view.examCount,
                    thumbnailImageURL,
                    category: {
                        id: view.categoryId,
                        name: view.categoryName
                    },
                    subCategory: {
                        id: view.subCategoryId,
                        name: view.subCategoryName
                    },
                    teacher: {
                        id: view.teacherId,
                        fullName: toFullName(view.teacherFirstName, view.teacherLastName)
                        //firstName: view.teacherFirstName,
                        //lastName: view.teacherLastName,
                    }
                });
            });
        }),
    epistoMappingsBuilder
        .addMapping(TeacherInfoEditDTO, () => (teacherInfo: TeacherInfo) => {
            return instantiate<TeacherInfoEditDTO>({
                id: teacherInfo.id,
                courseCount: teacherInfo.courseCount,
                rating: teacherInfo.rating,
                studentCount: teacherInfo.studentCount,
                videoCount: teacherInfo.videoCount,
                skills: teacherInfo.skills,
                badges: parseCommaSeparatedStringList(teacherInfo.badges) as TeacherBadgeNameType[],
                description: teacherInfo.description
            });
        }),
    epistoMappingsBuilder
        .addArrayMapping(ShopItemAdminShortDTO, ([urlService]) => (shopItems: ShopItemView[]) => {

            return shopItems
                .map(shopItem => {

                    return instantiate<ShopItemAdminShortDTO>({
                        id: shopItem.id,
                        coverFilePath: urlService.getAssetUrl(shopItem.coverFilePath),
                        coinPrice: shopItem.coinPrice,
                        currencyPrice: shopItem.currencyPrice,
                        name: shopItem.name,
                        purchaseLimit: shopItem.purchaseLimit,
                        shopItemCategoryId: shopItem.shopItemCategoryId
                    });
                });
        }),
    // TODO: Name, purchaseLimit, detailsUrl shouldn\'t be null
    epistoMappingsBuilder
        .addMapping(ShopItemEditDTO, ([urlService]) => (shopItem: ShopItem, discountCodes: DiscountCode[]) => {
            return instantiate<ShopItemEditDTO>({
                id: shopItem.id,
                coverFilePath: shopItem.coverFile?.filePath
                    ? urlService.getAssetUrl(shopItem.coverFile.filePath)
                    : '',
                coinPrice: shopItem.coinPrice,
                currencyPrice: shopItem.currencyPrice,
                name: shopItem.name || '',
                purchaseLimit: shopItem.purchaseLimit || 0,
                shopItemCategoryId: shopItem.shopItemCategoryId,
                courseId: shopItem.courseId,
                detailsUrl: shopItem.detailsUrl || '',
                discountCodes: discountCodes
                    .map(discountCode => {

                        return instantiate<DiscountCodeDTO>({
                            id: discountCode.id,
                            code: discountCode.code,
                            isUsed: !!discountCode.userId
                        });
                    })
            });
        }),
    epistoMappingsBuilder
        .addMapping(ShopItemBriefData, () => (view: ShopItemView) => {

            return instantiate<ShopItemBriefData>({
                name: view.name
            });
        }),
    epistoMappingsBuilder
        .addMapping(CourseBriefData, () => (course: CourseData, courseId: Id<'Course'>) => {

            return instantiate<CourseBriefData>({
                id: courseId,
                title: course.title
            });
        }),
    epistoMappingsBuilder
        .addArrayMapping(CourseShopItemListDTO, ([urlService]) => (courses: CourseShopItemListView[]) => {

            return courses.map(course => {
                return instantiate<CourseShopItemListDTO>({
                    id: course.courseId,
                    title: course.title,
                    coverImagePath: course.coverFilePath
                        ? urlService.getAssetUrl(course.coverFilePath)
                        : null
                });
            });
        }),
    epistoMappingsBuilder
        .addMapping(CourseOverviewDataDTO, () => (course: CourseOverviewView) => {

            return instantiate<CourseOverviewDataDTO>({
                answeredVideoQuestionCount: course.answeredVideoQuestionCount,
                coinsAcquired: course.coinsAcquired,
                completedVideoCount: course.completedVideoCount,
                examSuccessRateAverage: course.examSuccessRateAverage,
                finalExamSuccessRate: course.finalExamSuccessRate,
                questionSuccessRate: course.questionSuccessRate,
                totalSpentSeconds: course.totalSpentSeconds
            });
        }),
    epistoMappingsBuilder
        .addMapping(PersonalityTraitCategoryShortDTO, () => (x: PersonalityTraitCategoryView, isMax: boolean) => {

            return instantiate<PersonalityTraitCategoryShortDTO>({
                id: x.id,
                title: x.title,
                label: isMax ? x.maxLabel : x.minLabel,
                isMax,
                tipCount: isMax ? x.maxTipsCount : x.minTipsCount
            });
        }),
    epistoMappingsBuilder
        .addMapping(PersonalityTraitCategoryDTO, () => (category: PersonalityTraitCategory, tips: DailyTip[]) => {

            return instantiate<PersonalityTraitCategoryDTO>({
                id: category.id,
                maxDescription: category.maxDescription,
                maxLabel: category.maxLabel,
                minDescription: category.minDescription,
                minLabel: category.minLabel,
                title: category.title,
                tips: tips.map(tip => {
                    return instantiate<DailyTipDTO>({
                        description: tip.description,
                        id: tip.id,
                        videoUrl: ''
                    });
                })
            });
        }),
    epistoMappingsBuilder
        .addMapping(DailyTipEditDataDTO, () => (dailyTip: DailyTip) => {

            return instantiate<DailyTipEditDataDTO>({
                description: dailyTip.description,
                id: dailyTip.id,
                isLive: dailyTip.isLive
            });
        }),
    epistoMappingsBuilder
        .addMapping(PrequizQuestionDTO, () => (question: PrequizQuestionView, answers: PrequizAnswerDTO[]) => {

            return instantiate<PrequizQuestionDTO>({
                id: question.questionId,
                isNumeric: question.isNumericAnswer,
                text: question.questionText,
                minValue: question.minValue,
                maxValue: question.maxValue,
                stepValue: question.stepValue,
                maxLabel: question.maxLabel,
                minLabel: question.minLabel,
                valuePostfix: question.valuePostfix,
                answers
            });
        }),
    epistoMappingsBuilder
        .addMapping(PrequizAnswerDTO, () => (question: PrequizQuestionView) => {

            return instantiate<PrequizAnswerDTO>({
                id: question.answerId,
                text: question.answerText
            });
        }),
    epistoMappingsBuilder
        .addMapping(CourseRatingQuestionDTO, () => (question: CourseRatingQuestionView) => {

            return instantiate<CourseRatingQuestionDTO>({
                id: question.questionId,
                text: question.questionText,
                type: question.questionType,
                answerText: question.answerText,
                answerValue: question.answerValue
            });
        }),
    epistoMappingsBuilder
        .addMapping(CourseRatingGroupDTO, () => (view: CourseRatingQuestionView, questions: CourseRatingQuestionDTO[]) => {

            return instantiate<CourseRatingGroupDTO>({
                id: view.groupId,
                name: view.groupName,
                questions
            });
        }),
    epistoMappingsBuilder
        .addArrayMapping(UserActiveCourseDTO, ([urlService]) => (views: UserActiveCourseView[]) => {

            return views.map(view => {
                return instantiate<UserActiveCourseDTO>({
                    courseId: view.courseId,
                    coverFilePath: urlService.getAssetUrl(view.coverFilePath),
                    title: view.title
                });
            });
        }),
    // TODO: Check if canManage is needed here
    epistoMappingsBuilder
        .addArrayMapping(CompanyDTO, () => (views: CompanyView[]) => {

            return views.map(view => {
                return instantiate<CompanyDTO>({
                    id: view.companyId,
                    name: view.companyName,
                    isSurveyRequired: view.isSurveyRequired
                });
            });
        }),
    epistoMappingsBuilder
        .addArrayMapping(CompanyDTO, () => (companies: Company[]) => companies
            .map(company => instantiate<CompanyDTO>({
                id: company.id,
                name: company.name,
                isSurveyRequired: company.isSurveyRequired
            }))
        ),
    epistoMappingsBuilder
        .addArrayMapping(PermissionListDTO, () => (permissions: Permission[]) => {

            return permissions.map(permission => {

                return instantiate<PermissionListDTO>({
                    code: permission.code,
                    scope: permission.scope
                });
            });
        }),

    epistoMappingsBuilder
        .addMapping(QuestionDTO, () => (questionData: QuestionDataView[]) => {

            return toQuestionDTO(questionData)
                .single();
        }),

    epistoMappingsBuilder
        .addArrayMapping(CompanyAssociatedCourseDTO, ([urlService]) => (views: CompanyAssociatedCoursesView[]) => {

            return views
                .map(view => instantiate<CompanyAssociatedCourseDTO>({
                    courseId: view.courseId,
                    coverUrl: urlService.getAssetUrl(view.coverFilePath),
                    title: view.title,
                    isAssociated: view.isAssigned,
                    isDefault: view.isDefault
                }));
        })

] as const;

export type EpistoMappingsType = Mutable<typeof marray>;

const separationChar = '|';

export const createCharSeparatedList = (list: string[]) => {

    return list.join(` ${separationChar} `);
};

const parseCommaSeparatedStringList = (str: string) => {

    return (str ?? '')
        .split(separationChar)
        .map(x => x
            .trim());
};

const parseSkillBenefits = (str: string) => {

    if (!str)
        return [];

    return (str ?? '')
        .split(separationChar)
        .map(x => {

            const trimmed = x.trim();
            const split = trimmed.split(':');

            return {
                text: split[0].trim(),
                value: parseInt(split[1].trim())
            };
        });
};

const toStatsDTO = (statsView: ExamResultStatsView) => {

    return instantiate<ExamStatsDTO>({
        fullyCorrectlyAnsweredQuestionsCount: statsView.fullyCorrectlyAnsweredQuestionsCount,
        questionsCount: statsView.questionCount,
        scorePercentage: statsView.scorePercentage,
        examLengthSeconds: statsView.examLengthSeconds,
        scorePercentageDiffFromAvg: statsView.scorePercentageDiffFromAvg,
        answeredQuestionCount: statsView.answeredQuestionCount,
        examMaxScore: statsView.examMaxScore,
        examScore: statsView.examScore
    });
};

export const toRoleDTO = (role: Role) => {

    return {
        id: role.id,
        name: role.name
    } as RoleDTO;
};

export const toCourseCategoryDTO = (cc: CourseCategory[]): CourseCategoryDTO[] => {

    return cc
        .filter(x => !x.parentCategoryId)
        .map(parent => {

            const children = cc
                .filter(cat => cat.parentCategoryId === parent.id);

            return {
                id: parent.id,
                name: parent.name,
                childCategories: children
                    .map(child => ({
                        id: child.id,
                        name: child.name
                    }))
            } as CourseCategoryDTO;
        });
};

export const toTaskDTO = (task: Task) => {

    return {
        name: task.name,
        dueDate: task.dueData,
        objective: task.objective
    } as TaskDTO;
};

export const toResultAnswerDTO = (view: ExamResultView) => {

    return {
        answerId: view.answerId,
        answerText: view.answerText,
        isCorrect: view.isAnswerCorrect,
        isGiven: view.isGivenAnswer
    } as ResultAnswerDTO;
};

export const toQuestionDTO = (lqav: QuestionDataView[]) => {

    return lqav
        .groupBy(x => x.questionId)
        .map(questionGrouping => {

            const viewAsQuestion = questionGrouping
                .items
                .first();

            return instantiate<QuestionDTO>({
                questionVersionId: viewAsQuestion.questionVersionId,
                orderIndex: viewAsQuestion.orderIndex,
                questionText: viewAsQuestion.questionText,
                imageUrl: viewAsQuestion.imageUrl,
                showUpTimeSeconds: viewAsQuestion.showUpTimeSeconds,
                typeId: viewAsQuestion.typeId,
                answers: questionGrouping
                    .items
                    .map(viewAsAnswer => {
                        return instantiate<AnswerDTO>({
                            answerVersionId: viewAsAnswer.answerVersionId,
                            answerText: viewAsAnswer.answerText
                        });
                    })
            });
        });
};

export const toSignupDataDTO = (questions: SignupQuestionView[], isCompletedSignup: boolean) => {

    return {
        questions: questions
            .groupBy(x => x.questionVersionId)
            .map(questionGrouping => {

                const viewAsQuestion = questionGrouping.items.first();

                return {
                    questionVersionId: viewAsQuestion.questionVersionId,
                    questionText: viewAsQuestion.questionText,
                    imageUrl: viewAsQuestion.imageUrl,
                    typeId: viewAsQuestion.typeId,
                    answers: questionGrouping
                        .items
                        .map(viewAsAnswer => {

                            return {
                                answerVersionId: viewAsAnswer.answerVersionId,
                                answerText: viewAsAnswer.answerText,
                                isGiven: viewAsAnswer.isGivenAnswer
                            } as SignupAnswerDTO;
                        })
                } as SignupQuestionDTO;
            }),
        isCompleted: isCompletedSignup
    } as SurveyDataDTO;
};
