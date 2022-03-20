import { HttpStatus } from '@nestjs/common'

export type OkStatusCode =
	| HttpStatus.OK
	| HttpStatus.NO_CONTENT
	| HttpStatus.ACCEPTED
	| HttpStatus.CREATED
	| HttpStatus.NON_AUTHORITATIVE_INFORMATION
	| HttpStatus.RESET_CONTENT
	| HttpStatus.PARTIAL_CONTENT

export type OkApiResponse<T> = { status: OkStatusCode; body: T }
export type FailApiResponse = { status: Exclude<HttpStatus, OkStatusCode>; body: { message: string[] } }
export type ApiResponse<T> = OkApiResponse<T> | FailApiResponse
export function isOkResponse<T>(response: ApiResponse<T>): response is OkApiResponse<T> {
	return [
		HttpStatus.OK,
		HttpStatus.NO_CONTENT,
		HttpStatus.ACCEPTED,
		HttpStatus.CREATED,
		HttpStatus.NON_AUTHORITATIVE_INFORMATION,
		HttpStatus.RESET_CONTENT,
		HttpStatus.PARTIAL_CONTENT
	].includes(response.status)
}
