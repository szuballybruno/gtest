import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class ModulePlayerView {

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    description: string;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    imageFilePath: string | null;
}