import { Injectable } from '@nestjs/common';
import { SupplierRepository } from 'src/infra/repositories/supplier.repository';
import { ExceptionService } from 'src/infra/exceptions/exception.service';
import { LoggerService } from 'src/infra/logger/logger.service';
import { ValidationUtils } from 'src/infra/common/utils/validation.utils';

@Injectable()
export class DeleteSupplierUseCase {
	constructor(protected _logger: LoggerService, private readonly _supplierRepository: SupplierRepository) {}

	async execute(id: string): Promise<boolean> {
		this._logger.log('RemoveSupplierUseCase remove', 'Start to remove supplier by id')

		const hasErrorValidation = await ValidationUtils.validateIdParam(id)
		
		if (hasErrorValidation) new ExceptionService().applicationValuesRequisitionInvalid('Fornecedor', hasErrorValidation)

		const entity = await this._supplierRepository.findById(id)
		if (!entity) new ExceptionService().applicationNotFound('suppliers', id)
		
		const isEntityRemoved = await this._supplierRepository.delete(id)

		this._logger.log('RemoveSupplierUseCase execute', 'Removing supplier by id was successful')

		return isEntityRemoved
	}
}