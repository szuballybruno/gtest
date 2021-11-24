import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserActivityFlatView } from "../views/UserActivityFlatView";
import { AnswerSession } from "./AnswerSession";
import { CoinAcquire } from "./CoinAcquire";
import { Course } from "./Course";
import { Exam } from "./Exam";
import { JobTitle } from "./JobTitle";
import { Organization } from "./Organization";
import { Role } from "./Role";
import { StorageFile } from "./StorageFile";
import { Task } from "./Task";
import { UserCourseBridge } from "./UserCourseBridge";
import { UserSessionActivity } from "./UserSessionActivity";
import { Video } from "./Video";
import { VideoPlaybackData } from "./VideoPlaybackData";
import { VideoPlaybackSample } from "./VideoPlaybackSample";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn()
    deletionDate: Date;

    @Column()
    isPendingInvitation: boolean;

    // a trusted user has been invited to use the application,
    // users can join without invitation but they will be considered untrusted, 
    // thus cannot access the application, except the unprotected parts
    @Column()
    isTrusted: boolean;

    @Column()
    email: string;

    @Column({ nullable: true })
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    userDescription: string;

    @Column({ nullable: true })
    linkedInUrl: string;

    @Column({ default: false })
    isTeacher: boolean;

    @Column({ nullable: true })
    password: string;

    // tokens 
    @Column({ nullable: true, type: "text" })
    refreshToken: string | null;

    @Column({ nullable: true, type: "text" })
    resetPasswordToken: string | null;

    @Column({ nullable: true, type: "text" })
    invitationToken: string | null;

    // user activity 
    @OneToOne(_ => UserActivityFlatView, x => x.user)
    @JoinColumn({ name: "id" })
    userActivity: UserActivityFlatView;

    // user role
    @Column()
    roleId: number;

    @ManyToOne(_ => Role, x => x.users)
    @JoinColumn({ name: "roleId" })
    role: Role;

    // Avatar file
    @Column({ nullable: true })
    avatarFileId: number;

    @ManyToOne(() => StorageFile, sf => sf.users)
    @JoinColumn({ name: 'avatarFileId' })
    avatarFile: StorageFile | null

    // Organization 
    @Column({ nullable: true, type: "number" })
    organizationId: number | null;

    @ManyToOne(() => Organization, organization => organization.users)
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    // job title 
    @Column({ nullable: true, type: "number" })
    jobTitleId: number | null;

    @ManyToOne(_ => JobTitle, x => x.users)
    @JoinColumn({ name: "jobTitleId" })
    jobTitle: JobTitle | null;

    // Tasks
    @OneToMany(() => Task, task => task.user)
    @JoinColumn()
    tasks: Task[]

    // teacher
    @OneToMany(() => Course, course => course.teacher)
    @JoinColumn()
    teachedCourses: Course[]

    // answer sessions
    @OneToMany(_ => AnswerSession, as => as.user)
    @JoinColumn()
    answerSessions: AnswerSession[];

    // video playback samples 
    @OneToMany(_ => VideoPlaybackSample, x => x.user)
    @JoinColumn()
    videoPlaybackSamples: VideoPlaybackSample[];

    // video playback datas 
    @OneToMany(_ => VideoPlaybackData, x => x.user)
    @JoinColumn()
    videoPlaybackDatas: VideoPlaybackData[];

    // user course bridges 
    @OneToMany(_ => UserCourseBridge, x => x.user)
    @JoinColumn()
    userCourseBridges: UserCourseBridge[];

    // session activity 
    @OneToMany(_ => UserSessionActivity, x => x.user)
    @JoinColumn()
    sessionActivity: UserSessionActivity;

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinAcquire, x => x.sessionActivity)
    coinAcquires: CoinAcquire[];
}