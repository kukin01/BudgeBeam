import { z } from 'zod';

export const SignupSchema = z.object({
    firstname: z.string().min(2, { message: 'First name must be at least 2 characters long' }),
    lastname: z.string().min(2, { message: 'Last name must be at least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
})

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
})

export type SignupType = z.infer<typeof SignupSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
