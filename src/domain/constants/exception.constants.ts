export class ExceptionMessages {
	static readonly BAD_REQUEST: string = 'Requisição Inválida'
	static readonly INTERNAL_SERVER_ERROR: string = 'Erro Interno do Servidor'
	static readonly NOT_FOUND: string = 'Nenhum Registro Encontrado'
	static readonly OPERATION_CREATE_REPOSITORY: string = 'Erro ao Criar Registro'
	static readonly OPERATION_UPDATE_REPOSITORY: string = 'Erro ao Atualizar Registro'
	static readonly OPERATION_DELETE_REPOSITORY: string = 'Erro ao Deletar Registro'
	static readonly OPERATION_FIND_REPOSITORY: string = 'Erro ao Buscar Registro'
	static readonly EXISTING_REGISTER: string = 'Registro já existente'
	static readonly VALUES_REQUISITION_INVALID: string = 'Valores da Requisição Inválidos'
}

export class ExceptionCodes {
	static readonly BAD_REQUEST = 400
	static readonly INTERNAL_SERVER_ERROR = 500
	static readonly NOT_FOUND = 404
}