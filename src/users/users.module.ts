import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserCrud } from './users-crud.service'
import { UsersController } from './users.controller'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UsersController],
	providers: [UserCrud]
})
export class UsersModule {}
