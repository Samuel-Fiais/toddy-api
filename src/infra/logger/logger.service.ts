import { Injectable, Logger } from "@nestjs/common"
import { ILogger } from "src/domain/logger/logger.interface"

@Injectable()
export class LoggerService extends Logger implements ILogger {
	log(context: string, message: string) {
		super.log(`[INFO] ${message}`, context)
	}
	
	error(context: string, message: string, trace?: string) {
		super.error(`[ERROR] ${message}`, trace, context)
	}
	
	warn(context: string, message: string) {
		super.warn(`[WARN] ${message}`, context)
	}
}