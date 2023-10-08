import { Module } from "@nestjs/common";
import { Permissions } from "./permission.enum";

@Module({
  providers: [Permissions],
  exports: [Permissions],
})
export class EnumModule {}
