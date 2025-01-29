'use client'
import { Users, Calendar, DollarSign, BookOpen, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const router = useRouter();
    return (
        <aside className="w-64 bg-secondary text-secondary-foreground p-4">
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Button variant="link" className="w-full justify-start" onClick={() => router.push("/members")}>
                            <Users className="mr-2 h-4 w-4" />
                            Gerenciar pessoas
                        </Button>
                    </li>
                    <li>
                        <Button variant="link" className="w-full justify-start">
                            <Calendar className="mr-2 h-4 w-4" />
                            Agendar evento
                        </Button>
                    </li>
                    <li>
                        <Button variant="link" className="w-full justify-start">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Registrar doação
                        </Button>
                    </li>
                    <li>
                        <Button variant="link" className="w-full justify-start">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Planejar culto
                        </Button>
                    </li>
                    <li>
                        <Button variant="link" className="w-full justify-start">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Comunicações
                        </Button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

