import * as yup from 'yup'

export const createSupplierSchema: yup.Schema = yup.object({
	document: yup
		.string()
		.matches(/^\d{14}$/, "O campo DOCUMENTO deve ser um CNPJ com 14 dígitos.\n")
		.required("O campo DOCUMENTO é obrigatório.\n"),

	tradeName: yup
		.string().required("O campo NOME FANTASIA é obrigatório.\n").min(4, "O campo NOME FANTASIA deve ter mais de 3 caracteres.\n"),
	
	companyName: yup
		.string().required("O campo RAZÃO SOCIAL é obrigatório.\n").min(4, "O campo RAZÃO SOCIAL deve ter mais de 3 caracteres.\n"),

	phone: yup
		.string()
		.matches(/^[1-9]\d{9,10}$/, "O campo TELEFONE deve ser um número de Telefone ou Celular válido.\n")
		.required("O campo TELEFONE é obrigatório.\n"),	
	
	email: yup
		.string()
		.email("O campo EMAIL deve ser um email válido.\n")
		.required("O campo EMAIL é obrigatório.\n"),
})

export const updateSupplierSchema: yup.Schema = yup.object({
	id: yup
		.string()
		.uuid("O campo ID deve ser um UUID válido")
		.required("O campo ID é obrigatório.\n"),
				
	document: yup
		.string()
		.matches(/^\d{14}$/, "O campo DOCUMENTO deve ser um CNPJ com 14 dígitos.\n")
		.required("O campo DOCUMENTO é obrigatório.\n"),

	tradeName: yup
		.string().required("O campo NOME FANTASIA é obrigatório.\n").min(4, "O campo NOME FANTASIA deve ter mais de 3 caracteres.\n"),
	
	companyName: yup
		.string().required("O campo RAZÃO SOCIAL é obrigatório.\n").min(4, "O campo RAZÃO SOCIAL deve ter mais de 3 caracteres.\n"),

	phone: yup
		.string()
		.matches(/^[1-8]{1}\d{10}$/, "O campo TELEFONE deve ser um número de Telefone válido.\n")
		.required("O campo TELEFONE é obrigatório.\n"),
	
	email: yup
		.string()
		.email("O campo EMAIL deve ser um email válido.\n")
		.required("O campo EMAIL é obrigatório.\n"),
})