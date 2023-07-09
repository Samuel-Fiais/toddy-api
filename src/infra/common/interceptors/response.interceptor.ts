import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Observable, map } from "rxjs"

export class ResponseFormat<T> {
	data: T
	method: string
	duration: string
	path: string
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
	intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseFormat<T>> {
		const now = Date.now()
		const httpContext = context.switchToHttp()
		const request = httpContext.getRequest()

		return next.handle().pipe(
			map((data) => ({
				data,
				method: request.method,
				duration: `${Date.now() - now}ms`,
				path: request.path
			}))
		)
	}
}