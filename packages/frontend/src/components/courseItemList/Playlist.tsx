import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useState } from 'react';
import { useNavigation } from '../../services/core/navigatior';
import { PlaylistItemDTO } from '@episto/communication';
import { PlaylistModuleDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { EpistoButton } from '../controls/EpistoButton';
import { EpistoDiv } from '../controls/EpistoDiv';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { CollapseItem } from '../universal/CollapseItem';
import { FlexList } from '../universal/FlexList';
import { PlaylistItem } from './PlaylistItem';

export type NavigateToCourseItemActionType = (descriptorCode: string) => void;

export const Playlist = (props: {
    modules: PlaylistModuleDTO[],
    isMobile?: boolean
}) => {

    // hooks
    const [expandedNodeIds, setExpandedNodeIds] = useState<Id<'Module'>[]>([]);
    const { navigateToPlayer } = useNavigation();

    // data
    const { modules, isMobile } = props;

    const isBeginnerMode = modules
        .flatMap(x => x.items)
        .some(x => x.state === 'locked');

    const currentModule = modules
        .filter(module => module.moduleState === 'current')[0] as PlaylistModuleDTO | null;

    const currentItem = modules
        .flatMap(x => x.items)
        .filter(x => x.state === 'current')[0] as PlaylistItemDTO | null;

    const isCurrentExpanded = expandedNodeIds
        .some(x => x === currentModule?.moduleId);

    const isModuleSelected = !!modules
        .filter(x => x.moduleState === 'current' && !x
            .items
            .some(x => x.state === 'current'))[0];

    useEffect(() => {

        // open all modules by default
        setExpandedNodeIds(
            modules.map(x => x.moduleId)
        );
    }, [modules]);

    // funcs
    const handleToggle = (moduleId: Id<'Module'>) => {

        if (expandedNodeIds.some(x => x === moduleId)) {

            setExpandedNodeIds(expandedNodeIds.filter(x => x !== moduleId));
        }
        else {

            setExpandedNodeIds([...expandedNodeIds, moduleId]);
        }
    };

    const startModule = (code: string) => {

        navigateToPlayer(code);
    };

    // selection changed
    useEffect(() => {

        if (!currentModule)
            return;

        const expandedIds = isModuleSelected
            ? isBeginnerMode
                ? []
                : [currentModule.moduleId]
            : [currentModule.moduleId];

        //setExpandedNodeIds(expandedIds);
    }, [isModuleSelected, currentItem, currentModule]);

    return (
        <EpistoFlex2
            id="courseItemListRoot"
            direction="column"
            zIndex={0}
            justifyContent={'flex-start'}>

            {modules
                .map((module, index) => {

                    const isLocked = module.moduleState === 'locked';
                    const isStartable = (module.moduleState === 'available' || module.moduleState === 'completed');
                    const hasCurrentItem = module.items.some(x => x.state === 'current');
                    const isSelected = module.moduleState === 'current' && !hasCurrentItem;
                    const unclickable = isSelected && isBeginnerMode;
                    const isOpen = expandedNodeIds.some(x => x === module.moduleId);
                    const headercolor = isSelected ? 'white' : undefined;

                    return <CollapseItem
                        key={index}
                        isOpen={isOpen}
                        style={{
                            pointerEvents: isLocked || unclickable ? 'none' : 'all',
                            color: isLocked ? 'gray' : undefined,
                            zIndex: 0
                        }}
                        header={() => <EpistoFlex2
                            bg={isSelected ? 'var(--deepBlue)' : undefined}
                            color={headercolor}
                            justify="space-between"
                            borderBottom="1px solid var(--mildGrey)"
                            align="center"
                            height="50px"
                            minH={'50px'}
                            zIndex={0}
                            pl={isMobile ? '0' : '5px'}>

                            {/* open/close */}
                            <EpistoFlex2
                                align="center">

                                <EpistoButton
                                    onClick={() => handleToggle(module.moduleId)}>

                                    {unclickable
                                        ? <FiberManualRecordIcon style={{ color: headercolor }} />
                                        : isOpen
                                            ? <ExpandMoreIcon style={{ color: headercolor }} />
                                            : <ChevronRightIcon style={{ color: headercolor }} />}
                                </EpistoButton>

                                {/* title */}
                                <EpistoFont>
                                    {module.moduleName}
                                </EpistoFont>
                            </EpistoFlex2>

                            {/* play */}
                            <EpistoDiv width="50px">

                                {isStartable && <EpistoButton
                                    padding="3px"
                                    onClick={() => startModule(module.moduleCode)}
                                    variant="outlined">

                                    <PlayArrowIcon style={{ color: 'var(--epistoTeal)' }} />
                                </EpistoButton>}
                            </EpistoDiv>
                        </EpistoFlex2>}>

                        <FlexList
                            id="courseItemListContainer"
                            p="10px">

                            {module
                                .items
                                .map((playlistItem, index) => <PlaylistItem
                                    key={index}
                                    playlistItem={playlistItem} />)}
                        </FlexList>
                    </CollapseItem>;
                })}
        </EpistoFlex2>
    );
};