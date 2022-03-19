import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'
import { ApiConfigService } from './api-config.service'

const validationSchema: Joi.ObjectSchema = Joi.object({
	NODE_ENV: Joi.string().valid('local', 'development', 'test', 'staging', 'production').default('development'),
	PORT: Joi.number().default(3000),
	POSTGRESQL_USER: Joi.string().required(),
	POSTGRESQL_PASSWORD: Joi.string().length(16).required(),
	POSTGRESQL_DATABASE: Joi.string().required(),
	POSTGRESQL_PORT: Joi.number().required(),
	POSTGRESQL_HOST: Joi.string().required(),
	POSTGRESQL_SYNCHRONIZE: Joi.boolean().default(false)
})

@Module({
	imports: [ConfigModule.forRoot({ validationSchema })],
	exports: [ApiConfigService],
	providers: [ApiConfigService]
})
@Global()
export class ApiConfigModule {}
