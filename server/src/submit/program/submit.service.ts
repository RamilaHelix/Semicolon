import { Injectable } from '@nestjs/common';
import { v4 as v4uuid } from "uuid";
import * as path from "path";
import { gppcompiler } from 'src/utils/compiler/gppcompiler';
import { pythoncompiler } from 'src/utils/compiler/pythonCompiler';
import { nodecompiler } from 'src/utils/compiler/nodecompiler';
import { javacompiler } from 'src/utils/compiler/javacompiler';
import { gcccompiler } from 'src/utils/compiler/gcccompiler';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitProgram } from 'src/entities/submit-program.entity';
import { Repository } from 'typeorm';
import { CreateSubmitDto } from './dto/create_submit.dto';
import { ProgramsSubmitDto } from './dto/programs-submit.dto';
import { existsSync, rmdirSync, rmSync } from 'fs';
const rimraf = require("rimraf");

@Injectable()
export class SubmitProgramService {

  constructor(
    @InjectRepository(SubmitProgram)
    private submitProgramRepository: Repository<SubmitProgram>) { }

  runScript(createSubmitDto: CreateSubmitDto) {
    const { candidate_id, language, script } = createSubmitDto
    let testCases = createSubmitDto.testCases;

    const cand = path.join(candidate_id, language)
    const dir = path.join(__dirname, '../..', 'scripts', cand);
    const inputs = [];
    testCases = testCases.filter(test => !test.hidden)

    testCases.forEach(test => {
      inputs.push(test.input)
    })

    function validateTestCases(outputs): any[] {
      const response = [];
      testCases.forEach((testcase, index) => {
        response.push({
          output: outputs[index]?.message,
          input: testcase.input,
          expected: testcase.output,
          passed: testcase.output === outputs[index]?.message ?
            true : false
        })
      })
      return response;
    }


    switch (language) {
      case 'c':
        let c = gcccompiler(dir, { script, inputs })
        return validateTestCases(c);

      case 'cpp':
        let cpp = gppcompiler(dir, { script, inputs });
        return validateTestCases(cpp);

      case 'python':
        let python = pythoncompiler(dir, { script, inputs })
        return validateTestCases(python);

      case 'javascript':
        let javascript = nodecompiler(dir, { script, inputs })
        return validateTestCases(javascript);

      case 'java':
        let java = javacompiler(dir, { script, inputs: inputs })
        return validateTestCases(java)

      default:
        break;
    }
  }

  submit(createSubmitDto: CreateSubmitDto) {

    const { candidate_id, contest_id, language, prog_id, script } = createSubmitDto
    const testCases = createSubmitDto.testCases;
    const cand = path.join(candidate_id, language)
    const dir = path.join(__dirname, '../..', 'scripts', cand);
    let marks = 0
    const inputs = [];
    let outputs = [];
    testCases.forEach(test => {
      inputs.push(test.input); marks += test.points
    })

    function validateTestCases(outputs) {
      const response = [];
      testCases.forEach((testcase, index) => {
        if (testcase.output !== outputs[index].message) {
          marks -= testcase.points;
          response.push(`Test cases failed for ${testcase.input} => ${outputs[index].message}`)
        }
        else
          response.push(`${testcase.input} => ${outputs[index].message}`)
      })
      return response
    }
    try {
      switch (language) {
        case 'c':
          let c = gcccompiler(dir, { script, inputs })
          outputs = validateTestCases(c);
          break;

        case 'cpp':
          let cpp = gppcompiler(dir, { script, inputs });
          outputs = validateTestCases(cpp);
          break;

        case 'python':
          let python = pythoncompiler(dir, { script, inputs })
          outputs = validateTestCases(python);
          break;

        case 'javascript':
          let javascript = nodecompiler(dir, { script, inputs })
          outputs = validateTestCases(javascript);
          break;

        case 'java':
          let java = javacompiler(dir, { script, inputs: inputs })
          outputs = validateTestCases(java);
          break;
        default:
          break;
      }
      const comment = "\n>>>>>>>>>>>>>>>>>>>>>>>> Outputs <<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n"
      const output = comment.concat(outputs.reduce((a, v) => a + v + '\n', []))

      return this.submitProgramRepository.findOne({ prog_id, candidate_id }).then((res) => {
        if (res) {
          const sub_id = res.sub_id;

          return this.submitProgramRepository.update({ sub_id }, { script: script.concat(output), points: marks })
            .then(res => ({ message: 'updated Submitted Successfully!' }))
            .catch(error => error)
        }
        else {
          return this.submitProgramRepository.save({ sub_id: v4uuid(), candidate_id, contest_id, prog_id, script: script.concat(output), points: marks })
            .then(res => ({ message: 'Submitted Successfully!' }))
            .catch(error => error)
        }
      }).catch(error => error)
    } catch (error) {

      if (error.status === 406) {
        const comment = "\n>>>>>>>>>>>>>>>>>>>>>>>> Outputs <<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n"
        const output = comment.concat(error.response.error)
        return this.submitProgramRepository.findOne({ prog_id, candidate_id }).then((res) => {
          if (res) {
            const sub_id = res.sub_id;

            return this.submitProgramRepository.update({ sub_id }, { script: script.concat(output), points: marks })
              .then(res => ({ message: 'updated Submitted Successfully!' }))
              .catch(error => error)
          }
          else {
            return this.submitProgramRepository.save({ sub_id: v4uuid(), candidate_id, contest_id, prog_id, script: script.concat(output), points: marks })
              .then(res => ({ message: 'Submitted Successfully!' }))
              .catch(error => error)
          }
        }).catch(error => error)
      }
      return error.response
    }
  }

  submitPrograms(createSubmitDto: ProgramsSubmitDto) {
    const Progs = createSubmitDto.progs.map(prog => this.submit(prog))
    return Promise.all(Progs)
  }

}
