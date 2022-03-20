import { HttpStatus } from '@nestjs/common'

export type ApiResponse<T> = { status: HttpStatus; body: T }
