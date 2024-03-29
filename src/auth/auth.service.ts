import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { user } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    issuer = 'login';
    audience = 'users'

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ){}

    async createToken(user: user){
        return {
            acessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            }, {
                expiresIn: '7 days',
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }

    async checkToken(token: string){
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience
            });

            console.log('CHECK TOKEN')

            return data;
        } catch (e) {
            throw new BadRequestException(e)
        }
        
    }

    async isValidToken(token: string){
        try {

            this.checkToken(token);

            return true;
        } catch (e) {
            return false;
        }
        
    }

    async login(email: string, password: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        })

        console.log('LOGIN')

        if(!user){
            throw new UnauthorizedException('Email e/ou senha incorretos.')
        }

        return this.createToken(user);;
    }

    async forget(email: string){
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            }
        })

        if(!user){
            throw new UnauthorizedException('Email está incorreto.')
        }

        // tODO enviar email... 

        return true;
    }

    async reset(password: string, token: string){
        // TODO validar o token se for valido alterar senha

        const id = 0;

        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                password
            }
        });

        return this.createToken(user);
    }

    async register(data: AuthRegisterDTO){

        const user = await this.userService.create(data)

        return this.createToken(user);
    }

}