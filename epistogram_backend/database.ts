import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { createDatabase, dropDatabase } from "typeorm-extension";
import { Answer } from "./models/entity/Answer";
import { Course } from "./models/entity/Course";
import { Exam } from "./models/entity/Exam";
import { Organization } from "./models/entity/Organization";
import { Question } from "./models/entity/Question";
import { QuestionAnswer } from "./models/entity/QuestionAnswer";
import { StorageFile } from "./models/entity/StorageFile";
import { Task } from "./models/entity/Task";
import { TestChild } from "./models/entity/TestChild";
import { TestParent } from "./models/entity/TestParent";
import { User } from "./models/entity/User";
import { Video } from "./models/entity/Video";
import { RoleType } from "./models/shared_models/types/sharedTypes";
import { log } from "./services/misc/logger";
import { createInvitedUserWithOrgAsync, finalizeUserRegistrationAsync } from "./services/userManagementService";
import { staticProvider } from "./staticProvider";
import {CourseOrganization} from "./models/entity/CourseOrganization";
import {saveCourseOrganizationsAsync} from "./api/courses/courseManagementActions";
import {Group} from "./models/entity/Group";

export type TypeORMConnection = Connection;

export const initializeDBAsync = async (recreate: boolean) => {

    const host = staticProvider.globalConfig.database.hostAddress;
    const port = staticProvider.globalConfig.database.port;
    const username = staticProvider.globalConfig.database.serviceUserName;
    const password = staticProvider.globalConfig.database.serviceUserPassword;
    const databaseName = staticProvider.globalConfig.database.name;
    const isSyncEnabled = staticProvider.globalConfig.database.isOrmSyncEnabled;
    const isLoggingEnabled = staticProvider.globalConfig.database.isOrmLoggingEnabled;

    const postgresOptions = {
        type: "postgres",
        port: port,
        host: host,
        username: username,
        password: password,
        database: databaseName,
        synchronize: isSyncEnabled,
        logging: isLoggingEnabled,
        entities: [
            // "models/entity/**/*.ts"
            Course,
            CourseOrganization,
            Exam,
            Group,
            Organization,
            User,
            Video,
            Task,
            QuestionAnswer,
            Question,
            Answer,
            TestChild,
            TestParent,
            StorageFile
        ],
    } as ConnectionOptions;

    // const postgresOptions = {
    //     type: "postgres",
    //     port: 5432,
    //     host: "34.118.107.79",
    //     username: "bence",
    //     password: "epistogram",
    //     database: "epistogram_DEV",
    //     synchronize: true,
    //     logging: false,
    //     entities: [
    //         "models/entity/**/*.ts"
    //     ],
    // } as ConnectionOptions;

    log("Database connection options:");
    log(postgresOptions);

    if (recreate) {

        log("Recreating DB...");
        await recreateDB(postgresOptions);
    }

    log("Connecting to database with TypeORM...");
    staticProvider.ormConnection = await createConnection(postgresOptions);

    // seed DB if no users are found
    const users = await staticProvider
        .ormConnection
        .getRepository(User)
        .find();

    if (users.length < 1) {

        log("Seeding DB...");
        await seedDB();
    }
}

export const recreateDB = async (postgresOptions: ConnectionOptions) => {

    log("Dropping database...");
    await dropDatabase({ ifExist: true }, postgresOptions);

    log("Creating database...");
    await createDatabase({ ifNotExist: true, characterSet: "UTF8" }, postgresOptions);
}

export const seedDB = async () => {

    const connection = staticProvider.ormConnection;

    // seed organizations
    const insertedOrganizationIds = (await connection
        .getRepository(Organization)
        .insert([
            {
                name: "Farewell Kft."
            },
            {
                name: "Bruno Muvek"
            },
            {
                name: "Manfredisztan.org"
            }
        ]))
        .identifiers
        .map(x => x.id as number);

    // seed groups
    await connection
        .getRepository(Group)
        .save([
            {
                name: "Hegesztők",
                organizationId: 1
            },
            {
                name: "Takarítók",
                organizationId: 1
            },
            {
                name: "Műszerészek",
                organizationId: 2
            }
        ])



    // seed courses
    await connection
        .getRepository(Course)
        .save([
            {
                title: "Java Course",
                category: "Programming",
                courseGroup: "IT",
                permissionLevel: "public",
                colorOne: "#123456",
                colorTwo: "#ABCDEF",
                exams: [
                    {
                        title: "New Exam 1",
                        subtitle: "Fantastic exam 1",
                        thumbnailUrl: "",
                        description: "",
                        orderIndex: 1
                    },
                    {
                        title: "New Exam 2",
                        subtitle: "Fantastic exam 2",
                        thumbnailUrl: "",
                        description: "",
                        orderIndex: 3
                    },
                    {
                        title: "New Exam 3",
                        subtitle: "Fantastic exam 3",
                        thumbnailUrl: "",
                        description: "",
                        orderIndex: 4
                    }
                ],
                videos: [
                    {
                        title: "Video 1",
                        subtitle: "Fantastic Video 1",
                        description: "Very very fantastic video 1 description",
                        orderIndex: 0
                    },
                    {
                        title: "Video 2",
                        subtitle: "Fantastic Video 2",
                        description: "Very very fantastic video 2 description",
                        orderIndex: 2
                    }
                ]
            }
        ]);

    await saveCourseOrganizationsAsync()

    // seed users
    const { invitationToken, user } = await createInvitedUserWithOrgAsync(
        {
            firstName: "Edina",
            lastName: "Sandor",
            jobTitle: "IT manager",
            role: "admin" as RoleType,
            email: "edina.sandor@email.com",
        },
        insertedOrganizationIds[0],
        false);

    await finalizeUserRegistrationAsync({
        invitationToken: invitationToken,
        phoneNumber: "+36 202020202",
        password: "admin",
        controlPassword: "admin"
    });

    // seed signup questions
    const questions = [
        {
            isSignupQuestion: true,
            questionText: "Egy csapatban elvégzendő projekt esetén a következőt preferálom:",
            imageUrl: staticProvider.globalConfig.misc.assetStoreUrl + "/application/kerdes1.png",
            answers: [
                {
                    text: "Szoros együttműködés a többiekkel"
                },
                {
                    text: "Szívesebben oldok meg egyedül részfeladatokat"
                },
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Ha egy számomra ismeretlen irodát kellene megtalálnom egy komplexumban, erre kérném a portást: ",
            imageUrl: staticProvider.globalConfig.misc.assetStoreUrl + "/application/kerdes2.png",
            answers: [
                {
                    text: "Mutassa meg az épület alaprajzán/rajzolja le a helyes irányt",
                },
                {
                    text: "Mondja el/írja le, hogy mikor merre kell fordulnom",
                }
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Jobban preferálom azt a munkában, mikor:",
            imageUrl: staticProvider.globalConfig.misc.assetStoreUrl + "/application/kerdes3.png",
            answers: [
                {
                    text: "Előre definiált instrukciók alapján végzek el feladatokat",
                },
                {
                    text: "Kutatnom kell a megoldás után és analizálni különböző eseteket",
                }
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Egy előadás esetén hasznosabb számomra, ha:",
            imageUrl: staticProvider.globalConfig.misc.assetStoreUrl + "/application/kerdes4.png",
            answers: [
                {
                    text: "Az előadó magyaráz, és megválaszolja a felmerülő kérdéseket",
                },
                {
                    text: "kisfilmekkel, videókkal illusztrálja és egészíti ki a mondanivalóját",
                }
            ]
        },
        {
            isSignupQuestion: true,
            questionText: "Az érzéseimet, gondolataimat a következő módokon fejezem ki szívesebben:",
            imageUrl: staticProvider.globalConfig.misc.assetStoreUrl + "/application/kerdes5.png",
            answers: [
                {
                    text: "Zenéken, írásokon, a művészet által",
                },
                {
                    text: "Direkt, lényegre törő kommunikációval",
                }
            ]
        }
    ] as Question[]

    await connection
        .getRepository(Question)
        .save(questions);
}

// const users = [
//     {
//         firstName: "Edina",
//         lastName: "Sandor",
//         jobTitle: "IT manager",
//         role: "admin" as RoleType,
//         email: "edina.sandor@email.com",
//         organizationId: insertedOrganizationIds[0],
//         currentCourseId: courseInsertedIds[0],
//         currentExamId: examInsertIds[0]
//     },
//     {
//         firstName: "Bela",
//         lastName: "Kovacs",
//         jobTitle: "Takarito",
//         role: "admin" as RoleType,
//         email: "bela.kovacs@email.com",
//         organizationId: insertedOrganizationIds[1]
//     },
//     {
//         firstName: "Rebeka",
//         lastName: "Kis",
//         jobTitle: "Instructor",
//         role: "admin" as RoleType,
//         email: "rebeka.kis@email.com",
//         organizationId: insertedOrganizationIds[1]
//     }
// ];