import { Course } from "../models/entity/Course";
import { Organization } from "../models/entity/Organization";
import { User } from "../models/entity/User";
import { CourseShortDTO } from "../models/shared_models/CourseShortDTO";
import { CurrentTasksDTO } from "../models/shared_models/CurrentTasksDTO";
import { OverviewPageDTO } from "../models/shared_models/OverviewPageDTO";
import { TaskDTO } from "../models/shared_models/TaskDTO";
import { TestAnswerDTO } from "../models/shared_models/TestAnswerDTO";
import { TestQuestionDTO } from "../models/shared_models/TestQuestionDTO";
import { getTypeORMConnection } from "../server";
import { log } from "./logger";
import { toCourseItemShortDTO, toCourseItemShortDTO2 } from "./mappings";

export const getOverviewPageDTOAsync = async (userId: number) => {

    // const userData = await getUserDataAsync(userId);

    const user = await getTypeORMConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :userId", { userId: userId })
        .leftJoinAndSelect("user.currentCourse", "course")
        .leftJoinAndSelect("course.exams", "exams")
        .leftJoinAndSelect("course.videos", "videos")   
        .leftJoinAndSelect("user.currentVideo", "video")
        .leftJoinAndSelect("video.users", "users")
        .getOneOrFail();

    const currentCourse = user.currentCourse;
    const currentItem = user.currentVideo;

    log(user);

    // const overviewPageDTO = {

    //     currentCourseItems: currentCourse
    //         ?.items
    //         ?.map(course => toCourseItemShortDTO(course)),

    //     currentCourseId: currentCourse?._id,

    //     recommendedCourses: [] as CourseShortDTO[],

    //     tipOfTheDay: tipOfTheDay,

    //     currentCourseItem: toCourseItemShortDTO2(currentItem),

    //     testQuestionDTO: {
    //         questionId: "asd",
    //         questionText: "My fantastic question",
    //         answers: [
    //             {
    //                 answerId: "asd",
    //                 answerText: "Answer 1"
    //             } as TestAnswerDTO,
    //             {
    //                 answerId: "asd",
    //                 answerText: "Answer 2"
    //             } as TestAnswerDTO,
    //             {
    //                 answerId: "asd",
    //                 answerText: "Answer 3"
    //             } as TestAnswerDTO,
    //             {
    //                 answerId: "asd",
    //                 answerText: "Answer 4"
    //             } as TestAnswerDTO
    //         ]
    //     } as TestQuestionDTO,

    //     currentTasks: {
    //         tasks: [
    //             {
    //                 text: "Office kurzus gyakorlása",
    //                 dueDate: "",
    //                 objective: "practise"
    //             } as TaskDTO,
    //             {
    //                 text: "PHP videók megtekintése",
    //                 dueDate: "",
    //                 objective: "continueVideo"
    //             } as TaskDTO,
    //             {
    //                 text: "Word kurzus végi vizsga",
    //                 dueDate: "",
    //                 objective: "exam"
    //             } as TaskDTO
    //         ]
    //     } as CurrentTasksDTO,

    //     developmentChartData: {
    //         labels: ['30 nap', '45 nap', '60 nap', '75 nap', '90 nap'],
    //         datasets: [
    //             {
    //                 label: 'Epistogram',
    //                 data: [12, 19, 12, 17, 8],
    //                 fill: false,
    //                 backgroundColor: 'rgb(63,178,181)',
    //                 borderColor: 'rgba(13,104,140,0.2)',
    //                 tension: 0.5
    //             },
    //             {
    //                 label: 'Hagyományos tréningek',
    //                 data: [3, 5, 4, 5, 2],
    //                 fill: false,
    //                 backgroundColor: 'rgb(215,33,163)',
    //                 borderColor: 'rgba(139,0,155,0.2)',
    //                 tension: 0.5
    //             }
    //         ],
    //     }

    // } as OverviewPageDTO;

    return {} as OverviewPageDTO;
}

const tipOfTheDay = "Előzetes kérdőívünk alapján Interperszonális (társasági) típusba tartozol, ez pedig azt jelenti, hogy tanulócsoportokkal, esetleg tanulótárssal tudsz a leghatékonyabban tanulni. Ha átbeszélitek a problémás részeket, ismétlő jelleggel végigmentek akár teljes anyagrészeken, illetve közösen töltitek ki az időközi teszteket, mind-mind segíti az ismeretanyag mélyebb beszívódását. Tudjuk, ez céges környezetben más, mint a közép vagy felsőoktatásban volt, ugyanakkor érdemes lehet akár közös Facebook csoportot létrehozni (de valószínűleg a munkahelyi kollaborációs platform is tökéletes erre a feladatra). Ha szeretnéd, össze is köthetünk a hozzád hasonló munkatársaiddal, de akár cégen kívüli tanulótársakra is szert tehetesz!"