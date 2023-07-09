import { Injectable } from "@nestjs/common";
import { ExceptionMessages, ExceptionCodes } from "src/domain/constants/exception.constants";
import { IException } from "src/domain/exceptions/exceptions.interface";

@Injectable()
export class ExceptionService implements IException {
	applicationBadRequestException(): void {
		throw { message: ExceptionMessages.BAD_REQUEST }
	}

	applicationInternalServerErrorExceprion(): void {
		throw { message: ExceptionMessages.INTERNAL_SERVER_ERROR }
	}

	applicationNotFound(entity: string, id: string = 'all'): void {
		throw { message: `${ExceptionMessages.NOT_FOUND} : ${entity} : ${id}` }
	}

	applicationError(error: Error) {
		throw { message: error.message }
	}
	
	applicationExistingRegister(properties: string[]) {
		throw { message: `${ExceptionMessages.EXISTING_REGISTER} : ${properties.join(', ')}` }
	}
	
	applicationValuesRequisitionInvalid(entity: string, yupErrors: Record<string, string>) {
		const yupErrorsString = Object.values(yupErrors).join(' ')
		throw { message: `${ExceptionMessages.VALUES_REQUISITION_INVALID} : ${entity} : ${yupErrorsString}` }
	}

	applicationOperationCreateRepository(entity: string) {
		throw { message: `${ExceptionMessages.OPERATION_CREATE_REPOSITORY} : ${entity}` }
	}

	applicationOperationFindRepository(entity: string) {
		throw { message: `${ExceptionMessages.OPERATION_FIND_REPOSITORY} : ${entity}` }
	}
}
