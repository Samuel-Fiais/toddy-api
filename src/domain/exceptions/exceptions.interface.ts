export interface IException {
  // General exceptions
  applicationBadRequestException();

  applicationExistingRegister(properties: string[]);

  applicationInternalServerErrorException();

  applicationNotFound(entity: string, id?: string)

  applicationOperationCreateRepository(entity: string);

  applicationOperationDeleteRepository(entity: string);

  applicationOperationFindRepository(entity: string);

  applicationOperationUpdateRepository(entity: string);

  applicationValuesRequisitionInvalid(
    entity: string,
    yupErrors: Record<string, string>,
  );

  applicationOperationCreateRepository(entity: string);

  applicationOperationUpdateRepository(entity: string);

  applicationOperationDeleteRepository(entity: string);

  applicationOperationFindRepository(entity: string);

  applicationUnauthorizedException();

  applicationError(error: Error);
}
