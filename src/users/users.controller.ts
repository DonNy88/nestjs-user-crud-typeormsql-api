import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { CreateUserRequest } from './create-user-request.dto'
import { CreateUserResponse } from './create-user-response.dto'
import { UserCrud } from './users-crud.service'

@ApiTags('Users')
@Controller()
@ApiBadRequestResponse({ description: 'If the request is incorrect and/or incomplete' })
export class UsersController {
	constructor(private readonly crud: UserCrud) {}

	@Post()
	@ApiOkResponse({ type: CreateUserResponse, description: 'Return the entity found on the system' })
	@ApiCreatedResponse({ type: CreateUserResponse, description: 'Return the entity just saved on the system' })
	async createUser(@Body() user: CreateUserRequest, @Res() response: Response) {
		const { status, body } = await this.crud.save(user)
		return response.status(status).send(body)
	}
}
