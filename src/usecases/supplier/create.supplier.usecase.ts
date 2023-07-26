import { Injectable } from '@nestjs/common';
import { SupplierRepository } from 'src/infra/repositories/supplier.repository';
import { Supplier } from '../../domain/entities/supplier.entity';
import { CreateSupplierDTO } from './supplier.dto';
import { ExceptionService } from 'src/infra/exceptions/exception.service';
import { LoggerService } from 'src/infra/logger/logger.service';
import { ValidationUtils } from 'src/infra/common/utils/validation.utils';
import { createSupplierSchema } from './supplier.schemas';

@Injectable()
export class createSupplierUseCase {
	constructor(protected _logger: LoggerService, private readonly _supplierRepository: SupplierRepository) {}

	async execute(model: CreateSupplierDTO): Promise<Supplier> {
		this._logger.log('createSupplierUseCase execute', 'Start to create a new supplier')

		const validation = await new ValidationUtils<CreateSupplierDTO>(createSupplierSchema)
		const hasError = await validation.validateSchema(model)

		if (hasError) new ExceptionService().applicationValuesRequisitionInvalid('Fornecedor', hasError)
		
		await this.validateSupplierExists(model.document)

		const entity = CreateSupplierDTO.mapper(model)
		const supplierInserted = await this._supplierRepository.create(entity)

		this._logger.log('createSupplierUseCase execute', 'New supplier have be inserted')

		return supplierInserted
	}

	async validateSupplierExists(document: string) {
		const supplierExists = await this._supplierRepository.find(f => f.document == document)

		if (supplierExists.length > 0) {
			this._logger.warn('createSupplierUseCase execute', 'Supplier with this document already exists')
			new ExceptionService().applicationExistingRegister(['Documento'])
		}
	}
}