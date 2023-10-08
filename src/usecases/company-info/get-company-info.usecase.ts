import { Injectable } from "@nestjs/common";
import { ISpeedioInterface } from "src/domain/external/speedio.interface";
import { ILogger } from "src/domain/logger/logger.interface";

@Injectable()
export class GetCompanyInfoUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _speedio: ISpeedioInterface,
  ) {}

  async execute(cnpj: string) {
    this._logger.log("GetCompanyInfoUseCase execute", "Start to find a cnpj");

    const cnpjFormatted = cnpj.replace(/[^\d]+/g, "");
    const data = await this._speedio.getInfoByCNPJ(cnpjFormatted);

    this._logger.log(
      "GetCompanyInfoUseCase execute",
      `Searching cnpj ${cnpjFormatted} was successful`,
    );

    return data;
  }
}
