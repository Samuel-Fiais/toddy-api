import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Permission } from "src/infra/common/decorators/permission.decorator";
import { PermissionsEnum } from "src/infra/enums/permission.enum";

@Controller("healthCheck")
@ApiTags("healthCheck")
export class HealthCheckController {

  @Permission(PermissionsEnum.NONE)
  @Get()
  async healthCheck() {
    return {
      message: `Health Check: ${new Date()}`,
    };
  }
}
