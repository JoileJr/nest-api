import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [
        JwtModule.register({
            secret: "29XfgH968$eZRQb4yRDffWzV72+zYka7"
        }),
        UserModule,
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [],
})
export class AuthModule {

}