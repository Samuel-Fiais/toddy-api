import { Injectable } from '@nestjs/common';
import { SupplierRepository } from 'src/infra/repositories/supplier.repository';
import { ExceptionService } from 'src/infra/exceptions/exception.service';
import { LoggerService } from 'src/infra/logger/logger.service';
import { ValidationUtils } from 'src/infra/common/utils/ValidationUtils';
import { GetSupplierPresenter } from '../supplier.presenter';

@Injectable()
export class getAllSupplierUseCase {
	constructor(protected _logger: LoggerService, private readonly _supplierRepository: SupplierRepository) {}

	async execute(): Promise<GetSupplierPresenter[]> {
		this._logger.log('getAllSupplierUseCase execute', 'Start to find all supplier')

		const entities = await this._supplierRepository.findAll()
		const presenter = GetSupplierPresenter.convertList(entities)

		if (!(presenter.length > 0)) throw new ExceptionService().applicationNotFound('suppliers')

		this._logger.log('getAllSupplierUseCase execute', 'Searching all suppliers was successful')

		return presenter
	}
}