import * as yup from "yup"

export const createUserSchema: yup.Schema = yup.object({
  username: yup
    .string()
    .required("O campo USUÁRIO é obrigatório.\n")
    .min(4, "O campo USUÁRIO deve ter mais de 3 caracteres.\n"),

  email: yup
    .string()
    .email("O campo EMAIL deve ser um email válido.\n")
    .required("O campo EMAIL é obrigatório.\n"),

  password: yup
    .string()
    .required("O campo SENHA é obrigatório.\n")
    .min(8, "O campo SENHA deve ter mais de 7 caracteres.\n"),
})