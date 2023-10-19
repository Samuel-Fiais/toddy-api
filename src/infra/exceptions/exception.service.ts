import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { ExceptionMessages } from "src/domain/constants/exception.constants";
import { IException } from "src/domain/exceptions/exceptions.interface";

@Injectable()
export class ExceptionService implements IException {
  applicationBadRequestException(): void {
    throw new BadRequestException(ExceptionMessages.BAD_REQUEST);
  }

  applicationInternalServerErrorException(): void {
    throw new InternalServerErrorException(
      ExceptionMessages.INTERNAL_SERVER_ERROR,
    );
  }

  applicationNotFound(entity: string, id: string = "all"): void {
    throw new NotFoundException(
      `${ExceptionMessages.NOT_FOUND} : ${entity} : ${id}`,
    );
  }

  applicationError(error: Error) {
    throw new InternalServerErrorException(error.message);
  }

  applicationExistingRegister(properties: string[]) {
    throw new ConflictException(
      `${ExceptionMessages.EXISTING_REGISTER} : ${properties.join(", ")}`,
    );
  }

  applicationValuesRequisitionInvalid(
    entity: string,
    yupErrors: Record<string, string>,
  ) {
    const yupErrorsString = Object.values(yupErrors).join(" ");
    throw new BadRequestException(
      `${ExceptionMessages.VALUES_REQUISITION_INVALID} : ${entity} : ${yupErrorsString}`,
    );
  }

  applicationOperationCreateRepository(entity: string) {
    throw new InternalServerErrorException(
      `${ExceptionMessages.OPERATION_CREATE_REPOSITORY} : ${entity}`,
    );
  }

  applicationOperationUpdateRepository(entity: string) {
    throw new InternalServerErrorException(
      `${ExceptionMessages.OPERATION_UPDATE_REPOSITORY} : ${entity}`,
    );
  }

  applicationOperationDeleteRepository(entity: string) {
    throw new InternalServerErrorException(
      `${ExceptionMessages.OPERATION_DELETE_REPOSITORY} : ${entity}`,
    );
  }

  applicationOperationFindRepository(entity: string) {
    throw new InternalServerErrorException(
      `${ExceptionMessages.OPERATION_FIND_REPOSITORY} : ${entity}`,
    );
  }

  applicationUnauthorizedException() {
    throw new BadRequestException(ExceptionMessages.UNAUTHORIZED);
  }
}
