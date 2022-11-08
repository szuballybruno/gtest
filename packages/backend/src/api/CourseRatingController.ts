import { CourseRatingQuestionAnswersDTO } from '@episto/communication';
import { CourseRatingService } from '../services/CourseRatingService';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { Id } from '@episto/commontypes';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class CourseRatingController implements XController<CourseRatingController> {

    private _courseRatingService: CourseRatingService;

    constructor(serviceProvider: ServiceProvider) {

        this._courseRatingService = serviceProvider.getService(CourseRatingService);
    }

    @XControllerAction(apiRoutes.courseRating.getCourseRatingGroups)
    getCourseRatingGroupsAction(params: ActionParams) {

        const query = params
            .getQuery<any>();

        const courseId = Id
            .create<'Course'>(query
                .getValue(x => x.courseId, 'int'));

        return this._courseRatingService
            .getCourseRatingGroupsAsync(params.principalId, courseId);
    }

    @XControllerAction(apiRoutes.courseRating.saveCourseRatingGroupAnswers, { isPost: true })
    saveCourseRatingGroupAnswersAction(params: ActionParams) {

        const dto = params
            .getBody<CourseRatingQuestionAnswersDTO>()
            .data;

        return this._courseRatingService
            .saveCourseRatingGroupAnswersAsync(params.principalId, dto);
    }
}