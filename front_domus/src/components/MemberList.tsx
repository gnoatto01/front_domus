import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { buscarTodos } from "@/utils/AxiosService";



export default function MemberList() {
    const [data, setData] = useState<Person.PersonEntity[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetPersons();
    }, []);

    async function GetPersons() {
        try {
            const response = await buscarTodos<Person.PersonEntity[]>("person");
            setData(response ?? []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = (id: number) => {
        console.log("Deletando ID:", id);
    };

    return (
        <div className="border rounded-lg shadow-md p-4 bg-white">


            {loading ? (
                <p className="text-center text-gray-500 py-4">Carregando...</p>
            ) : data && data.length > 0 ? (
                <Table>
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="text-center px-4 py-2">Nome</TableHead>
                            <TableHead className="text-center px-4 py-2">Sobrenome</TableHead>
                            <TableHead className="text-center px-4 py-2">Celular</TableHead>
                            <TableHead className="text-center px-4 py-2">E-mail</TableHead>
                            <TableHead className="text-center px-4 py-2">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((person) => (
                            <TableRow key={person.personId} className="hover:bg-accent">
                                <TableCell className="text-center px-4 py-2">{person.name}</TableCell>
                                <TableCell className="text-center px-4 py-2">{person.lastName}</TableCell>
                                <TableCell className="text-center px-4 py-2">{person.cellPhone}</TableCell>
                                <TableCell className="text-center px-4 py-2">{person.email}</TableCell>
                                <TableCell className="text-center px-4 py-2 flex justify-center space-x-2">
                                    <Button variant="ghost" size="icon" className="rounded-lg hover:text-blue-500">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-lg hover:text-red-500"
                                        onClick={() => handleDelete(person.personId)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-center text-gray-500 py-4">Nenhum membro encontrado.</p>
            )}
        </div>
    );
}
