import LoginForm from '@/components/LoginForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthProvider } from '../contexts/AuthContext'
import { Logo } from '@/components/Logo'

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F4F4] space-y-6">
        <Logo />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#4A7C59]">DOMUS</h1>

        </div>

        <Card className="w-full max-w-md bg-[#FFFFFF] shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[#4A7C59]">Login</CardTitle>
            <CardDescription className="text-center text-[#2C2C2C]">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>


      </div>
    </AuthProvider>
  )
}
