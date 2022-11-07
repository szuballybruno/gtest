import { gen } from './util.js';

const courses = gen('course_');
courses.course_obs = { id: 'course_obs' };
courses.course_excel = { id: 'course_excel' };
courses.course_powerPoint = { id: 'course_powerPoint' };
courses.course_google_ads = { id: 'course_google_ads' }
courses.course_linked_in = { id: 'course_linked_in' }

const modules = gen('module_');

export const oldexams = {
    exam_8: {
        title: 'Első lépések témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 15,
        type: 'normal',
        deletionDate: null,
        retakeLimit: null,
        courseId: courses.course_google_ads.id,
        moduleId: modules.module_2.id
    },
    exam_9: {
        title: 'Ismerkedés a függvényekkel témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 25,
        type: 'normal',
        deletionDate: null,
        retakeLimit: null,
        courseId: courses.course_google_ads.id,
        moduleId: modules.module_2.id
    },
    exam_10: {
        title: 'OBS Studio témazáró',
        subtitle: 'Nézzük át még egyszer az alapokat',
        description: null,
        thumbnailUrl: null,
        orderIndex: 1,
        type: 'normal',
        deletionDate: null,
        retakeLimit: null,
        courseId: courses.course_obs.id,
        moduleId: modules.module_8.id
    },
    exam_15: {
        title: 'Leggyakoribb függvények és azok használata témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 15,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_excel.id,
        moduleId: modules.module_38.id
    },
    exam_16: {
        title: 'Segítség az adatkezelésben témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 11,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_excel.id,
        moduleId: modules.module_39.id
    },
    exam_17: {
        title: 'Formázás felsőfokon témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 12,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_excel.id,
        moduleId: modules.module_41.id,
    },
    exam_18: {
        title: 'Munka nagy mennyiségű adattal témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 17,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_excel.id,
        moduleId: modules.module_42.id,
    },
    exam_20: {
        title: 'Microsoft Excel Alapok kurzuszáró vizsga',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 118,
        type: 'final',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_excel.id,
        moduleId: modules.module_44.id,
    },
    exam_21: {
        title: 'Első lépések témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 18,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_28.id,
        moduleId: modules.module_45.id,
    },
    exam_12: {
        title: 'Első lépések témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 14,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_excel.id,
        moduleId: modules.module_35.id,
    },
    exam_13: {
        title: 'Ismerkedés a függvényekkel témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 9,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_excel.id,
        moduleId: modules.module_36.id,
    },
    exam_14: {
        title: 'A formázás alapjai témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 16,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_excel.id,
        moduleId: modules.module_37.id,
    },
    exam_22: {
        title: 'Formázás - Hogyan készíthetünk letisztult dokumentumokat? témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 29,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_28.id,
        moduleId: modules.module_47.id,
    },
    exam_23: {
        title: 'Gyorsabb munka a gyakorlatban témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 17,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_28.id,
        moduleId: modules.module_48.id,
    },
    exam_24: {
        title: 'Szövegírás, elrendezés, ellenőrzés témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 18,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_28.id,
        moduleId: modules.module_50.id,
    },
    exam_25: {
        title: 'Képek, vizuális eszközök használata témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 18,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_28.id,
        moduleId: modules.module_51.id,
    },
    exam_26: {
        title: 'Microsoft Word Alapok kurzus záróvizsga',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 123,
        type: 'final',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_28.id,
        moduleId: modules.module_53.id,
    },
    exam_27: {
        title: 'Első lépések témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 25,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_powerPoint.id,
        moduleId: modules.module_54.id,
    },
    exam_28: {
        title: 'Szöveg és tartalom formázása témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 13,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_powerPoint.id,
        moduleId: modules.module_55.id,
    },
    exam_29: {
        title: 'Képek, vizuális eszközök használata témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 19,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_powerPoint.id,
        moduleId: modules.module_56.id,
    },
    exam_30: {
        title: 'Videók és hanganyagok használata a PowerPointon belül témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 5,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_powerPoint.id,
        moduleId: modules.module_57.id,
    },
    exam_31: {
        title: 'Prezentáció rendszerezése, segítség az előadás során témazáró',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 12,
        type: 'normal',
        deletionDate: null,
        retakeLimit: 3,
        courseId: courses.course_powerPoint.id,
        moduleId: modules.module_58.id,
    },
    exam_32: {
        title: ' Microsoft PowerPoint Alapok kurzus záróvizsga',
        subtitle: '',
        description: null,
        thumbnailUrl: null,
        orderIndex: 4,
        type: 'final',
        deletionDate: null,
        retakeLimit: 1,
        courseId: courses.course_powerPoint.id,
        moduleId: modules.module_60.id,
    },
    pretest_exam_33: {
        courseId: courses.course_google_ads.id,
        title: 'Pretest exam course 1',
        subtitle: 'Pretest exam course 1 desc',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    },
    pretest_exam_34: {
        courseId: courses.course_29.id,
        title: 'Pretest exam course 10',
        subtitle: 'Pretest exam course 10 desc',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    },
    pretest_exam_35: {
        courseId: courses.course_23.id,
        title: 'Pretest exam course 23',
        subtitle: 'Pretest exam course 23 desc',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    },
    pretest_exam_36: {
        courseId: courses.course_google_ads.id,
        title: 'Pretest exam course 24',
        subtitle: 'Pretest exam course 24 desc',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    },
    pretest_exam_37: {
        courseId: courses.course_26.id,
        title: 'Pretest exam course 26',
        subtitle: 'Pretest exam course 26 desc',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    },
    pretest_exam_38: {
        courseId: courses.course_linked_in.id,
        title: 'Pretest exam course 25',
        subtitle: 'Pretest exam course 25 desc',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    },
    pretest_exam_39: {
        courseId: courses.course_28.id,
        title: 'Word',
        subtitle: 'Kezdés',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    },
    pretest_exam_40: {
        courseId: courses.course_obs.id,
        title: 'OBS',
        subtitle: 'Kezdés',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    },
    pretest_exam_41: {
        courseId: courses.course_powerPoint.id,
        title: 'PowerPoint',
        subtitle: 'Kezdés',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    },
    pretest_exam_42: {
        courseId: courses.course_29.id,
        title: 'Pretest exam course 29',
        subtitle: 'Pretest exam course 29 desc',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    },
    pretest_exam_43: {
        courseId: courses.course_excel.id,
        title: 'Microsoft Excel szintfelmérő vizsga',
        subtitle: 'Most kiderítjük, hogy megy neked az Excel, majd ez alapján személyre szabjuk számodra a kurzust.',
        description: '',
        orderIndex: 0,
        moduleId: null,
        type: 'pretest',
        retakeLimit: null,
        thumbnailUrl: null,
        deletionDate: null
    }
}