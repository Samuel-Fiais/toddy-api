import { SpeedioEndpoint } from "../endpoints/speedio.endpoint";
import { ISpeedioInterface } from "../../../domain/external/speedio.interface";
import { CompanyInfoPresenter } from "../../../usecases/models/presenters/company-info.presenter";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SpeedioImplementation implements ISpeedioInterface {
  buildGetInfoByCNPJ(cnpj: string): string {
    const uri = SpeedioEndpoint.endpoint();
    return `${uri}?cnpj=${cnpj}`;
  }

  async getInfoByCNPJ(cnpj: string): Promise<CompanyInfoPresenter> {
    const url = this.buildGetInfoByCNPJ(cnpj);

    const response = await fetch(url);
    return new CompanyInfoPresenter(await response.json());
  }
}
