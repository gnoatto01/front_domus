
'use client'
import { AuthProvider } from "../contexts/AuthContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";
import AddMemberForm from "@/components/AddMember";
import MemberList from "@/components/MemberList";

function MembersPage() {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className={`flex-1 p-6 transition-all}`}>
                        <h1 className="text-3xl font-bold mb-6">Gerenciamento de pessoas</h1>
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center w-1/2">
                                <Input
                                    type="text"
                                    placeholder="Pesquisar membros..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="mr-2"
                                />
                                <Button variant="outline" size="icon">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button onClick={() => setOpen(true)} className="bg-[#4A7C59] hover:bg-[#3B5A43] text-white">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Adicionar pessoa
                            </Button>

                        </div>
                        {<AddMemberForm open={open} setOpen={setOpen} />}
                        <MemberList />
                    </main>
                </div>
                <Footer />
            </div>
        </AuthProvider>
    );
}
export default MembersPage; 