import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async create(data: CreateUserDTO){
        return this.prisma.user.create({
            data: data
        });
    }

    async list(){
        return this.prisma.user.findMany();
    }

    async show(id: number){
        
        await this.exists(id)

        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async update({name, email, birthAt, password}: UpdatePutUserDto, id: number){

        await this.exists(id)

        return this.prisma.user.update({
            data: {
                name, 
                email, 
                password,
                birthAt: birthAt ? new Date(birthAt): null
            },
            where: {
                id
            }
        })
    }

    async updatePartial({name, email, birthAt, password}: UpdatePatchUserDto, id: number){

        await this.exists(id)

        return this.prisma.user.update({
            data: {
                name, 
                email, 
                password,
                birthAt: birthAt ? new Date(birthAt): null
            },
            where: {
                id
            }
        })
    }

    async delete(id: number){

        await this.exists(id)

        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number){
        if(!(await this.show(id))) {
            throw new NotFoundException
        }
    }
}