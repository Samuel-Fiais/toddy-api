import { Injectable } from "@nestjs/common";
import { ValidationUtils } from "src/infra/common/utils/validation.utils";
import { ILogger } from "src/domain/logger/logger.interface";
import { IException } from "src/domain/exceptions/exceptions.interface";
import { ISupplierRepository } from 'src/domain/repositories/supplier.repository.interface';

@Injectable()
export class DeleteSupplierUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _supplierRepository: ISupplierRepository,
    private readonly _exceptionService: IException,
  ) {}

  async execute(id: string): Promise<boolean> {
    try {
      this._logger.log(
        "RemoveSupplierUseCase remove",
        `Start to remove supplier by id ${id}`,
      );

      const hasErrorValidation = await ValidationUtils.validateIdParam(id);

      if (hasErrorValidation)
        this._exceptionService.applicationValuesRequisitionInvalid(
          "Fornecedor",
          hasErrorValidation,
        );

      const entity = await this._supplierRepository.findById(id);
      if (!entity) this._exceptionService.applicationNotFound("suppliers", id);

      const isEntityRemoved = await this._supplierRepository.delete(id);

      this._logger.log(
        "RemoveSupplierUseCase execute",
        "Removing supplier by id was successful",
      );

      return isEntityRemoved;
    } catch (e) {
      this._logger.error(
        "RemoveSupplierUseCase execute",
        "Error when try to remove a supplier",
      );
      if (e as IException) throw e;
      this._exceptionService.applicationOperationDeleteRepository("Fornecedor");
    }
  }
}
