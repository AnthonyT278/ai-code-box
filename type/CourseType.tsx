export type course = {
    courseId: string;
    courseName: string;
    type: string;
    createdAt: string;
    id:number;
    courseLayout: courseLayout;
}

export type courseLayout = {
    courseName: string,
    courseDescrption: string,
    courseId: string,
    level: string,
    totalChapters: number
    chapters: Chapter[]
}

export type Chapter = {
    chapterId: string,
    chapterTitle: string,
    subContent: string[]
}

