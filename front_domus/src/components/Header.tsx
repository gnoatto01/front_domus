'use client'
import { Bell, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";



export default function Header() {
    const router = useRouter()

    const HandleLogout = () => {
        destroyCookie(null, 'attossoluctions.token');
        router.push("/login");
    }

    return (
        <header className="bg-[#4A7C59] text-[#FFFFFF] p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-wide">DOMUS</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Button
                                variant="link"
                                className="text-[#FFFFFF] hover:bg-[#376B48] transition-colors"
                            >
                                Início
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="link"
                                className="text-[#FFFFFF] hover:bg-[#376B48] transition-colors"
                            >
                                Membros
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="link"
                                className="text-[#FFFFFF] hover:bg-[#376B48] transition-colors"
                            >
                                Eventos
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="link"
                                className="text-[#FFFFFF] hover:bg-[#376B48] transition-colors"
                            >
                                Finanças
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="link"
                                size="icon"
                                className="text-[#FFFFFF] hover:bg-[#376B48] transition-colors"
                            >
                                <Bell />
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="link"
                                size="icon"
                                className="text-[#FFFFFF] hover:bg-[#376B48] transition-colors"
                            >
                                <Settings />
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="link"
                                size="icon"
                                className="text-[#FFFFFF] hover:bg-[#376B48] transition-colors"
                                onClick={() => HandleLogout()}
                            >
                                <LogOut />
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

