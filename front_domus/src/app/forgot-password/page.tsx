import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ForgotPasswordForm from '@/components/EsqueceuSenhaForm'
import { AuthProvider } from "../contexts/AuthContext"

export default function ForgotPasswordPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-[#1E2761]">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#1E2761]">Recuperar Senha</CardTitle>
          <CardDescription className="text-center">
            Digite seu e-mail para receber um link de recuperação de senha
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
    </AuthProvider>
    
  )
}

