'use client'
import FooterLink from "@/components/forms/FooterLink"
import InputField from "@/components/forms/InputField"
import { Button } from "@/components/ui/button"
import {useForm} from "react-hook-form";

const SignIn = () => {
    const {register,handleSubmit, formState: {errors,isSubmitting}} = useForm<SignInFormData>({
        mode: "onBlur"
    },)

    const onSubmit = async (data: SignInFormData) => {
        try {
            console.log(data)
        }catch(error) {
            console.error(error)
        }
    }


    return (
        <>
            <h1 className={"form-title"}>Sign in</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={"space-y-5"}>

                <InputField
                    name="email"
                    label = "Email"
                    placeholder="example@gmail.com"
                    register={register}
                    error={errors.email}
                    validation={{required:'Email is required', email:true, pattern:{value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address'}}}

                />
                <InputField
                    name="password"
                    label = "Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{required:'Password is required', minLength:8, maxLength:20}}

                />


                <Button type={"submit"} disabled={isSubmitting} className={"yellow-btn w-full mt-5"}>
                    {isSubmitting ? "Signing in..." : "Start your investing journey"}
                </Button>
                <FooterLink text="Don't have an account?" linkText="Sign up" href="/sign-up" />
            </form>
        </>
    )
}
export default SignIn
