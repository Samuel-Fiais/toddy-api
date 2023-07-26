import { Injectable } from '@nestjs/common';
import { SupplierRepository } from 'src/infra/repositories/supplier.repository';
import { ExceptionService } from 'src/infra/exceptions/exception.service';
import { LoggerService } from 'src/infra/logger/logger.service';
import { GetSupplierPresenter } from './supplier.presenter';
import { ValidationUtils } from 'src/infra/common/utils/validation.utils';

@Injectable()
export class getByIdSupplierUseCase {
	constructor(protected _logger: LoggerService, private readonly _supplierRepository: SupplierRepository) {}

	async execute(id: string): Promise<GetSupplierPresenter> {
		this._logger.log('getByIdSupplierUseCase execute', 'Start to find supplier by id')

		const hasErrorValidation = await ValidationUtils.validateIdParam(id)
		
		if (hasErrorValidation) new ExceptionService().applicationValuesRequisitionInvalid('Fornecedor', hasErrorValidation)

		const entity = await this._supplierRepository.findById(id)
		if (!entity) new ExceptionService().applicationNotFound('suppliers', id)
		
		const presenter = GetSupplierPresenter.mapper(entity)

		this._logger.log('getByIdSupplierUseCase execute', 'Searching supplier by id was successful')

		return presenter
	}
}