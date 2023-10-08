import {CompanyInfoPresenter} from "../../usecases/models/presenters/company-info.presenter";

export interface ISpeedioInterface {
    getInfoByCNPJ: (cnpj: string) => Promise<CompanyInfoPresenter>
}