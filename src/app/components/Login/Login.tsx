"use client"
import Image from "next/image";
import wavesLogin from '@/app/assets/img/wavesLogin.svg'
import adminLogo from "../../assets/img/adminLogoWhite.svg"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationLoginForm } from "@/app/validation/validationLoginForm";
import ErrorMessage from "../ErrorMessage";
import { UserLogInForm } from "@/app/types";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { showToast } from "@/app/helpers/showToast";
import Link from "next/link";
import React from "react";
import Spinner from "../Spinner/Spinner";

export default function Login() {

  const {register, handleSubmit, watch, formState: {errors, isDirty, isValid}} = useForm({defaultValues: {
    email: "",
    password: ""
    },
    resolver: zodResolver(validationLoginForm),
    mode: "all",
  })
  const [ loading, setLoading] = React.useState(false)
  const router = useRouter()

  const handleLogIn = async (dataform : UserLogInForm, e: any ) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        email: dataform.email,
        password: dataform.password,
        redirect: false
      })
      
      if (res?.error) {
        showToast("error", res?.error);
        router.push('/')
        setLoading(false)
        return
      }
      
      if (res?.ok) {
        setLoading(true)
        router.push('/dashboard')
        return
      }
      
    } catch (error) {
      return router.push('/')
    }
  }
  
  return (
    <>
    { loading ? (
      <div className="h-screen relative flex items-center justify-center bg-slate-950">
        <Spinner />
      </div>
    ): (
      <>
        <div className="h-screen relative flex items-center justify-center">
        <Image
          alt="background image"
          src={wavesLogin}
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
          <div className="max-w-md absolute p-8 md:p-10 rounded-2xl shadow-md shadow-dark-blue border border-gray-50  mx-4 md:mx-0">
              <form className=" flex flex-col items-center" onSubmit={handleSubmit(handleLogIn)} noValidate>
                  <div className="mb-5">
                      <Image src={adminLogo} width={150} height={100} className="w-36 h-28" alt="Imagen logo" />
                  </div>
                  <div className="md:w-80 mt-5">
  
                    <div className="relative mt-5">
                        <input 
                          type="email" 
                          className="peer py-1 pe-0 ps-7 block text-gray-100 w-full bg-transparent border-t-transparent border-b border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-gray-500 focus:ring-0  focus:text-gray-100 focus:outline-none placeholder:text-gray-100 focus:placeholder:text-gray-400" 
                          placeholder="Email"
                          id="email"
                          {...register("email")}
                        />
                        <div className="absolute inset-y-0 -start-1 flex items-center pointer-events-none ps-2 ">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1.5" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24" className="flex-shrink-0 w-4 h-4 text-gray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                          </svg>
                        </div>
                    </div>
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
  
                    <div className="relative mt-7">
                        <input 
                          type="password" 
                          className="peer py-1 pe-0 ps-7 block text-gray-100 w-full bg-transparent border-t-transparent border-b border-x-transparent border-b-gray-200 text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-gray-500 focus:ring-0  focus:text-gray-100 focus:outline-none placeholder:text-gray-100 focus:placeholder:text-gray-400" 
                          placeholder="Password" 
                          id="password"
                          {...register("password")}
                        />
                        <div className="absolute inset-y-0 -start-1 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                        <svg className="flex-shrink-0 w-4 h-4 text-gray-100" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
                        </div>
                    </div>
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                
                    <button 
                      type="submit" 
                      className=" block text-center w-full mt-8 p-2 bg-gray-100 text-dark-blue text-sm uppercase font-semibold rounded-md hover:bg-gray-100/90 transition-all disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed"
                      disabled={!isDirty || !isValid}
                    >
                      Iniciar Sesión
                    </button>
  
                    <div className="flex justify-center mt-5">
                      <div className="flex gap-1">
                        <p className="text-xs text-gray-100">¿Aún no te has registrado?</p>
                        <Link href="/register" className="text-xs text-gray-100 font-semibold">Registrarse</Link>
                      </div>
                    </div>
  
                  </div>
              </form>
          </div>
        </div>
      </>
    )}
    </>
  )
}
