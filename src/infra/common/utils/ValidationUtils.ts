import * as yup from 'yup';

export class ValidationUtils<T> {
	private schema: yup.Schema<T>;
  
	constructor(schema: yup.Schema<T>) {
		this.schema = schema;
	}
  
	validateSchema = async (model: T) => {
		try {
			await this.schema.validate(model, { abortEarly: false, strict: true });
			return false;
		} catch (e) {
			const yupError = e as yup.ValidationError;
			const validationErrors: Record<string, string> = {};
	
			yupError.inner.forEach((error) => {
				if (error.path === undefined) return;
				validationErrors[error.path] = error.message;
			});
  
			return validationErrors;
		}
	}

	static validateIdParam = async (id: string) => {
		const schemaId: yup.Schema = yup.object({
			id: yup
				.string()
				.uuid()
				.required("The 'id' param is required."),	
		});

		const objectId = {
			id: id
		};
		const validation = new ValidationUtils<{id: string}>(schemaId)

		return await validation.validateSchema(objectId);
	}
}
