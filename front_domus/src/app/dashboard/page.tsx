import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthProvider } from '../contexts/AuthContext'

export default function LoginPage() {
  return (
    <AuthProvider>
       <div className="min-h-screen flex items-center justify-center bg-[#1E2761]">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#1E2761]">Dashboard</CardTitle>
         
        </CardHeader>
        <CardContent>
          
        </CardContent>
      </Card>
    </div>
    </AuthProvider>
   
  )
}

