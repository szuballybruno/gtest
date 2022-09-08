import { Close } from '@mui/icons-material';
import { ButtonType } from '../../models/types';
import { Id } from '../../shared/types/versionId';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoCheckbox } from '../controls/EpistoCheckbox';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoSearch } from '../controls/EpistoSearch';
import { BulkEditButtons, BulkEditButtonType } from './BulkEditButtons';

export const AdminListEditHeader = (props: {
    isAllSelected?: boolean,
    selectAllOrNone?: (isAll: boolean) => void,
    selectedIds?: Id<'ShopItem'>[],
    headerButtons?: BulkEditButtonType[],
    itemLabel?: string,
    onSearchChanged?: (value: string) => void,
    buttons?: ButtonType[]
}) => {

    const { isAllSelected, selectedIds, buttons, onSearchChanged, itemLabel, headerButtons, selectAllOrNone } = props;

    const selectedIdsNullSafe = selectedIds ?? [];
    const isAnySelected = selectedIdsNullSafe.some(x => true);
    const isSingleSelected = selectedIdsNullSafe.length === 1;
    const selectionCount = selectedIdsNullSafe.length;

    return <EpistoFlex2
        bg="var(--transparentWhite70)"
        className="roundBorders"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height="60px">

        {/* all/none selection */}
        <EpistoFlex2>

            {/* select all */}
            <EpistoButton
                onClick={() => {

                    if (selectAllOrNone)
                        selectAllOrNone(true);
                }}>

                <div className="h-flex align-center fontLight">

                    <EpistoCheckbox
                        value={!!isAllSelected} />

                    <EpistoFont
                        style={{ marginLeft: '20px', color: 'black' }}>

                        Összes kijelölése
                    </EpistoFont>
                </div>
            </EpistoButton>

            {/* deselect all */}
            <EpistoButton
                onClick={() => {

                    if (selectAllOrNone)
                        selectAllOrNone(false);
                }}>

                <div className="h-flex align-center fontLight">

                    <EpistoFont
                        style={{ marginLeft: '20px', color: 'black' }}>

                        {`${selectionCount} ${itemLabel} kijelölve`}
                    </EpistoFont>

                    <Close
                        onClick={() => {

                            if (selectAllOrNone)
                                selectAllOrNone(false);
                        }}
                        style={{
                            width: 18,
                            marginLeft: 5
                        }} />
                </div>
            </EpistoButton>
        </EpistoFlex2 >

        {/* spacer */}
        <EpistoFlex2 flex={1} />

        {/* bulk edit buttons */}
        {isSingleSelected && <BulkEditButtons
            buttons={headerButtons ?? []} />}

        {/* search */}
        <EpistoFlex2
            height="100%"
            direction={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            width={140}
            mx={10}>
            <EpistoSearch
                width={140}
                onChange={(x) => {

                    if (onSearchChanged)
                        onSearchChanged(x.target.value);
                }} />
        </EpistoFlex2>

        {/* order by */}
        <EpistoFlex2
            className="align-center"
            height="100%"
            mx={10}>

            {/* <EpistoSelect
                items={[] as string[]}
                onSelected={x => { throw new Error('Not implemented!'); }}
                selectedValue={'1' as string}
                getCompareKey={x => x as string}
                defaultValue="Rendezés...">

            </EpistoSelect> */}
        </EpistoFlex2>

        {/* buttons */}
        {(buttons ?? [])
            .map((x, index) => (
                <EpistoButton
                    key={index}
                    variant="plain"
                    className="margin-right"
                    onClick={x.action}
                    style={{
                        background: 'white'
                    }}>

                    {x.title}
                </EpistoButton>
            ))}
    </EpistoFlex2 >;
};