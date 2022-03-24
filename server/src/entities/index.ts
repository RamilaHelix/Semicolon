import { Admin } from "./admin";
import { Candidate } from "./candidate";
import { Contest } from "./contest";
import { Mcq } from "./mcqs";
import { Program } from "./programs";
import { TestCase } from "./testCases";
import { SubmitProgram } from "./submit-program.entity"
import { SubmitMcq } from "./submit-mcqs.entity";
const entities = [Admin, Candidate, Contest, Mcq, Program, TestCase, SubmitProgram, SubmitMcq]

export default entities;