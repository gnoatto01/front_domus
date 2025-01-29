import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import Dashboard from "@/components/Dashboard"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <Dashboard />
        </main>
      </div>
      <Footer />
    </div>
  )
}

