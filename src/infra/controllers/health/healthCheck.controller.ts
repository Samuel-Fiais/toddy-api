import { Controller, Get } from "@nestjs/common";

@Controller('healthCheck')
export class HealthCheckController {

	@Get()
	async healthCheck() {
		return {
			message: `Health Check: ${new Date()}`
		}
	}
}