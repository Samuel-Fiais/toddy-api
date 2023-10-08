import { Injectable } from "@nestjs/common";
import { SupplierRepository } from "src/infra/repositories/supplier.repository";
import { Supplier } from "../../domain/entities/supplier.entity";
import { CreateSupplierDTO } from "../models/dtos/supplier.dto";
import { ValidationUtils } from "src/infra/common/utils/validation.utils";
import { createSupplierSchema } from "../models/schemas/supplier.schemas";
import { ILogger } from "../../domain/logger/logger.interface";
import { IException } from "src/domain/exceptions/exceptions.interface";

@Injectable()
export class CreateSupplierUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _supplierRepository: SupplierRepository,
    private readonly _exceptionService: IException,
  ) {}

  async execute(model: CreateSupplierDTO): Promise<Supplier> {
    try {
      this._logger.log(
        "CreateSupplierUseCase execute",
        "Start to create a new supplier",
      );

      const validation = new ValidationUtils<CreateSupplierDTO>(
        createSupplierSchema,
      );
      const hasError = await validation.validateSchema(model);

      if (hasError)
        this._exceptionService.applicationValuesRequisitionInvalid(
          "Fornecedor",
          hasError,
        );

      await this._validateSupplierExists(model.document);

      const entity = CreateSupplierDTO.mapper(model);
      const supplierInserted = await this._supplierRepository.create(entity);

      this._logger.log(
        "CreateSupplierUseCase execute",
        `New supplier have be inserted - ID ${supplierInserted.id}`,
      );

      return supplierInserted;
    } catch (e) {
      this._logger.error(
        "CreateSupplierUseCase execute",
        "Error when try to create a new supplier",
      );
      if (e as IException) throw e;
      this._exceptionService.applicationOperationCreateRepository("Fornecedor");
    }
  }

  private async _validateSupplierExists(document: string) {
    const supplierExists = await this._supplierRepository.find(
      (f) => f.document == document,
    );

    if (supplierExists.length > 0) {
      this._logger.warn(
        "CreateSupplierUseCase execute",
        `Supplier with this document (${document}) already exists`,
      );
      this._exceptionService.applicationExistingRegister(["Documento"]);
    }
  }
}
