import * as z from "zod"

const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    
})

const PasswordValidationSchema = z.string()
.refine((val)=> /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(val), {
    message: "Password must contain at least 8 characters, including uppercase, lowercase, number and special character",
})

const RegisterFormSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "first name can't be too short" })
      .max(20, { message: "first name can't be too long" }),
    lastName: z
      .string()
      .min(3, { message: "last name can't be too short" })
      .max(20, { message: "first name can't be too long" }),
    email: z
      .string()
      .email({ message: "Invalid email, please input valid email" }),
    password: PasswordValidationSchema,
    confirmPassword: PasswordValidationSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export { RegisterFormSchema, LoginSchema, PasswordValidationSchema };