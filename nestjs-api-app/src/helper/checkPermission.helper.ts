import { BadRequestException } from "@nestjs/common";

// export class Permission {
//     static check(id: number, getuser: User) {
//         if (id === getuser.id) return;
//         if (getuser.role.toLowerCase() === 'admin') return;
//         throw new BadRequestException('User can not perform action')
//     }
// }

// export class CheckRole {
//     static async checkRole(name: string, getUser: User, prismaService : PrismaService) {
//     }
// }