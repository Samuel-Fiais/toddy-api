import { Injectable } from "@nestjs/common";
import { SupplierRepository } from "src/infra/repositories/supplier.repository";
import { SupplierPresenter } from "../models/presenters/supplier.presenter";
import { ILogger } from "src/domain/logger/logger.interface";
import { IException } from "src/domain/exceptions/exceptions.interface";

@Injectable()
export class GetAllSupplierUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _supplierRepository: SupplierRepository,
    private readonly _exceptionService: IException,
  ) {}

  async execute(): Promise<SupplierPresenter[]> {
    try {
      this._logger.log(
        "GetAllSupplierUseCase execute",
        "Start to find all supplier",
      );

      const entities = await this._supplierRepository.findAll();
      let presenters = SupplierPresenter.mapperArray(entities).sort((a, b) =>
        a.alternateId > b.alternateId ? 1 : -1,
      );

      if (!(presenters.length > 0))
        this._exceptionService.applicationNotFound("suppliers");

      this._logger.log(
        "GetAllSupplierUseCase execute",
        "Searching all suppliers was successful",
      );

      return presenters;
    } catch (e) {
      this._logger.error(
        "GetAllSupplierUseCase execute",
        "Error when try to find all suppliers",
      );
      if (e as IException) throw e;
      this._exceptionService.applicationOperationFindRepository("Fornecedor");
    }
  }
}
