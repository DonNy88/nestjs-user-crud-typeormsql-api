import { FindConditions, ILike } from 'typeorm'
import { SearchQuery } from '../core'
import { isIso8601Format } from '../utils'
import { User } from './user.entity'

export class SearchUserQuery extends SearchQuery {
	toDatabaseWhere(): FindConditions<User>[] {
		if (!this.q?.length) {
			return []
		}

		return this.q.reduce((where: FindConditions<User>[], value: string) => {
			const queryLike = ILike(`%${value}%`)
			where.push({ name: queryLike }, { middleName: queryLike }, { surname: queryLike }, { birthPlace: queryLike })

			if (isIso8601Format(value)) {
				where.push({ birthDate: new Date(value) })
			}

			return where
		}, [])
	}
}
