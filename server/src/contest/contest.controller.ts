import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ContestService } from './Contest.service';
import { CreateContest, CreateTestDto } from './create-test.dto';
import { existsSync, rmSync } from 'fs';
import * as path from "path";
//const rimraf = require("rimraf");
@Controller()
export class ContestController {
    constructor(private readonly contestService: ContestService) { }

    @Post('create')
    create(@Body() createTest: CreateTestDto) {
        return this.contestService
            .create(createTest)
            .then((res) => res)
            .catch((err) => err);
    }

    @Post('createcontest')
    createConstest(@Body() createContest: CreateContest) {
        return this.contestService
            .createContest(createContest)
            .then((res) => res)
            .catch((err) => err);
    }

    @Get('getcontest/:contest_id')
    getAllMcqsByContest(@Param('contest_id') contest_id: string) {
        return this.contestService.getByContestId(contest_id);
    }

    @Delete('delete/:contest_id')
    delete(@Param('contest_id') contest_id: string) {
        return this.contestService.delete(contest_id);
    }

    @Get('/endcontest?:candidate_id')
    endContest(@Query('candidate_id') candidate_id: string) {
        const dir2 = path.join(__dirname, '../', 'scripts', candidate_id);
        if (existsSync(dir2)) {
            console.log(dir2)
            //rimraf(dir2, () => { console.log('delter') });
            rmSync(dir2, { recursive: true });
        }
        return ({ message: "endTest" })
    }
}
