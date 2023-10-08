import { Injectable } from "@nestjs/common";
import { SupplierRepository } from "src/infra/repositories/supplier.repository";
import { ExceptionService } from "src/infra/exceptions/exception.service";
import { ValidationUtils } from "src/infra/common/utils/validation.utils";
import { SupplierPresenter } from "../models/presenters/supplier.presenter";
import { ILogger } from "src/domain/logger/logger.interface";
import { IException } from "src/domain/exceptions/exceptions.interface";

@Injectable()
export class GetByIdSupplierUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _supplierRepository: SupplierRepository,
    private readonly _exceptionService: IException,
  ) {}

  async execute(id: string): Promise<SupplierPresenter> {
    try {
      this._logger.log(
        "GetByIdSupplierUseCase execute",
        `Start to find supplier by id ${id}`,
      );

      const hasErrorValidation = await ValidationUtils.validateIdParam(id);

      if (hasErrorValidation)
        new ExceptionService().applicationValuesRequisitionInvalid(
          "Fornecedor",
          hasErrorValidation,
        );

      const entity = await this._supplierRepository.findById(id, ["products"]);
      if (!entity) this._exceptionService.applicationNotFound("suppliers", id);

      const presenter = SupplierPresenter.mapper(entity);

      this._logger.log(
        "GetByIdSupplierUseCase execute",
        "Searching supplier by id was successful",
      );

      return presenter;
    } catch (e) {
      this._logger.error(
        "GetByIdSupplierUseCase execute",
        "Error when try to find a supplier by id",
      );
      if (e as IException) throw e;
      this._exceptionService.applicationOperationFindRepository("Fornecedor");
    }
  }
}
