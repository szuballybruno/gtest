import { Answer } from "../../models/entity/Answer";
import { Course } from "../../models/entity/Course";
import { CourseCategory } from "../../models/entity/CourseCategory";
import { CourseModule } from "../../models/entity/CourseModule";
import { Event } from "../../models/entity/Event";
import { Exam } from "../../models/entity/Exam";
import { JobTitle } from "../../models/entity/JobTitle";
import { Organization } from "../../models/entity/Organization";
import { Question } from "../../models/entity/Question";
import { Role } from "../../models/entity/Role";
import { ShopItemCategory } from "../../models/entity/ShopItemCategory";
import { Task } from "../../models/entity/Task";
import { User } from "../../models/entity/User";
import { Video } from "../../models/entity/Video";
import { AdminPageUserDTO } from "../../models/shared_models/AdminPageUserDTO";
import { AnswerDTO } from "../../models/shared_models/AnswerDTO";
import { AnswerEditDTO } from "../../models/shared_models/AnswerEditDTO";
import { CoinTransactionDTO } from "../../models/shared_models/CoinTransactionDTO";
import { CourseAdminItemShortDTO } from "../../models/shared_models/CourseAdminItemShortDTO";
import { CourseAdminListItemDTO } from "../../models/shared_models/CourseAdminListItemDTO";
import { CourseCategoryDTO } from "../../models/shared_models/CourseCategoryDTO";
import { CourseContentEditDataDTO } from "../../models/shared_models/CourseContentEditDataDTO";
import { CourseDetailsDTO } from "../../models/shared_models/CourseDetailsDTO";
import { CourseDetailsEditDataDTO } from "../../models/shared_models/CourseDetailsEditDataDTO";
import { CourseItemDTO } from "../../models/shared_models/CourseItemDTO";
import { CourseLearningDTO } from "../../models/shared_models/CourseLearningDTO";
import { CourseProgressShortDTO } from "../../models/shared_models/CourseProgressShortDTO";
import { CourseShortDTO } from "../../models/shared_models/CourseShortDTO";
import { CourseStatDTO } from "../../models/shared_models/CourseStatDTO";
import { DailyTipDTO } from "../../models/shared_models/DailyTipDTO";
import { EventDTO } from "../../models/shared_models/EventDTO";
import { ExamDTO } from "../../models/shared_models/ExamDTO";
import { ExamResultQuestionDTO } from "../../models/shared_models/ExamResultQuestionDTO";
import { ExamResultsDTO } from "../../models/shared_models/ExamResultsDTO";
import { JobTitleDTO } from "../../models/shared_models/JobTitleDTO";
import { ModuleAdminEditDTO } from "../../models/shared_models/ModuleAdminEditDTO";
import { ModuleAdminShortDTO } from "../../models/shared_models/ModuleAdminShortDTO";
import { ModuleDetailedDTO } from "../../models/shared_models/ModuleDetailedDTO";
import { ModuleShortDTO } from "../../models/shared_models/ModuleShortDTO";
import { OrganizationDTO } from "../../models/shared_models/OrganizationDTO";
import { QuestionDTO } from "../../models/shared_models/QuestionDTO";
import { ResultAnswerDTO } from "../../models/shared_models/ResultAnswerDTO";
import { RoleDTO } from "../../models/shared_models/RoleDTO";
import { ShopItemCategoryDTO } from "../../models/shared_models/ShopItemCategoryDTO";
import { ShopItemDTO } from "../../models/shared_models/ShopItemDTO";
import { SignupAnswerDTO } from "../../models/shared_models/SignupAnswerDTO";
import { SignupDataDTO } from "../../models/shared_models/SignupDataDTO";
import { SignupQuestionDTO } from "../../models/shared_models/SignupQuestionDTO";
import { TaskDTO } from "../../models/shared_models/TaskDTO";
import { CourseItemStateType } from "../../models/shared_models/types/sharedTypes";
import { UserActivityDTO } from "../../models/shared_models/UserActivityDTO";
import { UserDTO } from "../../models/shared_models/UserDTO";
import { UserEditDTO } from "../../models/shared_models/UserEditDTO";
import { UserStatsDTO } from "../../models/shared_models/UserStatsDTO";
import { VideoDTO } from "../../models/shared_models/VideoDTO";
import { VideoShortDTO } from "../../models/shared_models/VideoShortDTO";
import { CoinTransactionView } from "../../models/views/CoinTransactionView";
import { CourseAdminContentView } from "../../models/views/CourseAdminContentView";
import { CourseAdminDetailedView } from "../../models/views/CourseAdminDetailedView";
import { CourseAdminShortView } from "../../models/views/CourseAdminShortView";
import { CourseDetailsView } from "../../models/views/CourseDetailsView";
import { CourseItemStateView } from "../../models/views/CourseItemStateView";
import { CourseLearningStatsView } from "../../models/views/CourseLearningStatsView";
import { CourseModuleOverviewView } from "../../models/views/CourseModuleOverviewView";
import { CourseProgressView } from "../../models/views/CourseProgressView";
import { CourseView } from "../../models/views/CourseView";
import { DailyTipView } from "../../models/views/DailyTipView";
import { ExamResultView } from "../../models/views/ExamResultView";
import { ShopItemView } from "../../models/views/ShopItemView";
import { SignupQuestionView } from "../../models/views/SignupQuestionView";
import { UserActivityFlatView } from "../../models/views/UserActivityFlatView";
import { UserStatsView } from "../../models/views/UserStatsView";
import { staticProvider } from "../../staticProvider";
import { getFullName, navPropNotNull, toFullName } from "../../utilities/helpers";
import { getItemCode } from "./encodeService";
import { MapperService } from "../MapperService";
import { getAssetUrl, getExamCoverImageUrl } from "./urlProvider";

export const initializeMappings = (mapperService: MapperService) => {

    mapperService
        .addMap(CourseModule, ModuleDetailedDTO, view => ({
            id: view.id,
            name: view.name,
            description: view.description
        }));

    mapperService
        .addMap(CourseModule, ModuleAdminEditDTO, view => ({
            id: view.id,
            name: view.name,
            description: view.description
        }));

    mapperService
        .addMap(UserStatsView, UserStatsDTO, view => ({
            userId: view.userId,
            userEmail: view.userEmail,
            averageSessionLengthSeconds: view.averageSessionLengthSeconds,
            completedExamCount: view.completedExamCount,
            completedVideoCount: view.completedVideoCount,
            successfulExamCount: view.successfulExamCount,
            totalAnswerSessionSuccessRate: view.totalAnswerSessionSuccessRate,
            totalCorrectAnswerRate: view.totalCorrectAnswerRate,
            totalCorrectGivenAnswerCount: view.totalCorrectGivenAnswerCount,
            totalGivenAnswerCount: view.totalGivenAnswerCount,
            totalSessionLengthSeconds: view.totalSessionLengthSeconds,
            totalSuccessfulExamRate: view.totalSuccessfulExamRate,
            totalVideoPlaybackSeconds: view.totalVideoPlaybackSeconds
        }));

    mapperService
        .addMap(Event, EventDTO, event => ({
            data: JSON.parse(event.data),
            type: event.type
        }));

    mapperService
        .addMap(CoinTransactionView, CoinTransactionDTO, view => ({
            ...view
        }));

    mapperService
        .addMap(ShopItemView, ShopItemDTO, x => ({
            id: x.id,
            courseId: x.courseId,
            userId: x.userId,
            name: x.name,
            canPurchase: x.canPurchase,
            purchaseCount: x.purchaseCount,
            purchaseLimit: x.purchaseLimit,
            coinPrice: x.coinPrice,
            currencyPrice: x.currencyPrice,
            shopItemCategoryId: x.shopItemCategoryId,
            shopItemCategoryName: x.shopItemCategoryName,
            coverFilePath: getAssetUrl(x.coverFilePath)
        }));

    mapperService
        .addMap(ShopItemCategory, ShopItemCategoryDTO, x => ({
            id: x.id,
            name: x.name
        }));

    mapperService
        .addMap(CourseLearningStatsView, CourseLearningDTO, x => {

            const thumbnailImageURL = x.filePath
                ? getAssetUrl(x.filePath)
                : getAssetUrl("/images/defaultCourseCover.jpg");

            return {
                courseId: x.id,
                title: x.title,
                categoryName: x.categoryName,
                subCategoryName: x.subCategoryName,
                teacherName: toFullName(x.teacherFirstName, x.teacherLastName),
                thumbnailImageURL: thumbnailImageURL,
                isComplete: x.isCompleted,
                totalSpentTime: x.totalSpentTime,
                totalCourseItemCount: x.totalCourseItemCount,
                completedCourseItemCount: x.completedCourseItemCount,
                totalVideoCount: x.totalVideoCount,
                completedVideoCount: x.completedVideoCount,
                totalVideoQuestionCount: x.totalVideoQuestionCount,
                answeredVideoQuestionCount: x.answeredVideoQuestionCount,
                examSuccessRateAverage: x.examSuccessRateAverage,
                questionSuccessRate: x.questionSuccessRate,
                finalExamSuccessRate: x.finalExamSuccessRate
            };
        });

    mapperService
        .addMap(CourseProgressView, CourseProgressShortDTO, x => ({
            ...x
        }));

    mapperService
        .addMap(CourseAdminDetailedView, CourseDetailsEditDataDTO, (view, params) => {

            const { categories, teachers } = params as { categories: CourseCategory[], teachers: User[] };

            const courseCategoryDTOs = categories
                .map(x => toCourseCategoryDTO(x));

            const thumbnailImageURL = view.coverFilePath
                ? getAssetUrl(view.coverFilePath)
                : getAssetUrl("/images/defaultCourseCover.jpg");

            return {
                title: view.title,
                courseId: view.courseId,
                thumbnailURL: thumbnailImageURL,
                shortDescription: view.shortDescription,
                language: view.languageName,
                difficulty: view.difficulty,
                description: view.description,
                benchmark: view.benchmark,
                visibility: view.visibility,
                teacherId: view.teacherId,
                humanSkillBenefitsDescription: view.humanSkillBenefitsDescription,

                skillBenefits: parseCommaSeparatedStringList(view.skillBenefits),
                technicalRequirements: parseCommaSeparatedStringList(view.technicalRequirements),
                humanSkillBenefits: parseSkillBenefits(view.humanSkillBenefits),

                category: {
                    id: view.categoryId,
                    name: view.categoryName
                },
                subCategory: {
                    id: view.subCategoryId,
                    name: view.subCategoryName
                },
                teachers: teachers
                    .map(x => ({
                        fullName: toFullName(x.firstName, x.lastName),
                        id: x.id
                    })),
                categories: courseCategoryDTOs
            } as CourseDetailsEditDataDTO;
        });

    mapperService
        .addMap(CourseAdminContentView, CourseContentEditDataDTO, (view, params) => {

            const modules = params as CourseAdminContentView[];

            const moduleDTOs = modules
                .groupBy(x => x.moduleId)
                .map(grouping => {

                    const viewAsModule = grouping.items.first();

                    const items = grouping
                        .items
                        .filter(x => !!x.itemId)
                        .map(viewAsItem => staticProvider
                            .services
                            .mapperService
                            .map(CourseAdminContentView, CourseAdminItemShortDTO, viewAsItem));

                    return {
                        id: viewAsModule.moduleId,
                        name: viewAsModule.moduleName,
                        orderIndex: viewAsModule.moduleOrderIndex,
                        code: viewAsModule.moduleCode,
                        items: items
                    } as ModuleAdminShortDTO;
                });

            return {
                courseId: view.courseId,
                modules: moduleDTOs
            } as CourseContentEditDataDTO;
        });

    mapperService
        .addMap(CourseAdminContentView, CourseAdminItemShortDTO, view => ({
            id: view.itemId,
            subTitle: view.itemSubtitle,
            title: view.itemTitle,
            orderIndex: view.itemOrderIndex,
            descriptorCode: view.itemCode,
            type: view.videoId ? "video" : "exam",
            questionCount: view.itemQuestionCount,
            videoLength: view.videoLength
        }));

    mapperService
        .addMap(CourseDetailsView, CourseDetailsDTO, (view, params) => {

            const moduleViews = params as CourseModuleOverviewView[];

            const thumbnailImageURL = view.coverFilePath
                ? getAssetUrl(view.coverFilePath)
                : getAssetUrl("/images/defaultCourseCover.jpg");

            const modules = moduleViews
                .groupBy(x => x.moduleId)
                .map(group => ({
                    name: group
                        .items
                        .first()
                        .moduleName,
                    videos: group
                        .items
                        .map(x => ({
                            title: x.videoTitle,
                            length: x.videoLengthSeconds
                        }))
                }) as ModuleShortDTO);

            return {
                title: view.title,
                description: view.description,
                categoryName: view.categoryName,
                subCategoryName: view.subCategoryName,
                thumbnailURL: thumbnailImageURL,
                courseId: view.courseId,
                shortDescription: view.shortDescription,
                language: view.languageName,
                difficulty: view.difficulty,
                benchmark: view.benchmark,
                visibility: view.visibility,
                teacherFullName: toFullName(view.teacherFirstName, view.teacherLastName),
                humanSkillBenefitsDescription: view.humanSkillBenefitsDescription,

                skillBenefits: parseCommaSeparatedStringList(view.skillBenefits),
                technicalRequirements: parseCommaSeparatedStringList(view.technicalRequirements),
                humanSkillBenefits: parseSkillBenefits(view.humanSkillBenefits),

                modules: modules
            } as CourseDetailsDTO;
        });

    mapperService
        .addMap(User, UserEditDTO, user => {
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,

                jobTitle: user.jobTitle
                    ? toJobTitleDTO(user.jobTitle)
                    : null,

                organization: user.organization
                    ? toOrganizationDTO(user.organization)
                    : null,

                role: user.role
                    ? toRoleDTO(user.role)
                    : null
            } as UserEditDTO;
        });
}

const parseCommaSeparatedStringList = (str: string) => {

    return str.split(",").map(x => x.trim());
}

const parseSkillBenefits = (str: string) => {

    return str
        .split(',')
        .map(x => {

            const trimmed = x.trim();
            const split = trimmed.split(":");

            return {
                text: split[0].trim(),
                value: parseInt(split[1].trim())
            }
        })
}

export const toUserDTO = (user: User) => {

    return {
        id: user.id,
        organizationId: user.organizationId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isTrusted: user.isTrusted,
        isPendingInvitation: user.isInvitationAccepted,
        name: `${user.lastName} ${user.firstName}`,

        jobTitle: user.jobTitle
            ? toJobTitleDTO(user.jobTitle)
            : null,

        avatarUrl: user.avatarFile
            ? getAssetUrl(user.avatarFile.filePath)
            : null,

        userActivity: user.userActivity
            ? toUserActivityDTO(user.userActivity)
            : null
    } as UserDTO;
}

export const toRoleDTO = (role: Role) => {

    return {
        id: role.id,
        name: role.name
    } as RoleDTO;
}

export const toJobTitleDTO = (jobTitle: JobTitle) => {

    return {
        id: jobTitle.id,
        name: jobTitle.name
    } as JobTitleDTO;
}

export const toCourseStatDTO = (courseStateView: CourseView) => {

    return {
        title: courseStateView.title,
        coverImageUrl: courseStateView.filePath
            ? getAssetUrl(courseStateView.filePath)
            : getAssetUrl("/images/defaultCourseCover.jpg")
    } as CourseStatDTO;
}

export const toUserActivityDTO = (userRightsView: UserActivityFlatView) => {

    return {
        canSetInvitedUserOrganization: userRightsView.canSetInvitedUserOrganization,
        canAccessAdministration: userRightsView.canAccessAdministration,
        canAccessCourseAdministration: userRightsView.canAccessCourseAdministration,
        canAccessApplication: userRightsView.canAccessApplication
    } as UserActivityDTO;
}

export const toAdminPageUserDTO = (user: User) => {

    const userDTO = toUserDTO(user);

    return {
        ...userDTO,
        organizationName: user.organization ? user.organization.name : "",
        tasks: user.tasks.map(x => toTaskDTO(x)),
        roleId: user.roleId
    } as AdminPageUserDTO;
}

export const toTaskDTO = (task: Task) => {

    return {
        name: task.name,
        dueDate: task.dueData,
        objective: task.objective
    } as TaskDTO;
}

export const toExamDTO = (exam: Exam) => {

    navPropNotNull(exam.questions);

    return {
        id: exam.id,
        courseId: exam.courseId,
        subTitle: exam.subtitle,
        title: exam.title,
        thumbnailUrl: exam.thumbnailUrl,
        questions: exam.questions.map(x => toQuestionDTO(x))
    } as ExamDTO;
}

export const toSimpleCourseItemDTOs = (course: Course) => {

    navPropNotNull(course.videos);
    navPropNotNull(course.exams);

    const videoCourseItemDTOs = course
        .videos
        .map(x => toCourseItemDTOVideo(x));

    const examCourseItemDTOs = course
        .exams
        .map(x => toCourseItemDTOExam(x));

    const courseItemDTOs = videoCourseItemDTOs
        .concat(examCourseItemDTOs)
        .orderBy(x => x.orderIndex);

    return courseItemDTOs;
}

export const toExamResultDTO = (views: ExamResultView[]) => {

    const viewAsExam = views.first();

    const questionDTOs = views
        .groupBy(x => x.questionId)
        .map(questsionGroup => {

            const viewAsQuestion = questsionGroup.items.first();

            return {
                text: viewAsQuestion.questionText,
                isCorrect: viewAsQuestion.isCorrect,
                answers: questsionGroup
                    .items
                    .map(x => toResultAnswerDTO(x)),
            } as ExamResultQuestionDTO;
        })

    return {
        isSuccessful: viewAsExam.isCompletedSession,
        correctAnswerCount: viewAsExam.correctGivenAnswerCount,
        questionCount: viewAsExam.questionCount,
        questions: questionDTOs,
        isCompletedPrevoiusly: !viewAsExam.onlySuccessfulSession,
        isFinalExam: viewAsExam.isFinalExam,
        shouldShowCourseCompleted: viewAsExam.onlySuccessfulSession && viewAsExam.isFinalExam
    } as ExamResultsDTO;
}

export const toResultAnswerDTO = (view: ExamResultView) => {

    return {
        answerId: view.answerId,
        answerText: view.answerText,
        isCorrect: view.isAnswerCorrect,
        isGiven: view.isGivenAnswer
    } as ResultAnswerDTO;
}

export const toVideoDTO = (video: Video, maxWatchedSeconds: number) => {

    navPropNotNull(video.questions);
    navPropNotNull(video.videoFile);

    return {
        id: video.id,
        courseId: video.courseId,
        subTitle: video.subtitle,
        title: video.title,
        description: video.description,
        thumbnailUrl: "",
        url: getAssetUrl(video.videoFile.filePath) ?? getAssetUrl("images/videoImage.jpg"),
        questions: video.questions.map(q => toQuestionDTO(q)),
        maxWatchedSeconds: maxWatchedSeconds
    } as VideoDTO;
}

export const toCourseItemDTO = (courseItemView: CourseItemStateView) => {

    return {
        id: courseItemView.itemId,
        subTitle: courseItemView.itemSubtitle,
        title: courseItemView.itemTitle,
        orderIndex: courseItemView.itemOrderIndex,
        state: courseItemView.state,
        descriptorCode: courseItemView.itemCode,
        type: courseItemView.itemIsVideo ? "video" : "exam"
    } as CourseItemDTO;
}

export const toCourseItemDTOExam = (exam: Exam, state?: CourseItemStateType) => {

    return {
        id: exam.id,
        subTitle: exam.subtitle,
        thumbnailUrl: getExamCoverImageUrl(),
        title: exam.title,
        orderIndex: exam.orderIndex,
        state: state ?? "available",
        descriptorCode: getItemCode(exam.id, "exam"),
        type: "exam"
    } as CourseItemDTO;
}

export const toCourseItemDTOVideo = (video: Video, state?: CourseItemStateType) => {

    return {
        id: video.id,
        subTitle: video.subtitle,
        thumbnailUrl: getAssetUrl(video.thumbnailFile?.filePath) ?? getAssetUrl("images/videoImage.jpg"),
        title: video.title,
        orderIndex: video.orderIndex,
        state: state ?? "available",
        descriptorCode: getItemCode(video.id, "video"),
        type: "video"
    } as CourseItemDTO;
}

export const toDailyTipDTO = (view: DailyTipView) => {

    return {
        description: view.description,
        videoUrl: getAssetUrl(view.videoFilePath)
    } as DailyTipDTO;
}

export const toCourseShortDTO = (course: CourseView) => {

    const thumbnailImageURL = course.filePath
        ? getAssetUrl(course.filePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    const firstItemCode = course.isStarted
        ? course.currentItemCode
        : null;

    return {
        courseId: course.id,
        title: course.title,
        categoryName: course.categoryName,
        subCategoryName: course.subCategoryName,
        firstItemCode: firstItemCode,
        teacherName: toFullName(course.teacherFirstName, course.teacherLastName),
        thumbnailImageURL: thumbnailImageURL,
        isComplete: course.isCompleted
    } as CourseShortDTO;
}

export const toOrganizationDTO = (org: Organization) => {

    return {
        id: org.id,
        name: org.name
    } as OrganizationDTO;
}

export const toQuestionDTO = (q: Question) => {

    navPropNotNull(q.answers);

    return {
        questionId: q.id,
        orderIndex: q.orderIndex,
        questionText: q.questionText,
        imageUrl: q.imageUrl,
        showUpTimeSeconds: q.showUpTimeSeconds,
        typeId: q.typeId,
        answers: q.answers
            .map(x => toAnswerDTO(x))

    } as QuestionDTO;
}

export const toSignupDataDTO = (questions: SignupQuestionView[], isCompletedSignup: boolean) => {

    return {
        questions: questions
            .groupBy(x => x.questionId)
            .map(questionGrouping => {

                const viewAsQuestion = questionGrouping.items.first();

                return {
                    questionId: viewAsQuestion.questionId,
                    questionText: viewAsQuestion.questionText,
                    imageUrl: viewAsQuestion.imageUrl,
                    typeId: viewAsQuestion.typeId,
                    answers: questionGrouping
                        .items
                        .map(viewAsAnswer => {

                            return {
                                answerId: viewAsAnswer.answerId,
                                answerText: viewAsAnswer.answerText,
                                isGiven: viewAsAnswer.isGivenAnswer
                            } as SignupAnswerDTO;
                        })
                } as SignupQuestionDTO;
            }),
        isCompleted: isCompletedSignup
    } as SignupDataDTO;
}

export const toAnswerDTO = (a: Answer) => {

    return {
        answerId: a.id,
        answerText: a.text
    } as AnswerDTO;
}

export const toAnswerEditDTO = (a: Answer) => {

    return {
        id: a.id,
        isCorrect: a.isCorrect,
        text: a.text
    } as AnswerEditDTO;
}

export const toCourseAdminShortDTO = (view: CourseAdminShortView) => {

    const thumbnailImageURL = view.coverFilePath
        ? getAssetUrl(view.coverFilePath)
        : getAssetUrl("/images/defaultCourseCover.jpg");

    return {
        title: view.title,
        courseId: view.id,
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
            name: toFullName(view.teacherFirstName, view.teacherLastName),
            firstName: view.teacherFirstName,
            lastName: view.teacherLastName,
        }
    } as CourseAdminListItemDTO;
}

export const toCourseCategoryDTO = (cc: CourseCategory): CourseCategoryDTO => {

    return {
        id: cc.id,
        name: cc.name,
        childCategories: cc.childCategories
            ? cc.childCategories
                .map(x => toCourseCategoryDTO(x))
            : []
    } as CourseCategoryDTO;
}