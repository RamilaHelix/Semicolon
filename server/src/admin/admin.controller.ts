import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Admin } from '../entities/admin';
import { AdminService } from './admin.service';
import { CreateAuthDTO } from './dto/create-auth.dto';
import { VerifyAuthDTO } from './dto/verify-auth.dto';

@Controller()
export class AdminController {
  constructor(private readonly usersService: AdminService) { }

  @Get('/users')
  getUsers(): Promise<Admin[]> {
    return this.usersService.findAll();
  }
  @Post('/signup')
  registerUser(@Body() user: CreateAuthDTO) {
    console.log(user)
    return this.usersService.createUser(user);
  }
  @Post('/login')
  loginUser(@Body() user: VerifyAuthDTO) {
    console.log(user);

    return this.usersService
      .findUser({
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        console.log(res);
        return { admin_id: res[0].admin_id };
      })
      .catch((error) => {
        return { error };
      });
  }
  @Get('attempted/:contest_id')
  getCandidateByContest(@Param('contest_id') id: string) {
    return this.usersService.getAttemptedTestCandidate(id)
  }
}
