import * as yup from 'yup';

export const createSupplierSchema: yup.Schema = yup.object({
	document: yup
		.string()
		.matches(/^\d{14}$/, "O campo 'document' deve ser um CNPJ com 14 dígitos.")
		.required("O campo 'documento' é obrigatório."),

	tradeName: yup
		.string().required("O campo 'tradeName' é obrigatório.").min(4, "O campo 'tradeName' deve ter mais de 3 caracteres."),
	
	companyName: yup
		.string().required("O campo 'companyName' é obrigatório.").min(4, "O campo 'companyName' deve ter mais de 3 caracteres."),

	phone: yup
		.string()
		.matches(/^[1-9]{1}\d{10}$/, "O campo 'phone' deve ser um número de Telefone válido.")
		.required("O campo 'phone' é obrigatório."),
	
	email: yup
		.string()
		.email("O campo 'email' deve ser um email válido.")
		.required("O campo 'email' é obrigatório."),
})

export const updateSupplierSchema: yup.Schema = yup.object({
	id: yup
		.string()
		.uuid("O campo 'id' deve ser um UUID válido")
		.required("O campo 'id' é obrigatório."),
				
	document: yup
		.string()
		.matches(/^\d{14}$/, "O campo 'document' deve ser um CNPJ com 14 dígitos.")
		.required("O campo 'documento' é obrigatório."),

	tradeName: yup
		.string().required("O campo 'tradeName' é obrigatório.").min(4, "O campo 'tradeName' deve ter mais de 3 caracteres."),
	
	companyName: yup
		.string().required("O campo 'companyName' é obrigatório.").min(4, "O campo 'companyName' deve ter mais de 3 caracteres."),

	phone: yup
		.string()
		.matches(/^[1-9]{1}\d{10}$/, "O campo 'phone' deve ser um número de Telefone válido.")
		.required("O campo 'phone' é obrigatório."),
	
	email: yup
		.string()
		.email("O campo 'email' deve ser um email válido.")
		.required("O campo 'email' é obrigatório."),
})