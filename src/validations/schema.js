import {z} from "zod";

export const registerSchema = z.object({
    identity: z.string().min(2, "must have more than 2 characters")
        .refine(val => {
            return emailRegex.test(val) || mobileRegex.test(val)
        }, "Email or mobile phone require"),
    username: z.string().min(8, "username must have more than 8 characters"),
    password: z.string().min(6, "password at least 6 characters"),
    confirmPassword: z.string().min(1, "confirm password is required"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    zodiac: z.string().optional(),
    dateOfBirth: z.string().optional()
}).refine(input => input.password === input.confirmPassword, {
    message: "password must match with confirm password",
    path: ['confirmpassword']
})

export const loginSchema = z.object({
    username: z.string().min(8, "Username must be at least 8 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})