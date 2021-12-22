import bodyParser from 'body-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import "reflect-metadata"; // needs to be imported for TypeORM
import { AuthenticationController } from './api/AuthenticationController';
import { CoinTransactionsController } from './api/CoinTransactionsController';
import { CourseController } from './api/CourseController';
import { EventController } from './api/EventController';
import { ExamController } from './api/ExamController';
import { FileController } from './api/FileController';
import { MiscController } from './api/MiscController';
import { ModuleController } from './api/ModuleController';
import { PlayerController } from './api/PlayerController';
import { QuestionController } from './api/QuestionController';
import { RegistrationController } from './api/RegistrationController';
import { ShopController } from './api/ShopController';
import { SignupController } from './api/SignupController';
import { UserController } from './api/UserController';
import { UserStatsController } from './api/UserStatsController';
import { VideoController } from './api/VideoController';
import { apiRoutes } from './models/shared_models/types/apiRoutes';
import { ActivationCodeService } from './services/ActivationCodeService';
import { AuthenticationService } from './services/AuthenticationService';
import { CoinAcquireService } from './services/CoinAcquireService';
import { CoinTransactionService } from './services/CoinTransactionService';
import { CourseItemsService } from './services/CourseItemsService';
import { CourseService } from './services/CourseService';
import { EmailService } from './services/EmailService';
import { EventService } from './services/EventService';
import { ExamService } from './services/ExamService';
import { FileService } from './services/FileService';
import { MapperService } from './services/MapperService';
import { dbSchema } from './services/misc/dbSchema';
import { GlobalConfiguration } from './services/misc/GlobalConfiguration';
import { log, logError } from "./services/misc/logger";
import { initializeMappings } from './services/misc/mappings';
import { getAuthMiddleware, getCORSMiddleware, getUnderMaintanenceMiddleware } from './services/misc/middlewareService';
import { AssetUrlService } from './services/misc/urlProvider';
import { MiscService } from './services/MiscService';
import { ModuleService } from './services/ModuleService';
import { PersonalityAssessmentService } from './services/PersonalityAssessmentService';
import { PlayerService } from './services/PlayerService';
import { PractiseQuestionService } from './services/PractiseQuestionService';
import { QuestionAnswerService } from './services/QuestionAnswerService';
import { QuestionService } from './services/QuestionService';
import { RegistrationService } from './services/RegistrationService';
import { ShopService } from './services/ShopService';
import { SignupService } from './services/SignupService';
import { DbConnectionService } from './services/sqlServices/DatabaseConnectionService';
import { SQLFunctionsService } from './services/sqlServices/FunctionsService';
import { ORMConnectionService } from './services/sqlServices/ORMConnectionService';
import { SeedService } from './services/sqlServices/SeedService';
import { SQLBootstrapperService } from './services/sqlServices/SQLBootstrapper';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import { StorageService } from './services/StorageService';
import { TokenService } from './services/TokenService';
import { UserCourseBridgeService } from './services/UserCourseBridgeService';
import { UserService } from './services/UserService';
import { UserSessionActivityService } from './services/UserSessionActivityService';
import { UserStatsService } from './services/UserStatsService';
import { VideoPlaybackSampleService } from './services/VideoPlaybackSampleService';
import { VideoService } from './services/VideoService';
import { addAPIEndpoint, ApiActionType, EndpointOptionsType } from './utilities/apiHelpers';
import './utilities/jsExtensions';

(async () => {

    const globalConfig = GlobalConfiguration.initGlobalConfig(__dirname);

    log("");
    log(`------------- APPLICATION STARTED, ENVIRONEMNT: ${globalConfig.misc.environmentName} ----------------`);
    log("");

    const expressServer = express();

    // services 
    const mapperService = new MapperService();
    const sqlConnectionService = new SQLConnectionService(globalConfig);
    const sqlBootstrapperService = new SQLBootstrapperService(sqlConnectionService, dbSchema, globalConfig);
    const ormConnectionService = new ORMConnectionService(globalConfig, dbSchema, sqlBootstrapperService);
    const userStatsService = new UserStatsService(ormConnectionService, mapperService);
    const sqlFunctionService = new SQLFunctionsService(sqlConnectionService);
    const eventService = new EventService(mapperService, ormConnectionService);
    const coinTransactionService = new CoinTransactionService(sqlFunctionService, ormConnectionService, mapperService);
    const coinAcquireService = new CoinAcquireService(coinTransactionService, ormConnectionService, eventService);
    const userSessionActivityService = new UserSessionActivityService(sqlFunctionService, coinAcquireService);
    const activationCodeService = new ActivationCodeService(ormConnectionService);
    const assetUrlService = new AssetUrlService(globalConfig);
    const emailService = new EmailService(globalConfig, assetUrlService);
    const questionAnswerService = new QuestionAnswerService(ormConnectionService, sqlFunctionService, coinAcquireService);
    const signupService = new SignupService(emailService, sqlFunctionService, ormConnectionService);
    const userService = new UserService(ormConnectionService, mapperService);
    const tokenService = new TokenService(globalConfig);
    const authenticationService = new AuthenticationService(userService, tokenService, userSessionActivityService, ormConnectionService, emailService, globalConfig);
    const registrationService = new RegistrationService(activationCodeService, emailService, userService, authenticationService, tokenService);
    const seedService = new SeedService(sqlBootstrapperService, registrationService);
    const dbConnectionService = new DbConnectionService(globalConfig, sqlConnectionService, sqlBootstrapperService, ormConnectionService, seedService);
    const courseItemsService = new CourseItemsService(ormConnectionService, mapperService);
    const userCourseBridgeService = new UserCourseBridgeService(courseItemsService, ormConnectionService, mapperService);
    const questionService = new QuestionService(ormConnectionService);
    const examService = new ExamService(userCourseBridgeService, ormConnectionService, userSessionActivityService, questionAnswerService, questionService);
    const storageService = new StorageService(globalConfig);
    const fileService = new FileService(userService, storageService, ormConnectionService);
    const videoService = new VideoService(ormConnectionService, userCourseBridgeService, questionAnswerService, fileService, questionService, assetUrlService);
    const moduleService = new ModuleService(examService, videoService, ormConnectionService, mapperService);
    const courseService = new CourseService(moduleService, userCourseBridgeService, videoService, ormConnectionService, mapperService, fileService);
    const miscService = new MiscService(courseService, ormConnectionService);
    const vpss = new VideoPlaybackSampleService(ormConnectionService);
    const playerService = new PlayerService(ormConnectionService, courseService, examService, moduleService, userCourseBridgeService, videoService, questionAnswerService, vpss, coinAcquireService, userSessionActivityService, mapperService);
    const practiseQuestionService = new PractiseQuestionService(ormConnectionService, questionAnswerService, playerService);
    const shopService = new ShopService(ormConnectionService, mapperService, coinTransactionService, courseService, emailService);
    const personalityAssessmentService = new PersonalityAssessmentService(ormConnectionService);

    // controllers 
    const userStatsController = new UserStatsController(userStatsService);
    const eventController = new EventController(eventService);
    const coinTransactionsController = new CoinTransactionsController(coinTransactionService);
    const registrationController = new RegistrationController(registrationService, userService, globalConfig);
    const miscController = new MiscController(miscService, practiseQuestionService, authenticationService, tokenService, ormConnectionService, globalConfig, mapperService);
    const authenticationController = new AuthenticationController(authenticationService, globalConfig);
    const userController = new UserController(userService);
    const fileController = new FileController(fileService);
    const signupController = new SignupController(signupService, personalityAssessmentService);
    const playerController = new PlayerController(courseService, playerService, videoService);
    const courseController = new CourseController(courseService);
    const moduleController = new ModuleController(moduleService);
    const videoController = new VideoController(videoService, questionService, ormConnectionService, globalConfig, mapperService);
    const questionController = new QuestionController(practiseQuestionService, questionService, ormConnectionService);
    const examController = new ExamController(examService, ormConnectionService);
    const shopController = new ShopController(shopService);

    // initialize services 
    initializeMappings(assetUrlService.getAssetUrl, mapperService);
    await dbConnectionService.initializeAsync();
    await dbConnectionService.seedDBAsync();

    const addEndpoint = (path: string, action: ApiActionType, opt?: EndpointOptionsType) =>
        addAPIEndpoint(globalConfig, authenticationService.getRequestAccessTokenPayload, expressServer, path, action, opt);

    // add middlewares
    expressServer.use(getCORSMiddleware(globalConfig));
    expressServer.use(bodyParser.json({ limit: '32mb' }));
    expressServer.use(bodyParser.urlencoded({ limit: '32mb', extended: true }));
    expressServer.use(fileUpload());
    expressServer.use(getUnderMaintanenceMiddleware(globalConfig));
    expressServer.use(getAuthMiddleware(
        globalConfig,
        authenticationService.getRequestAccessTokenPayload,
        userService.getUserById,
        [
            apiRoutes.registration.registerUserViaActivationCode,
            apiRoutes.registration.registerUserViaInvitationToken,
            apiRoutes.registration.registerUserViaPublicToken,
            apiRoutes.authentication.renewUserSession,
            apiRoutes.authentication.loginUser,
        ]));

    // registration
    addEndpoint(apiRoutes.registration.registerUserViaPublicToken, registrationController.registerUserViaPublicTokenAction, { isPublic: true, isPost: true });
    addEndpoint(apiRoutes.registration.registerUserViaInvitationToken, registrationController.registerUserViaInvitationTokenAction, { isPublic: true, isPost: true });
    addEndpoint(apiRoutes.registration.registerUserViaActivationCode, registrationController.registerUserViaActivationCodeAction, { isPublic: true, isPost: true });
    addEndpoint(apiRoutes.registration.inviteUser, registrationController.inviteUserAction, { isPost: true });

    // misc
    addEndpoint(apiRoutes.misc.getCurrentCourseItemCode, miscController.getCurrentCourseItemCodeAction);
    addEndpoint(apiRoutes.misc.getJobTitles, miscController.getJobTitlesAction);
    addEndpoint(apiRoutes.misc.getDailyTip, miscController.getDailyTipAction);
    addEndpoint(apiRoutes.misc.getOrganizations, miscController.getOrganizationsAction);
    addEndpoint(apiRoutes.misc.getHomePageDTO, miscController.getOverviewPageDTOAction);

    // shop 
    addEndpoint(apiRoutes.shop.getShopItems, shopController.getShopItemsAction);
    addEndpoint(apiRoutes.shop.getShopItemCategories, shopController.getShopItemCategoriesAction);
    addEndpoint(apiRoutes.shop.purchaseShopItem, shopController.purchaseShopItemAction, { isPost: true });

    // event 
    addEndpoint(apiRoutes.event.getUnfulfilledEvent, eventController.getUnfulfilledEventAction);

    // authentication 
    addEndpoint(apiRoutes.authentication.getCurrentUser, authenticationController.getCurrentUserAction);
    addEndpoint(apiRoutes.authentication.setNewPassword, authenticationController.changePasswordAction, { isPost: true });
    addEndpoint(apiRoutes.authentication.logoutUser, authenticationController.logOutUserAction, { isPost: true });
    addEndpoint(apiRoutes.authentication.renewUserSession, authenticationController.renewUserSessionAction, { isPublic: true });
    addEndpoint(apiRoutes.authentication.loginUser, authenticationController.logInUserAction, { isPost: true, isPublic: true });
    addEndpoint(apiRoutes.authentication.requestPasswordChange, miscController.requestChangePasswordAction, { isPost: true });

    // coin transactions 
    addEndpoint(apiRoutes.coinTransactions.getCoinTransactions, coinTransactionsController.getCoinTransactionsAction);
    addEndpoint(apiRoutes.coinTransactions.getCoinBalance, coinTransactionsController.getCoinBalanceAction);

    // user stats 
    addEndpoint(apiRoutes.userStats.getUserStats, userStatsController.getUserStatsAction);

    // user
    addEndpoint(apiRoutes.user.getEditUserData, userController.getEditUserDataAction);
    addEndpoint(apiRoutes.user.getUserListForAdministration, userController.getUserAdministrationUserListAction);
    addEndpoint(apiRoutes.user.getBriefUserData, userController.getBriefUserDataAction);
    addEndpoint(apiRoutes.user.deleteUser, userController.deleteUserAction, { isPost: true });
    addEndpoint(apiRoutes.user.upadateUser, userController.saveUserAction, { isPost: true });
    // addEndpoint(apiRoutes.misc.updateUserData, miscController.saveUserDataAction, { isPost: true });

    // file 
    addEndpoint(apiRoutes.file.uploadUserAvatar, fileController.uploadAvatarFileAction, { isPost: true });

    // signup
    addEndpoint(apiRoutes.signup.answerSignupQuestion, signupController.answerSignupQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.signup.getSignupData, signupController.getSignupDataAction);
    addEndpoint(apiRoutes.signup.getUserPersonalityData, signupController.getUserPersonalityDataAction);

    // player
    addEndpoint(apiRoutes.player.getPlayerData, playerController.getPlayerDataAction);
    addEndpoint(apiRoutes.player.saveVideoPlaybackSample, playerController.saveVideoPlaybackSampleAction, { isPost: true });
    addEndpoint(apiRoutes.player.getCourseItems, playerController.getCourseItemsAction);
    addEndpoint(apiRoutes.player.answerVideoQuestion, playerController.answerVideoQuestionAction, { isPost: true });

    // course
    addEndpoint(apiRoutes.course.setCourseMode, courseController.setCourseModeAction, { isPost: true });
    addEndpoint(apiRoutes.course.getAdminCourseList, courseController.getAdminCourseListAction);
    addEndpoint(apiRoutes.course.startCourse, courseController.startCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.getCourseContentEditData, courseController.getCourseContentEditDataAction);
    addEndpoint(apiRoutes.course.getCourseDetailsEditData, courseController.getCourseDetailsEditDataAction);
    addEndpoint(apiRoutes.course.getCourseBriefData, courseController.getCourseBriefDataAction);
    addEndpoint(apiRoutes.course.saveCourseContent, courseController.saveCourseContentAction, { isPost: true });
    addEndpoint(apiRoutes.course.saveCourseDetails, courseController.saveCourseDetailsAction, { isPost: true });
    addEndpoint(apiRoutes.course.saveCourseThumbnail, courseController.saveCourseThumbnailAction, { isPost: true });
    addEndpoint(apiRoutes.course.getAvailableCourses, courseController.getAvailableCoursesAction);
    addEndpoint(apiRoutes.course.deleteCourse, courseController.deleteCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.createCourse, courseController.createCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.getCourseDetails, courseController.getCourseDetailsAction);
    addEndpoint(apiRoutes.course.getCourseProgressData, courseController.getCourseProgressDataAction);
    addEndpoint(apiRoutes.course.getCourseProgressShort, courseController.getCourseProgressShortAction);

    // module 
    addEndpoint(apiRoutes.module.createModule, moduleController.createModuleAction, { isPost: true });
    addEndpoint(apiRoutes.module.deleteModule, moduleController.deleteModuleAction, { isPost: true });
    addEndpoint(apiRoutes.module.getModuleEditData, moduleController.getModuleEditDataAction);
    addEndpoint(apiRoutes.module.saveModule, moduleController.saveModuleAction, { isPost: true });

    // video 
    addEndpoint(apiRoutes.video.createVideo, videoController.createVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.deleteVideo, videoController.deleteVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.saveVideo, videoController.saveVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.uploadVideoFileChunks, videoController.uploadVideoFileChunksAction, { isPost: true });
    addEndpoint(apiRoutes.video.getVideoEditData, videoController.getVideoEditDataAction);

    // questions
    addEndpoint(apiRoutes.questions.getQuestionEditData, questionController.getQuestionEditDataAction);
    addEndpoint(apiRoutes.questions.saveQuestion, questionController.saveQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.questions.answerPractiseQuestion, questionController.answerPractiseQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.questions.getPractiseQuestions, miscController.getPractiseQuestionAction);

    // exam
    addEndpoint(apiRoutes.exam.getExamResults, examController.getExamResultsAction);
    addEndpoint(apiRoutes.exam.getExamEditData, examController.getExamEditDataAction);
    addEndpoint(apiRoutes.exam.saveExam, examController.saveExamAction, { isPost: true });
    addEndpoint(apiRoutes.exam.createExam, examController.createExamAction, { isPost: true });
    addEndpoint(apiRoutes.exam.deleteExam, examController.deleteExamAction, { isPost: true });
    addEndpoint(apiRoutes.exam.answerExamQuestion, examController.answerExamQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.exam.startExam, examController.startExamAction, { isPost: true });

    // 404 - no match
    expressServer.use((req, res) => {

        res.status(404).send(`Route did not match: ${req.url}`);
    });

    // error handler
    expressServer.use((error: express.Errback, req: express.Request, res: express.Response) => {

        logError("Express error middleware.");
        logError(error);
        return res.status(500).send(error.toString());
    });

    // listen
    expressServer.listen(globalConfig.misc.hostPort, () =>
        log(`Listening on port '${globalConfig.misc.hostPort}'!`));
})();

