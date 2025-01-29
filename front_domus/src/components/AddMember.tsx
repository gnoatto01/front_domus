import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddMemberFormProps {
    onClose: () => void
}

export default function AddMemberForm({ onClose }: AddMemberFormProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [status, setStatus] = useState("Ativo")

    const handleSubmit = (e: React.FormEvent) => {

    }

    return (
        <form onSubmit={handleSubmit} className="bg-card text-card-foreground p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Adicionar nova pessoa</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" autoComplete="off" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastname">Sobrenome</Label>
                    <Input id="lastname" autoComplete="off" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" autoComplete="off" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cellPhone">Celular</Label>
                    <Input id="cellPhone" autoComplete="off" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" autoComplete="off" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Inativo">Inativo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
                <Button type="button" className="bg-red-600 hover:bg-red-700" onClick={onClose}>
                    Cancelar
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" type="submit">Salvar</Button>
            </div>
        </form>
    )
}

