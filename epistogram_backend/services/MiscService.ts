
import { Organization } from "../models/entity/Organization";
import { User } from "../models/entity/User";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { OverviewPageDTO } from "../models/shared_models/OverviewPageDTO";
import { UserDTO } from "../models/shared_models/UserDTO";
import { staticProvider } from "../staticProvider";
import { CourseService } from "./CourseService";
import { toOrganizationDTO } from "./mappings";

export class MiscService {

    private _courseService: CourseService;

    constructor(courseService: CourseService) {

        this._courseService = courseService;
    }

    getOrganizationsAsync = async (userId: number) => {

        const orgs = await staticProvider
            .ormConnection
            .getRepository(Organization)
            .find();

        return orgs
            .map(org => toOrganizationDTO(org));
    }

    saveUserDataAsync = async (userId: number, dto: UserDTO) => {

        return staticProvider
            .ormConnection
            .getRepository(User)
            .save({
                id: userId,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phoneNumber: dto.phoneNumber
            });
    }

    getOverviewPageDTOAsync = async (userId: number) => {

        const modules = await this._courseService.getCurrentCourseItemsAsync(userId);
        const recommendedCourseDTOs = [] as CourseShortDTO[];
        const developmentChartData = this.getDevelopmentChart();

        const overviewPageDTO = {
            tipOfTheDay: this.getTipOfTheDay(),
            recommendedCourses: recommendedCourseDTOs,
            developmentChartData: developmentChartData,
            modules: modules
        } as OverviewPageDTO;

        return overviewPageDTO;
    }

    private getTipOfTheDay = () => "Előzetes kérdőívünk alapján Interperszonális (társasági) típusba tartozol, ez pedig azt jelenti, hogy tanulócsoportokkal, esetleg tanulótárssal tudsz a leghatékonyabban tanulni. Ha átbeszélitek a problémás részeket, ismétlő jelleggel végigmentek akár teljes anyagrészeken, illetve közösen töltitek ki az időközi teszteket, mind-mind segíti az ismeretanyag mélyebb beszívódását. Tudjuk, ez céges környezetben más, mint a közép vagy felsőoktatásban volt, ugyanakkor érdemes lehet akár közös Facebook csoportot létrehozni (de valószínűleg a munkahelyi kollaborációs platform is tökéletes erre a feladatra). Ha szeretnéd, össze is köthetünk a hozzád hasonló munkatársaiddal, de akár cégen kívüli tanulótársakra is szert tehetesz!"

    private getDevelopmentChart = () => {
        return {
            labels: ['30 nap', '45 nap', '60 nap', '75 nap', '90 nap'],
            datasets: [
                {
                    label: 'Epistogram',
                    data: [12, 19, 12, 17, 8],
                    fill: false,
                    backgroundColor: 'rgb(63,178,181)',
                    borderColor: 'rgba(13,104,140,0.2)',
                    tension: 0.5
                },
                {
                    label: 'Hagyományos tréningek',
                    data: [3, 5, 4, 5, 2],
                    fill: false,
                    backgroundColor: 'rgb(215,33,163)',
                    borderColor: 'rgba(139,0,155,0.2)',
                    tension: 0.5
                }
            ],
        }
    }
}