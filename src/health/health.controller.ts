import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HealthCheck, HealthCheckResult, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus'

@ApiTags('Health')
@Controller('health')
export class HealthController {
	constructor(private readonly healthCheckService: HealthCheckService, private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator) {}

	@Get('readiness')
	@HealthCheck()
	readiness(): Promise<HealthCheckResult> {
		return this.healthCheck()
	}

	@Get('liveness')
	@HealthCheck()
	liveness(): Promise<HealthCheckResult> {
		return this.healthCheck()
	}

	private healthCheck(): Promise<HealthCheckResult> {
		return this.healthCheckService.check([() => this.typeOrmHealthIndicator.pingCheck('database', { timeout: 1500 })])
	}
}
