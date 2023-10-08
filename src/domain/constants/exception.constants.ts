export class ExceptionMessages {
  static readonly BAD_REQUEST: string = "Requisição Inválida";
  static readonly INTERNAL_SERVER_ERROR: string = "Erro Interno do Servidor";
  static readonly NOT_FOUND: string = "Nenhum Registro Encontrado";
  static readonly OPERATION_CREATE_REPOSITORY: string =
    "Erro ao Criar Registro";
  static readonly OPERATION_UPDATE_REPOSITORY: string =
    "Erro ao Atualizar Registro";
  static readonly OPERATION_DELETE_REPOSITORY: string =
    "Erro ao Deletar Registro";
  static readonly OPERATION_FIND_REPOSITORY: string = "Erro ao Buscar Registro";
  static readonly EXISTING_REGISTER: string = "Registro já existente";
  static readonly VALUES_REQUISITION_INVALID: string =
    "Valores da Requisição Inválidos";
  static readonly UNAUTHORIZED: string = "Não Autorizado";
}

export class ExceptionCodes {
  static readonly BAD_REQUEST = 400;
  static readonly UNAUTHORIZED = 401;
  static readonly FORBIDDEN = 403;
  static readonly NOT_FOUND = 404;
  static readonly METHOD_NOT_ALLOWED = 405;
  static readonly CONFLICT = 409;
  static readonly GONE = 410;
  static readonly LENGTH_REQUIRED = 411;
  static readonly PRECONDITION_FAILED = 412;
  static readonly PAYLOAD_TOO_LARGE = 413;
  static readonly UNSUPPORTED_MEDIA_TYPE = 415;
  static readonly UNPROCESSABLE_ENTITY = 422;
  static readonly TOO_MANY_REQUESTS = 429;
  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly NOT_IMPLEMENTED = 501;
  static readonly BAD_GATEWAY = 502;
  static readonly SERVICE_UNAVAILABLE = 503;
  static readonly GATEWAY_TIMEOUT = 504;
  static readonly HTTP_VERSION_NOT_SUPPORTED = 505;
}
