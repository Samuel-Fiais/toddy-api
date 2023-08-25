import { Injectable } from '@nestjs/common';
import { SupplierRepository } from 'src/infra/repositories/supplier.repository';
import { Supplier } from '../../domain/entities/supplier.entity';
import { CreateSupplierDTO, UpdateSupplierDTO } from '../models/dtos/supplier.dto';
import { ExceptionService } from 'src/infra/exceptions/exception.service';
import { LoggerService } from 'src/infra/logger/logger.service';
import { ValidationUtils } from 'src/infra/common/utils/validation.utils';
import { updateSupplierSchema } from '../models/schemas/supplier.schemas';

@Injectable()
export class updateSupplierUseCase {
	constructor(protected _logger: LoggerService, private readonly _supplierRepository: SupplierRepository) {}

	async execute(model: UpdateSupplierDTO): Promise<boolean> {
		this._logger.log('updateSupplierUseCase execute', 'Start to update a supplier')
		
		const validation = new ValidationUtils<UpdateSupplierDTO>(updateSupplierSchema)
		const hasError = await validation.validateSchema(model)
		
		if (hasError) new ExceptionService().applicationValuesRequisitionInvalid('Fornecedor', hasError)
		await this.validateSupplierExists(model.id)

		const entity = UpdateSupplierDTO.mapper(model)

		const isSupplierUpdated = await this._supplierRepository.update(entity)

		this._logger.log('updateSupplierUseCase execute', 'Supplier have be updated')

		return isSupplierUpdated
	}

	async validateSupplierExists(id: string) {
		const supplierExists = await this._supplierRepository.findById(id)

		if (!supplierExists) new ExceptionService().applicationNotFound('suppliers', id)
	}
}