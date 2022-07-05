import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { CourseVisibilityType } from '../../../shared/types/sharedTypes';
import { CourseCategory } from '../CourseCategory';
import { StorageFile } from '../StorageFile';
import { User } from '../User';
import { CourseVersion } from './CourseVersion';

@Entity()
export class CourseData {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @UpdateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    modificationDate: Date;

    @Column()
    @XViewColumn()
    title: string;

    @Column()
    @XViewColumn()
    shortDescription: string;

    @Column()
    @XViewColumn()
    description: string;

    @Column({ type: 'double precision' })
    @XViewColumn()
    difficulty: number;

    @Column({ type: 'double precision' })
    @XViewColumn()
    benchmark: number;

    @Column()
    @XViewColumn()
    previouslyCompletedCount: number;

    @Column()
    @XViewColumn()
    language: string;

    @Column()
    @XViewColumn()
    technicalRequirements: string;

    @Column()
    @XViewColumn()
    requirementsDescription: string;

    @Column()
    @XViewColumn()
    isFeatured: boolean;

    @Column()
    @XViewColumn()
    skillBenefits: string;

    @Column()
    humanSkillBenefits: string;

    @Column()
    @XViewColumn()
    humanSkillBenefitsDescription: string;

    @XViewColumn()
    @Column({ default: 'public', type: 'text' })
    visibility: CourseVisibilityType;

    //
    // TO MANY
    //

    @XOneToMany<CourseData>()(() => CourseVersion, x => x.courseData)
    courseVersions: CourseVersion[];

    //
    // TO ONE
    //

    // course category
    @Column()
    @XViewColumn()
    categoryId: number;
    @ManyToOne(() => CourseCategory, x => x.categoryCourses)
    @JoinColumn({ name: 'category_id' })
    category: Relation<CourseCategory>;

    // course sub category
    @Column()
    @XViewColumn()
    subCategoryId: number;
    @ManyToOne(() => CourseCategory, x => x.subCategoryCourses)
    @JoinColumn({ name: 'sub_category_id' })
    subCategory: CourseCategory;

    // teacher
    @Column()
    @XViewColumn()
    teacherId: number;
    @ManyToOne(() => User, teacher => teacher.teachedCourses)
    @JoinColumn({ name: 'teacher_id' })
    teacher: Relation<User>;

    // coverFile
    @Column({ nullable: true })
    @XViewColumn()
    coverFileId: number | null;
    @ManyToOne(_ => StorageFile, x => x.courses, { cascade: true })
    @JoinColumn({ name: 'cover_file_id' })
    coverFile: Relation<StorageFile>;
}