export type Langages = "javascript" | "python" | "java" | "cpp" | "c"

export interface CodingQuestion {
    prog_id: string,
    title: string,
    question: string,
    testCases: TestCases[],
    contest_id?: string,
    saved: boolean,
    boilerplateCodeJS: string,
    //language?: Langages,
    //submitedCode?: string
    //createdAt: number,
    //updatedAt: number
}

export interface TestCases {
    input: string,
    output: string,
    points: number,
    testcase_id?: string
}

