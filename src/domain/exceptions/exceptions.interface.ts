export interface IException {
	// General exceptions
	applicationBadRequestException(): void
	applicationInternalServerErrorExceprion(): void
	applicationNotFound(entity: string): void
	applicationExistingRegister(properties: string[])
	applicationValuesRequisitionInvalid(entity: string, yupErrors: Record<string, string>)

	applicationOperationCreateRepository(entity: string)
	// applicationOperationUpdateRepository(entity: string)
	// applicationOperationDeleteRepository(entity: string)
	applicationOperationFindRepository(entity: string)
}