import { Controller, Post, Body } from '@nestjs/common';
import { McqsSubmitDto } from './mcqs_submit.dto';
import { McqSubmitDto } from './mcq_submit.dto';
import { SubmitMcqService } from './submit-mcq.service';

@Controller('submit')
export class SubmitMcqController {
    constructor(private readonly submitService: SubmitMcqService) { }
    @Post('mcq')
    saveMsq(@Body() createSubmitDto: McqSubmitDto) {
        return this.submitService.submit(createSubmitDto);
    }

    @Post('mcqs')
    saveMsqs(@Body() mcqsSubmitDto: McqsSubmitDto) {
        return this.submitService.submitMcqs(mcqsSubmitDto);
        // console.log(createSubmitDto)
        //return { message: "mr" }
    }

}
