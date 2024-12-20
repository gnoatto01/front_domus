'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aqui você pode adicionar a lógica para enviar o e-mail de recuperação
    console.log('Recuperação de senha solicitada para:', email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="text-center text-[#1E2761]">
        <p className="mb-4">Um e-mail com instruções para recuperar sua senha foi enviado para {email}.</p>
        <Link href="/login" className="text-[#1E2761] hover:text-[#7CC6FE] transition-colors">
          Voltar para o login
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#1E2761]">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-[#7CC6FE] focus:ring-[#7CC6FE]"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#1E2761] hover:bg-[#7CC6FE] text-white transition-colors"
      >
        Enviar link de recuperação
      </Button>
      <div className="text-center">
        <Link 
          href="/login" 
          className="text-[#1E2761] hover:text-[#7CC6FE] transition-colors"
        >
          Voltar para o login
        </Link>
      </div>
    </form>
  )
}

