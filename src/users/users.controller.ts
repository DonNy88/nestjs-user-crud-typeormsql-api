import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { CreateUserRequest } from './create-user-request.dto'
import { IdParam } from './id-param.dto'
import { UserResponse } from './user-response.dto'
import { UserCrud } from './users-crud.service'

@ApiTags('Users')
@Controller()
@ApiBadRequestResponse({ description: 'If the request is incorrect and/or incomplete' })
export class UsersController {
	constructor(private readonly crud: UserCrud) {}

	@Post()
	@ApiOkResponse({ type: UserResponse, description: 'Return the entity found on the system' })
	@ApiCreatedResponse({ type: UserResponse, description: 'Return the entity just saved on the system' })
	async createUser(@Body() user: CreateUserRequest, @Res() response: Response) {
		const { status, body } = await this.crud.save(user)
		return response.status(status).send(body)
	}

	@Get(':id')
	@ApiOkResponse({ type: UserResponse, description: 'Return the entity found on the system' })
	@ApiNotFoundResponse({ description: 'If there are no user with the given id' })
	async readUser(@Param() { id }: IdParam, @Res() response: Response) {
		const { status, body } = await this.crud.readById(id)
		return response.status(status).send(body)
	}
}
