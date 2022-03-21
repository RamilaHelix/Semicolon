import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  image;

  @Get('startTest/:contest_id')
  startContest(@Param('contest_id') contest_id: string) {
    return this.appService.getAllQuestions(contest_id);
  }

  @Get('getapi')
  getProcess() {
    console.log("proec", process.env.DATABASE_HOST)
    return "process.env.DATABASE_HOST"
  }

  @Post("easyimage/:upload&:type")
  @UseInterceptors(FileInterceptor('upload'))
  loadfile(@UploadedFile() file) {
    this.image = file;
    return {
      uploaded: true
    }
  }

  @Get('img')
  getImage() {
    const b64 = Buffer.from(this.image?.buffer).toString('base64');
    console.log(this.image)
    return (`<img src="data:${this.image.mimetype};base64,${b64}" />`)
  }
}
