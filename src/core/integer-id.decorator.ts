import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator'
import { stringToNumber } from '../utils'

export function IntegerId(required = true): (targetClass: unknown, propertyKey: string, descriptor?: TypedPropertyDescriptor<() => void>) => void {
	return applyDecorators(required ? IsNotEmpty() : IsOptional(), IsInt(), Min(1), Transform(stringToNumber) as PropertyDecorator)
}
