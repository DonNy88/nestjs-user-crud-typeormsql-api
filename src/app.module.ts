import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ApiConfigModule, ApiConfigService } from './api-config'
import { HealthModule } from './health'
import { UsersModule } from './users'

@Module({
	imports: [
		HealthModule,
		ApiConfigModule,
		TypeOrmModule.forRootAsync({
			imports: [ApiConfigModule],
			inject: [ApiConfigService],
			useFactory: createTypeOrm
		}),
		UsersModule
	]
})
export class AppModule {}

function createTypeOrm(config: ApiConfigService): TypeOrmModuleOptions {
	const isLocalDevelopment = config.isDevelopment || config.isLocal

	return {
		type: 'postgres',
		port: config.postgresqlPort,
		username: config.postgresqlUser,
		password: config.postgresqlPassword,
		database: config.postgresqlDatabase,
		entities: [__dirname + '/**/*.entity{.ts,.js}'],
		retryAttempts: 10,
		keepConnectionAlive: true,
		synchronize: config.postgresqlSynchronize,
		trace: true,
		debug: isLocalDevelopment,
		logging: isLocalDevelopment,
		extra: { timezone: 'utc' }
	} as TypeOrmModuleOptions
}
