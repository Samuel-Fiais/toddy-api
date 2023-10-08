import { Injectable } from "@nestjs/common";
import { SupplierRepository } from "src/infra/repositories/supplier.repository";
import { UpdateSupplierDTO } from "../models/dtos/supplier.dto";
import { ValidationUtils } from "src/infra/common/utils/validation.utils";
import { updateSupplierSchema } from "../models/schemas/supplier.schemas";
import { ILogger } from "src/domain/logger/logger.interface";
import { IException } from "src/domain/exceptions/exceptions.interface";

@Injectable()
export class UpdateSupplierUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _supplierRepository: SupplierRepository,
    private readonly _exceptionService: IException,
  ) {}

  async execute(model: UpdateSupplierDTO): Promise<boolean> {
    try {
      this._logger.log(
        "UpdateSupplierUseCase execute",
        `Start to update a supplier by id ${model.id}`,
      );

      const validation = new ValidationUtils<UpdateSupplierDTO>(
        updateSupplierSchema,
      );
      const hasError = await validation.validateSchema(model);

      if (hasError)
        this._exceptionService.applicationValuesRequisitionInvalid(
          "Fornecedor",
          hasError,
        );
      await this._validateSupplierExists(model.id);
      const entity = UpdateSupplierDTO.mapper(model);
      const isSupplierUpdated = await this._supplierRepository.update(entity);

      this._logger.log(
        "UpdateSupplierUseCase execute",
        "Supplier have be updated",
      );

      return isSupplierUpdated;
    } catch (e) {
      this._logger.error(
        "UpdateSupplierUseCase execute",
        "Error when try to update a supplier",
      );
      if (e as IException) throw e;
      this._exceptionService.applicationOperationUpdateRepository("Fornecedor");
    }
  }

  async _validateSupplierExists(id: string) {
    const supplierExists = await this._supplierRepository.findById(id);

    if (!supplierExists)
      this._exceptionService.applicationNotFound("suppliers", id);
  }
}
