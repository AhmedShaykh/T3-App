import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ChangePassword, Login, Register, ResetPassword, UpdateData } from "./DTO/auth.dto";
import { AuthGuard } from "./guard/auth.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {

  constructor(private readonly userService: UserService) { };

  @Post("/register")
  register(@Body() data: Register) {
    return this.userService.register(data);
  };

  @Post("/login")
  login(@Body() data: Login) {
    return this.userService.login(data);
  };

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get("/profile")
  async profileView(@Request() req) {
    const user = await req?.user;
    return this.userService.profileView(user?.userId);
  };

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put("/profile/update")
  async updateProfile(@Request() req, @Body() data: UpdateData) {
    const user = await req?.user;
    return this.userService.updateProfile(user?.userId, data);
  };

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put("/profile/change-password")
  async changePassword(@Request() req, @Body() data: ChangePassword) {
    const user = await req?.user;
    return this.userService.changePassword(user?.userId, data);
  };

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post("/validate-reset-password-token")
  async ValidateResetPasswordToken(@Request() req) {
    const user = await req?.user;
    return this.userService.ValidateResetPasswordToken({ email: user.email, userId: user.userId });
  };

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put("/reset-password")
  async Resetpassword(@Request() req, @Body() data: ResetPassword) {
    const user = await req?.user;
    return this.userService.Resetpassword({ email: user.email, userId: user.userId }, data);
  };

};