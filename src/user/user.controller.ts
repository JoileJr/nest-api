import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptors";

@Controller('users')
export class UserController{

    constructor(private readonly userService: UserService) {}

    //@UseInterceptors(LogInterceptor)
    @Post()
    async create(@Body() data: CreateUserDTO){
        return this.userService.create(data);
    }

    @Get()
    async list(){
        return this.userService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number){
        return this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDto, @Param('id', ParseIntPipe) id: number){
        return this.userService.update(data, id);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDto, @Param('id', ParseIntPipe) id: number){
        return this.userService.updatePartial(data, id);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.userService.delete(id);
    }

}