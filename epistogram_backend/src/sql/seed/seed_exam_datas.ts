import { ExamData } from '../../models/entity/exam/ExamData';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getExamDatasSeedData = () => getSeedList<ExamData>()({
    signup_exam_data: {
        description: null,
        orderIndex: null,
        retakeLimit: null,
        subtitle: null,
        thumbnailUrl: null,
        title: '[signup exam]',
        isFinal: false
    },
    exam_data_excel_elso_temazaro: {
        title: 'Első lépések témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 15,
        isFinal: false,
        retakeLimit: null,
    },
    exam_data_excel_ism_fuggveny_temazaro: {
        title: 'Ismerkedés a függvényekkel témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 25,
        isFinal: false,
        retakeLimit: null,
    },
    exam_data_10: {
        title: 'OBS Studio témazáró',
        subtitle: 'Nézzük át még egyszer az alapokat',
        description: null,
        thumbnailUrl: null,
        orderIndex: 1,
        isFinal: false,
        retakeLimit: null,
    },
    exam_data_15: {
        title: 'Leggyakoribb függvények és azok használata témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 15,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_16: {
        title: 'Segítség az adatkezelésben témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 11,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_17: {
        title: 'Formázás felsőfokon témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 12,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_18: {
        title: 'Munka nagy mennyiségű adattal témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 17,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_20: {
        title: 'Microsoft Excel Alapok kurzuszáró vizsga',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 118,
        isFinal: true,
        retakeLimit: 3,
    },
    exam_data_21: {
        title: 'Első lépések témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 18,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_12: {
        title: 'Első lépések témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 14,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_13: {
        title: 'Ismerkedés a függvényekkel témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 9,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_14: {
        title: 'A formázás alapjai témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 16,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_22: {
        title: 'Formázás - Hogyan készíthetünk letisztult dokumentumokat? témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 29,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_23: {
        title: 'Gyorsabb munka a gyakorlatban témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 17,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_24: {
        title: 'Szövegírás, elrendezés, ellenőrzés témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 18,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_25: {
        title: 'Képek, vizuális eszközök használata témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 18,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_26: {
        title: 'Microsoft Word Alapok kurzus záróvizsga',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 123,
        isFinal: true,
        retakeLimit: 3,
    },
    exam_data_27: {
        title: 'Első lépések témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 25,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_28: {
        title: 'Szöveg és tartalom formázása témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 13,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_29: {
        title: 'Képek, vizuális eszközök használata témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 19,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_30: {
        title: 'Videók és hanganyagok használata a PowerPointon belül témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 5,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_31: {
        title: 'Prezentáció rendszerezése, segítség az előadás során témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 12,
        isFinal: false,
        retakeLimit: 3,
    },
    exam_data_32: {
        title: ' Microsoft PowerPoint Alapok kurzus záróvizsga',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 4,
        isFinal: true,
        retakeLimit: 1,
    },
    pretest_exam_data_33: {
        title: 'Pretest exam course 1',
        subtitle: 'Pretest exam course 1 desc',
        description: '',
        orderIndex: 0,
        isFinal: false,
        retakeLimit: null,
        thumbnailUrl: null
    },
    pretest_exam_data_35: {
        title: 'Pretest exam course 23',
        subtitle: 'Pretest exam course 23 desc',
        description: '',
        orderIndex: 0,
        isFinal: false,
        retakeLimit: null,
        thumbnailUrl: null
    },
    pretest_exam_data_36: {
        title: 'Pretest exam course 24',
        subtitle: 'Pretest exam course 24 desc',
        description: '',
        orderIndex: 0,
        isFinal: false,
        retakeLimit: null,
        thumbnailUrl: null
    },
    pretest_exam_data_37: {
        title: 'Pretest exam course 26',
        subtitle: 'Pretest exam course 26 desc',
        description: '',
        orderIndex: 0,
        isFinal: false,
        retakeLimit: null,
        thumbnailUrl: null
    },
    pretest_exam_data_38: {
        title: 'Pretest exam course 25',
        subtitle: 'Pretest exam course 25 desc',
        description: '',
        orderIndex: 0,
        isFinal: false,
        retakeLimit: null,
        thumbnailUrl: null
    },
    pretest_exam_data_39: {
        title: 'Word',
        subtitle: 'Kezdés',
        description: '',
        orderIndex: 0,
        isFinal: false,
        retakeLimit: null,
        thumbnailUrl: null
    },
    pretest_exam_data_40: {
        title: 'OBS',
        subtitle: 'Kezdés',
        description: '',
        orderIndex: 0,
        isFinal: false,
        retakeLimit: null,
        thumbnailUrl: null
    },
    pretest_exam_data_41: {
        title: 'PowerPoint',
        subtitle: 'Kezdés',
        description: '',
        orderIndex: 0,
        isFinal: false,
        retakeLimit: null,
        thumbnailUrl: null
    },
    pretest_exam_data_42: {
        title: 'Pretest exam course 29',
        subtitle: 'Pretest exam course 29 desc',
        description: '',
        orderIndex: 0,
        isFinal: false,
        retakeLimit: null,
        thumbnailUrl: null
    },
    pretest_exam_data_43: {
        title: 'Microsoft Excel szintfelmérő vizsga',
        subtitle: 'Most kiderítjük, hogy megy neked az Excel, majd ez alapján személyre szabjuk számodra a kurzust.',
        description: '',
        orderIndex: 0,
        isFinal: false,
        retakeLimit: null,
        thumbnailUrl: null
    }
});

export type ExamDatasSeedDataType = ReturnType<typeof getExamDatasSeedData>;