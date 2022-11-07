import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class PersonalityTraitView {

	@XViewColumn()
	userId: Id<'User'>;
	
	@XViewColumn()
	traitCategoryId: Id<'PersonalityTraitCategory'>;
	
	@XViewColumn()
	traitCategoryTitle: string;

	@XViewColumn()
	minLabel: string;
	
	@XViewColumn()
	maxLabel: string;
	
	@XViewColumn()
	minDescription: string;

	@XViewColumn()
	maxDescription: string;
	
	@XViewColumn()
	minScore: number;

	@XViewColumn()
	maxScore: number;

	@XViewColumn()
	activeLabel: string;

	@XViewColumn()
	activeDescription: string;
}