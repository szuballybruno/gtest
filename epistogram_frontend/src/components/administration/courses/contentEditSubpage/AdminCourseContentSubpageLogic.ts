import { CourseContentItemAdminDTO } from '../../../../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseContentItemIssueDTO } from '../../../../shared/dtos/admin/CourseContentItemIssueDTO';
import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { instantiate } from '../../../../shared/logic/sharedLogic';
import { CourseItemType } from '../../../../shared/types/sharedTypes';
import { VersionCode } from '../../../../shared/types/VersionCode1';
import { Id } from '../../../../shared/types/versionId';
import { formatTime } from '../../../../static/frontendHelpers';

export type RowSchemaModule = {
    versionId: Id<'ModuleVersion'>;
    isPretestModule: boolean;
    name: string;
    orderIndex: number;
};

export type RowSchema = {
    rowKey: VersionCode;
    rowNumber: number;
    itemOrderIndex: number;
    itemTitle: string;
    itemSubtitle: string;
    module: RowSchemaModule;
    isFinal: boolean;
    itemType: {
        type: CourseItemType;
        label: string;
        color: any;
    };
    videoLength: {
        text: string;
        color: any;
    };
    errors: {
        text: string;
        tooltip: string;
        color: any;
    };
    videoFile: string;
    quickMenu: Id<'VideoVersion'> | Id<'ExamVersion'>;
    changedProperties: {
        itemOrderIndex: boolean;
        itemTitle: boolean;
        itemSubtitle: boolean;
        moduleId: boolean;
    };
    data: CourseContentItemAdminDTO;
};

const getItemTypeValues = (itemType: CourseItemType): { label: string, color: any } => {

    if (itemType === 'exam')
        return {
            color: 'var(--deepOrange)',
            label: 'Vizsga'
        };

    if (itemType === 'video')
        return {
            color: 'var(--deepBlue)',
            label: 'Videó'
        };

    if (itemType === 'pretest')
        return {
            color: 'purple',
            label: 'Szintfelmérő'
        };

    if (itemType === 'final')
        return {
            color: 'orange',
            label: 'Záróvizsga'
        };

    throw new Error('Unexpected type: ' + itemType);
};

const getIssueText = (dto: CourseContentItemIssueDTO) => {

    if (dto.code === 'ans_miss')
        return `Valaszok hianyoznak ebbol a kerdesbol: ${dto.questionName}`;

    if (dto.code === 'corr_ans_miss')
        return `Helyesnek megjelolt valaszok hianyoznak ebbol a kerdesbol: ${dto.questionName}`;

    if (dto.code === 'questions_missing')
        return 'Kerdesek hianyoznak';

    if (dto.code === 'video_too_long')
        return 'Video tul hosszu';

    return null;
};

export const mapToRowSchema = (
    item: CourseContentItemAdminDTO,
    rowNumber: number,
    modules: ModuleEditDTO[],
    getItemKey: (item: CourseContentItemAdminDTO) => VersionCode,
    isModified: (key: VersionCode, field: keyof CourseContentItemAdminDTO) => boolean): RowSchema => {

    const { color, label } = getItemTypeValues(item.itemType);

    const isLengthWarning = item
        .warnings
        .any(x => x.code === 'video_too_long');

    const hasErrors = item
        .errors
        .length > 0;

    const key = getItemKey(item);

    const isPretest = item.itemType === 'pretest';

    const getItemModule = () => {

        const module = modules
            .firstOrNull(x => x.moduleVersionId === item.moduleVersionId);

        if (!module)
            throw new Error(`Module for item (verisonCode: ${item.versionCode}) not found by moduleVersionId: ${item.moduleVersionId}`);

        return module;
    };

    // 
    const module = isPretest
        ? instantiate<ModuleEditDTO>({
            moduleVersionId: Id.create<'ModuleVersion'>(-1),
            name: 'none',
            orderIndex: -1,
            description: '',
            imageFilePath: '',
            isPretestModule: true
        })
        : getItemModule();

    return ({
        rowKey: item.versionCode,
        rowNumber: rowNumber,
        itemOrderIndex: isPretest ? -1 : item.itemOrderIndex,
        itemTitle: item.itemTitle,
        itemSubtitle: item.itemSubtitle,
        isFinal: item.itemType === 'final',
        module: instantiate<RowSchemaModule>({
            isPretestModule: isPretest,
            versionId: module.moduleVersionId,
            name: module.name,
            orderIndex: module.orderIndex,
        }),
        itemType: {
            label,
            color,
            type: item.itemType
        },
        videoLength: {
            text: item.itemType === 'exam'
                ? ' - '
                : !item.warnings || !item.videoLength
                    ? ''
                    : formatTime(Math.round(item.videoLength)),
            color: isLengthWarning
                ? 'var(--intenseOrange)'
                : 'gray'
        },
        errors: {
            text: hasErrors
                ? `${item.errors.length} hiba`
                : 'Nincs hiba',
            tooltip: item
                .errors
                .map(x => getIssueText(x))
                .join('\n'),
            color: hasErrors
                ? 'var(--intenseRed)'
                : 'var(--intenseGreen)'
        },
        quickMenu: item.videoVersionId! || item.examVersionId!,
        videoFile: 'vf',
        changedProperties: {
            itemOrderIndex: isModified(key, 'itemOrderIndex'),
            itemTitle: isModified(key, 'itemTitle'),
            itemSubtitle: isModified(key, 'itemSubtitle'),
            moduleId: isModified(key, 'moduleVersionId'),
        },
        data: item
    });
};