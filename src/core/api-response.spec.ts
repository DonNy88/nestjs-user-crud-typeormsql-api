import { HttpStatus } from '@nestjs/common'
import { ApiResponse, isOkResponse } from './api-response'

describe('ApiResponse', () => {
	describe('isOkResponse', () => {
		describe('when the status is not an OK status', () => {
			it.each([[HttpStatus.UNAUTHORIZED], [HttpStatus.FORBIDDEN], [HttpStatus.BAD_REQUEST], [HttpStatus.INTERNAL_SERVER_ERROR]])(
				'should return false',
				(status: HttpStatus) => {
					const response = { status, body: { message: [] } } as ApiResponse<unknown>

					const result = isOkResponse(response)

					expect(result).toBeFalsy()
				}
			)
		})

		describe('when the status is an OK status', () => {
			it.each([
				[HttpStatus.OK],
				[HttpStatus.NO_CONTENT],
				[HttpStatus.ACCEPTED],
				[HttpStatus.CREATED],
				[HttpStatus.NON_AUTHORITATIVE_INFORMATION],
				[HttpStatus.RESET_CONTENT],
				[HttpStatus.PARTIAL_CONTENT]
			])('should return false', (status: HttpStatus) => {
				const response = { status, body: { message: [] } } as ApiResponse<unknown>

				const result = isOkResponse(response)

				expect(result).toBeTruthy()
			})
		})
	})
})
