import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { ZAuthenticationController } from './../api/AuthenticationController2';
import { CoinTransactionsController } from './../api/CoinTransactionsController';
import { CommentController } from './../api/CommentController';
import { CompanyController } from './../api/CompanyController';
import { CourseController } from './../api/CourseController';
import { CourseItemController } from './../api/CourseItemController';
import { CourseRatingController } from './../api/CourseRatingController';
import { DailyTipController } from './../api/DailyTipController';
import { EventController } from './../api/EventController';
import { ExamController } from './../api/ExamController';
import { FileController } from './../api/FileController';
import { MiscController } from './../api/MiscController';
import { ModuleController } from './../api/ModuleController';
import { PasswordChangeController } from './../api/PasswordChangeController';
import { PermissionController } from './../api/PermissionController';
import { PersonalityAssessmentController } from './../api/PersonalityAssessmentController';
import { PlaybackController } from './../api/PlaybackController';
import { PlayerController } from './../api/PlayerController';
import { PrequizController } from './../api/PrequizController';
import { PretestController } from './../api/PretestController';
import { QuestionController } from './../api/QuestionController';
import { RegistrationController } from './../api/RegistrationController';
import { RoleController } from './../api/RoleController';
import { ScheduledJobTriggerController } from './../api/ScheduledJobTriggerController';
import { ShopController } from './../api/ShopController';
import { SignupController } from './../api/SignupController';
import { TeacherInfoController } from './../api/TeacherInfoController';
import { TempomatController } from './../api/TempomatController';
import { UserController } from './../api/UserController';
import { UserProgressController } from './../api/UserProgressController';
import { UserStatsController } from './../api/UserStatsController';
import { VideoController } from './../api/VideoController';
import { VideoRatingController } from './../api/VideoRatingController';

export const instatiateControllers = (services: any, globalConfig: GlobalConfiguration) => {

    const controllers = {} as any;

    controllers.permissionController = new PermissionController(services.permissionService);
    controllers.userStatsController = new UserStatsController(services.userStatsService);
    controllers.prequizController = new PrequizController(services.prequizService);
    controllers.pretestController = new PretestController(services.pretestService);
    controllers.courseRatingController = new CourseRatingController(services.courseRatingService);
    controllers.eventController = new EventController(services.eventService);
    controllers.coinTransactionsController = new CoinTransactionsController(services.coinTransactionService);
    controllers.registrationController = new RegistrationController(services.registrationService, globalConfig);
    controllers.miscController = new MiscController(services.miscService, services.practiseQuestionService, services.tokenService, services.ormConnectionService, globalConfig, services.userCourseBridgeService);
    controllers.authenticationController = new ZAuthenticationController(services.authenticationService, globalConfig);
    controllers.userController = new UserController(services.userService);
    controllers.fileController = new FileController(services.fileService);
    controllers.signupController = new SignupController(services.signupService, services.personalityAssessmentService);
    controllers.playerController = new PlayerController(services.courseService, services.playerService, services.videoService);
    controllers.courseController = new CourseController(services.courseService, services.userCourseBridgeService);
    controllers.moduleController = new ModuleController(services.moduleService);
    controllers.videoController = new VideoController(services.videoService);
    controllers.questionController = new QuestionController(services.practiseQuestionService, services.questionService, services.ormConnectionService);
    controllers.examController = new ExamController(services.examService, services.ormConnectionService);
    controllers.shopController = new ShopController(services.shopService);
    controllers.teacherInfoController = new TeacherInfoController(services.teacherInfoService);
    controllers.passwordChangeController = new PasswordChangeController(services.passwordChangeService);
    controllers.videoRatingController = new VideoRatingController(services.videoRatingService);
    controllers.personalityAssessmentController = new PersonalityAssessmentController(services.personalityAssessmentService);
    controllers.dailyTipController = new DailyTipController(services.dailyTipService);
    controllers.userProgressController = new UserProgressController(services.userProgressService);
    controllers.playbackController = new PlaybackController(services.playbackService);
    controllers.tempomatController = new TempomatController(services.tempomatService);
    controllers.scheduledJobTriggerController = new ScheduledJobTriggerController(services.tempomatService);
    controllers.companyController = new CompanyController(services.companyService);
    controllers.roleController = new RoleController(services.roleService);
    controllers.commentController = new CommentController(services.commentService, services.likeService);
    controllers.coruseItemController = new CourseItemController(services.courseItemService);

    return controllers;
};