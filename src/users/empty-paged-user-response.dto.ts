import { ApiProperty } from '@nestjs/swagger'
import { PagedResponse } from '../core'
import { UserResponse } from './user-response.dto'

export class EmptyPagedUserResponse implements PagedResponse<UserResponse> {
	@ApiProperty({ description: 'The total number of results in the filtered, un-paged dataset', example: 0 })
	count: number

	@ApiProperty({ type: UserResponse, isArray: true, description: 'The page of users', example: [] })
	results: UserResponse[]
}
