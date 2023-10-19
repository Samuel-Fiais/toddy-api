import { Module } from "@nestjs/common";
import { PermissionsEnum } from "./permission.enum";

@Module({
  providers: [PermissionsEnum],
  exports: [PermissionsEnum],
})
export class EnumModule {}
