import { FindConditions, ILike } from 'typeorm'
import { SearchQuery } from '../core'
import { isUnixTime } from '../utils'
import { User } from './user.entity'

export class SearchUserQuery extends SearchQuery {
	toDatabaseWhere(): FindConditions<User>[] {
		if (!this.q?.length) {
			return []
		}

		// TODO: Write a spec file to test this method
		return this.q.reduce((where: FindConditions<User>[], value: string) => {
			const queryLike = ILike(`%${value}%`)
			where.push({ name: queryLike }, { middleName: queryLike }, { surname: queryLike }, { birthPlace: queryLike })

			if (isUnixTime(value)) {
				where.push({ birthDate: new Date(value) })
			}

			return where
		}, [])
	}
}
