import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret: "29XfgH968$eZRQb4yRDffWzV72+zYka7"
    })],
    controllers: [],
    providers: [],
})
export class AuthModule {

}