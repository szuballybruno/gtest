import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ActivitySession } from "./ActivitySession";
import { ActivityStreak } from "./ActivityStreak";
import { GivenAnswer } from "./GivenAnswer";
import { GivenAnswerStreak } from "./GivenAnswerStreak";
import { User } from "./User";
import { UserSessionActivity } from "./UserSessionActivity";
import { Video } from "./Video";

@Entity()
export class CoinAcquire {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => "now()", type: "timestamptz" })
    creationDate: Date;

    @Column()
    amount: number;

    //
    // user  
    //
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.coinAcquires)
    @JoinColumn({ name: "user_id" })
    user: User;

    //
    // user session activity 
    //
    @Column({ nullable: true, type: "integer" })
    activitySessionId: number;

    @JoinColumn({ name: "activity_session_id" })
    @ManyToOne(_ => ActivitySession, x => x.coinAcquires)
    activitySession: ActivitySession | null;

    //
    // video 
    //
    @Column({ nullable: true, type: "integer" })
    videoId: number;

    @JoinColumn({ name: "video_id" })
    @ManyToOne(_ => Video, x => x.coinAcquires)
    video: Video | null;

    //
    // given answer  
    //
    @Column({ nullable: true, type: "integer" })
    givenAnswerId: number;

    @JoinColumn({ name: "given_answer_id" })
    @ManyToOne(_ => GivenAnswer, x => x.coinAcquires)
    givenAnswer: GivenAnswer | null;

    //
    // given answer streak 
    //
    @Column({ nullable: true, type: "integer" })
    givenAnswerStreakId: number;

    @JoinColumn({ name: "given_answer_streak_id" })
    @ManyToOne(_ => GivenAnswerStreak, x => x.coinAcquires)
    givenAnswerStreak: GivenAnswerStreak | null;

    // 
    // activity streak
    //
    @Column({ nullable: true, type: "integer" })
    activityStreakId: number;

    @JoinColumn({ name: "activity_streak_id" })
    @ManyToOne(_ => ActivityStreak, x => x.coinAcquires)
    activityStreak: ActivityStreak | null;
}