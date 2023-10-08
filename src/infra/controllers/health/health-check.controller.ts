import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("healthCheck")
@ApiTags("healthCheck")
export class HealthCheckController {
  @Get()
  async healthCheck() {
    return {
      message: `Health Check: ${new Date()}`,
    };
  }
}
