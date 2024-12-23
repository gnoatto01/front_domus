'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useAuth } from '@/app/contexts/AuthContext'
import { useForm } from 'react-hook-form'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit } = useForm<Login.EntidadeLogin>();
  const { signIn } = useAuth();

  async function handleSignIn(dados: Login.EntidadeLogin){
    try {
      await signIn(dados);
     
  } catch (error) {
     console.error(error); 
  }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#1E2761]">Usuário</Label>
        <Input 
          id="usuario" 
          type="text" 
          placeholder="Usuário" 
          required 
          className="border-[#7CC6FE] focus:ring-[#7CC6FE]"
          {...register('usuario',{required:true}) }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#1E2761]">Senha</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="border-[#7CC6FE] focus:ring-[#7CC6FE]"
            {...register('senha',{required:true}) }
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-[#1E2761]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="text-sm text-right">
        <Link
          href="/forgot-password"
          className="text-[#1E2761] hover:text-[#7CC6FE] transition-colors"
        >
          Esqueceu sua senha?
        </Link>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#1E2761] hover:bg-[#7CC6FE] text-white transition-colors"
      >
        Entrar
      </Button>
    </form>
  )
}

