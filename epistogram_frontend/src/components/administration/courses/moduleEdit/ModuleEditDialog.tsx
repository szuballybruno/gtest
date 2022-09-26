import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoDialog } from '../../../universal/epistoDialog/EpistoDialog';
import { useModuleEditColumns } from './ModuleEditColumns';
import { ModuleEditDialogLogicType } from './ModuleEditDialogLogic';

export const ModuleEditDialog = ({
    logic,
}: {
    logic: ModuleEditDialogLogicType,
}) => {

    const {
        canDelete,
        handleCreateModule,
        handleOk,
        mutatorFunctions,
        dialogLogic,
        mutatedItems,
        mutations,
        isAnyItemsMutated
    } = logic;

    const rows = mutatedItems
        .filter(x => !x.isPretestModule);

    const columns = useModuleEditColumns({ mutatorFunctions });

    return (
        <EpistoDialog
            logic={dialogLogic}>

            <EpistoFlex2
                bg="white"
                p="15px"
                direction="column"
                width="90vw"
                height="90vh">

                {/* header */}
                <EpistoFlex2
                    mb="15px"
                    align="center"
                    justify="space-between"
                    margin={{ all: 'px5' }}>

                    <EpistoFont
                        fontSize2="large">
                        Module edit
                    </EpistoFont>

                    <EpistoButton
                        variant='colored'
                        onClick={handleCreateModule}>

                        {translatableTexts.misc.add}
                    </EpistoButton>
                </EpistoFlex2>

                {/* grid */}
                <EpistoDataGrid
                    onRowOrderChange={(opts) => {
                        
                        console.log(opts);
                        // mutatorFunctions
                        //     .mutate({
                        //         key,
                        //         field: 'orderIndex',
                        //         newValue: 
                        //     });
                    }}
                    hideFooter
                    columns={columns}
                    rows={rows}
                    getKey={x => x.moduleVersionId} />

                {/* footer */}
                <EpistoFlex2
                    justify="flex-end"
                    mt="5px"
                    margin={{ all: 'px5' }}>
                    <EpistoButton
                        variant='colored'
                        onClick={handleOk}>

                        {translatableTexts.misc.ok}
                    </EpistoButton>
                </EpistoFlex2>
            </EpistoFlex2>
        </EpistoDialog>
    );
};