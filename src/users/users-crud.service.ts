import { HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserRequest } from './create-user-request.dto'
import { User } from './user.entity'

export class UserCrud {
	constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

	async save(user: CreateUserRequest) {
		console.log(user)

		if (!!user?.id) {
			const userFound = await this.repository.findOne(user.id)
			if (!!userFound) {
				return { status: HttpStatus.OK, body: this.userMapper(userFound) }
			}
		}

		return { status: HttpStatus.CREATED, body: this.userMapper(await this.repository.save(user)) }
	}

	async readById(id: number) {
		const userFound = await this.repository.findOne(id)

		if (!!userFound) {
			return { status: HttpStatus.OK, body: this.userMapper(userFound) }
		}

		return { status: HttpStatus.NOT_FOUND }
	}

	private userMapper(user: User) {
		return {
			birthDate: user.birthDate,
			birthPlace: user.birthPlace,
			name: user.name,
			surname: user.surname,
			id: user.id,
			middleName: user.middleName
		}
	}
}
