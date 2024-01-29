import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}
    
    @Post('login')
    async login(@Body() body: AuthLoginDTO) {}

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.userService.create(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {
        return this.authService.reset(password, token);
    }
}
