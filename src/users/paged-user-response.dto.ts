import { ApiProperty } from '@nestjs/swagger'
import { PagedResponseAdapter } from '../core'
import { UserResponse } from './user-response.dto'

export class PagedUserResponse extends PagedResponseAdapter<UserResponse> {
	@ApiProperty({ type: UserResponse, isArray: true, description: 'The page of users' })
	results: UserResponse[]
}
