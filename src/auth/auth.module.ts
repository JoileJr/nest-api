import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            secret: "29XfgH968$eZRQb4yRDffWzV72+zYka7"
        }),
        UserModule,
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {

}