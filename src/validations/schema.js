import {z} from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/

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
    path: ['confirmPassword']
})

export const loginSchema = z.object({
    username: z.string().trim().min(8, "Username must be at least 8 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export const forgotPasswordSchema = z.object({
    identity: z.string().min(1, "Required").refine(
        v => emailRegex.test(v) || v.length >= 8,
        "Enter a valid email or username (min 8 characters)"
    )
})

export const updateMeSchema = z.object({
    identity: z.string().optional().or(z.literal('')),
    username: z.string().min(8, ("Username must be at least 8 characters long")).optional(),
    firstName: z.string().optional().or(z.literal('')),
    lastName: z.string().optional().or(z.literal('')),
    zodiac: z.string().optional().or(z.literal('')),
    dateOfBirth: z.string().optional().or(z.literal('')),
    profileImage: z.string().optional().or(z.literal('')),
})