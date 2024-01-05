import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller('users')
export class UserController{

    @Post()
    async create(@Body() body){
        return {body}
    }

    @Get(':id')
    async read(@Param() id){
        return {users:[], id}
    }

}