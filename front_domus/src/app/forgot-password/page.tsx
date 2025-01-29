import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ForgotPasswordForm from '@/components/ForgotPasswordForm'
import { AuthProvider } from "../contexts/AuthContext"

export default function ForgotPasswordPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[#4A7C59]">Recuperar Senha</CardTitle>
            <CardDescription className="text-center text-[#333333]">
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
