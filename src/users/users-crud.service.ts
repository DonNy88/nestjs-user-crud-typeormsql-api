import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PagingQuery } from '../core'
import { CreateUserRequest } from './create-user-request.dto'
import { SearchUserQuery } from './search-user-query.dto'
import { SortUserQuery } from './sort-user-query.dto'
import { User } from './user.entity'

// TODO: Write a spec to test all public methods
@Injectable()
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

	async search(search: SearchUserQuery, sort: SortUserQuery, page: PagingQuery) {
		console.log({ search, sort, page })

		const where = search.toDatabaseWhere()
		const order = sort.toDatabaseQuery()
		const skip = page.toDatabaseOffset()
		const take = page.toDatabaseLimit()

		console.log({ where, take, skip, order })

		const [users, count] = await this.repository.findAndCount({ where, take, skip, order })

		const status = count > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND

		return { status, body: { count, results: users.map(this.userMapper) } }
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
