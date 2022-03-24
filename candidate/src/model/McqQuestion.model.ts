export interface Mcq {
    // consted_id?: string,
    mcq_id: string,
    question_number: number,
    points: number
    question: string,
    a: string,
    b: string,
    c: string,
    d: string,
    choice?: string,
    disabled?: boolean;
}