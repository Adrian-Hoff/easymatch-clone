import { z } from 'zod'

const signUpFirstSchema = z
  .object({
    name: z
      .string({ required_error: 'Campo obrigatório' })
      .min(3, 'Nome completo inválido')
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
          })
          .join(' ')
      }),
    email: z
      .string({ required_error: 'Campo obrigatório' })
      .email('E-mail inválido')
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: 'Campo obrigatório' })
      .min(6, 'Sua senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string({ required_error: 'Campo obrigatório' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senha não conferem',
    path: ['confirmPassword'],
  })

const signUpSecondSchema = z.object({
  occupation: z.string({ required_error: 'Campo obrigatório' }),
  areasOfExpertise: z.string({ required_error: 'Campo obrigatório' }),
  agreements: z.string().optional(),
})

const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email('E-mail inválido'),
})

const addSurgerySchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório' }),
  areasOfExpertise: z.string({ required_error: 'Campo obrigatório' }),
  place: z.string({ required_error: 'Campo obrigatório' }),
  date: z.coerce.date({ required_error: 'Campo obrigatório' }),
  time: z.coerce.date({ required_error: 'Campo obrigatório' }),
})

export {
  signUpFirstSchema,
  signUpSecondSchema,
  forgotPasswordSchema,
  addSurgerySchema,
}
