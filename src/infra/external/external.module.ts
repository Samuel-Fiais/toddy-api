import { Module } from "@nestjs/common";
import { SpeedioImplementation } from "./implementations/speedio.implementation";

@Module({
  providers: [SpeedioImplementation],
  exports: [SpeedioImplementation],
})
export class ExternalModule {}
