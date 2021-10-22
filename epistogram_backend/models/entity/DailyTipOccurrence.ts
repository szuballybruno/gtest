import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DailyTip } from "./DailyTip";

@Entity()
export class DailyTipOccurrence {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    creationDate: Date;

    // daily tip
    @Column()
    dailyTipId: number;

    @ManyToOne(_ => DailyTip, x => x.occurrences)
    @JoinColumn({ name: "dailyTipId" })
    dailyTip: DailyTip;
}