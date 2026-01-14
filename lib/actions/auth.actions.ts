'use server'

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";

export const signUpWithEmail = async ({email,password,fullName,country,investmentGoals,riskTolerance,preferredIndustry}: SignUpFormData) => {
    try {
        const res = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: fullName,
            }
        })
        if(res){
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email,
                    name: fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry,
                }
            })
        }
        return {
            success: true,
            data: res,
        }
    }
    catch(error) {
        console.error('Error signing up with email', error)
        return {
            success: false,
            message: 'Error signing up with email'
        }
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({
            headers: await headers()
        })
        return {
            success: true,
            message: 'Signed out successfully'
        }
    }
    catch(error) {
        console.error('Error signing out', error)
        return {
            success: false,
            message: 'Error signing out'
        }
    }
}

export const signInWithEmail = async ({email,password}: SignInFormData) => {
    try {
        const res = await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })

        return {
            success: true,
            data: res,
        }
    }
    catch(error) {
        console.error('Error signing in with email', error)
        return {
            success: false,
            message: 'Error signing in with email'
        }
    }
}