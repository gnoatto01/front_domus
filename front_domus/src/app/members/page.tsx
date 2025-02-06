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
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-6 transition-all">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gerenciamento de Pessoas</h1>

                        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                            <div className="flex items-center w-full sm:w-1/2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
                                <Input
                                    type="text"
                                    placeholder="Pesquisar membros..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
                                />
                                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                                    <Search className="h-5 w-5" />
                                </Button>
                            </div>
                            <Button
                                onClick={() => setOpen(true)}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Cadastrar pessoa
                            </Button>
                        </div>

                        {open && (
                            <div className="animate-fadeIn">
                                <AddMemberForm open={open} setOpen={setOpen} />
                            </div>
                        )}

                        <MemberList />
                    </main>
                </div>1
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default MembersPage;
