import { HttpStatus, INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import nocache from 'nocache'
import { AppModule } from './app.module'
import { IncomingMessage, ServerResponse } from 'http'
import { ApiConfigService } from './api-config'

async function bootstrap() {
	const globalPrefix = 'api/v1'
	const port = (process.env.PORT || 3000) as number
	const app = await bootstrapApp(globalPrefix)

	const { isProduction } = app.get(ApiConfigService)

	if (!isProduction) {
		bootstrapSwagger(globalPrefix, port, app)
	}

	await app.listen(port, () => {
		// FIXME: take the url from ENV vars
		Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix)
	})
}

bootstrap()

async function bootstrapApp(globalPrefix: string): Promise<INestApplication> {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.enableShutdownHooks()

	app.use(helmet())

	app.use(nocache())
	app.disable('etag')

	app.use(compression())

	app.enableCors({ origin: '*' })

	app.setGlobalPrefix(globalPrefix)

	const { isProduction } = app.get(ApiConfigService)

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, disableErrorMessages: isProduction, transform: true }))

	app.use(
		morgan('combined', {
			skip: (req: IncomingMessage, res: ServerResponse): boolean => {
				if (isProduction) {
					return res.statusCode < HttpStatus.BAD_REQUEST
				}

				return req.url?.indexOf('/api/v1/health') !== -1
			}
		})
	)

	return app
}

function bootstrapSwagger(globalPrefix: string, port: number, app: INestApplication) {
	const options = new DocumentBuilder()
		.setTitle('API')
		.setDescription('Endpoints')
		.setVersion('1.0.0')
		// FIXME: take the url from ENV vars
		.addServer(`http://localhost:${port}/${globalPrefix}`)
		.build()
	const document = SwaggerModule.createDocument(app, options, { ignoreGlobalPrefix: true })

	SwaggerModule.setup('docs', app, document)
}
