export interface CodingQuestion {
    prog_id: string,
    question: string,
    title: string,
    testCases?: TestCases[],
    time: number,
    boilerplateCodeJS: string,
    contest_id?: string,
    createdAt?: number,
    updatedAt?: number
}

export interface TestCases {
    testcase_id: string
    points: number,
    output: string,
    input: string,
    hidden: boolean
}