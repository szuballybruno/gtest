import { Column, Entity, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { StorageFile } from '../misc/StorageFile';
import { VideoData } from './VideoData';

@Entity()
export class VideoFile {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'VideoFile'>;

    @Column({ type: 'double precision' })
    @XViewColumn()
    lengthSeconds: number;

    // TO ONE 

    // storage file
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    storageFileId: Id<'StorageFile'>;
    @XManyToOne<VideoFile>()(() => StorageFile, s => s.videoFiles)
    @XJoinColumn<VideoFile>('storageFileId')
    storageFile: Relation<StorageFile>;

    // TO MANY

    // videos 
    @XOneToMany<VideoFile>()(() => VideoData, x => x.videoFile)
    videos: VideoData[];
}