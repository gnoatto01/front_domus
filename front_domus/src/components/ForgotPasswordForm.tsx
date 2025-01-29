'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { buscarComParametros } from '@/utils/AxiosService'
import { useForm } from 'react-hook-form'

export default function ForgotPasswordForm() {
  const { register, handleSubmit } = useForm<Login.EmailEntity>()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleForgotPassword(data: Login.EmailEntity) {
    try {
      const response = await buscarComParametros<boolean>("verify-email", data)
      setEmail(data.email)

      if (response) {
        setIsSubmitted(true)
        setErrorMessage(null)
      } else {
        setErrorMessage('E-mail não encontrado na base de dados.')
        setIsSubmitted(false)
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('Ocorreu um erro ao processar sua solicitação.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border border-[#B8C4BB] rounded-md shadow-md">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#333333]">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email", { required: true })}
              autoComplete="off"
              className="border-[#B8C4BB] focus:ring-[#4A7C59]"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#4A7C59] hover:bg-[#3D9970] text-white transition-colors"
          >
            Enviar link de recuperação
          </Button>
          {errorMessage && (
            <p className="text-center text-red-500 text-sm">{errorMessage}</p>
          )}
          <div className="text-center">
            <Link
              href="/login"
              className="text-[#4A7C59] hover:text-[#3D9970] transition-colors"
            >
              Voltar para o login
            </Link>
          </div>
        </form>
      ) : (
        <div className="text-center text-[#4A7C59]">
          <p className="mb-4">
            Um e-mail com instruções para recuperar sua senha foi enviado para <strong>{email}</strong>.
          </p>
          <Link
            href="/login"
            className="text-[#4A7C59] hover:text-[#3D9970] transition-colors"
          >
            Voltar para o login
          </Link>
        </div>
      )}
    </div>
  )
}
