import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { JwtModule as Jwt } from "@nestjs/jwt";
import { PermissionsGuard } from "./permission.guard";

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }, 
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [],
})
export class GuardsModule {}