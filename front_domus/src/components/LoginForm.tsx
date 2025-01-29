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
  const { register, handleSubmit } = useForm<Login.LoginEntity>()
  const { signIn } = useAuth()

  async function handleSignIn(data: Login.LoginEntity) {
    try {
      await signIn(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-[#333333] font-semibold">
          Usuário
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Digite seu usuário"
          required
          className="border-[#B8C4BB] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
          {...register('username', { required: true })}
          autoComplete='off'
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#333333] font-semibold">
          Senha
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="border-[#B8C4BB] focus:ring-2 focus:ring-[#4A7C59] rounded-lg"
            {...register("password", { required: true })}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 inset-y-0 flex items-center text-[#333333] hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="text-sm text-right">
        <Link
          href="/forgot-password"
          className="text-[#4A7C59] hover:text-[#3D9970] transition-colors"
        >
          Esqueceu sua senha?
        </Link>
      </div>
      <Button
        type="submit"
        className="w-full py-2 bg-[#4A7C59] hover:bg-[#3D9970] text-white font-bold rounded-lg transition-colors"
      >
        Entrar
      </Button>
    </form>
  )
}
