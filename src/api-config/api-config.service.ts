import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ApiConfigService {
	constructor(private readonly config: ConfigService) {}

	private get nodeEnvironment(): string {
		const nodeEnv = this.config.get<string>('NODE_ENV') as string
		return nodeEnv || 'development'
	}

	get isProduction(): boolean {
		return this.nodeEnvironment === 'production'
	}

	get isDevelopment(): boolean {
		return this.nodeEnvironment === 'development'
	}

	get isTest(): boolean {
		return this.nodeEnvironment === 'test'
	}

	get isStaging(): boolean {
		return this.nodeEnvironment === 'staging'
	}

	get isLocal(): boolean {
		return this.nodeEnvironment === 'local'
	}

	get port(): number {
		return this.config.get<number>('PORT') as number
	}

	get postgresqlUser(): string {
		return this.config.get<string>('POSTGRESQL_USER') as string
	}

	get postgresqlPassword(): string {
		return this.config.get<string>('POSTGRESQL_PASSWORD') as string
	}

	get postgresqlDatabase(): string {
		return this.config.get<string>('POSTGRESQL_DATABASE') as string
	}

	get postgresqlPort(): number {
		return this.config.get<number>('POSTGRESQL_PORT') as number
	}

	get postgresqlHost(): string {
		return this.config.get<string>('POSTGRESQL_HOST') as string
	}

	get postgresqlSynchronize(): boolean {
		return this.config.get<boolean>('POSTGRESQL_SYNCHRONIZE') as boolean
	}
}
