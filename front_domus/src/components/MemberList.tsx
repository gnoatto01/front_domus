import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { buscarTodos } from "@/utils/AxiosService"


export default function MemberList() {

    const [data, setData] = useState<Person.personEntity[] | null>(null);

    // const filteredMembers = members.filter(
    //     (member) =>
    //         member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         member.email.toLowerCase().includes(searchTerm.toLowerCase()),
    // )

    useEffect(() => {
        GetPersons();
    }, []);


    async function GetPersons() {
        try {

            const response = await buscarTodos<Person.personEntity[]>("person");

            if (response) {
                setData(response);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = (id: number) => {

    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Sobrenome</TableHead>
                    <TableHead>Celular</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((person) => (
                    <TableRow key={person.personId}>
                        <TableCell>{person.name}</TableCell>
                        <TableCell>{person.lastName}</TableCell>
                        <TableCell>{person.cellPhone}</TableCell>
                        <TableCell>{person.email}</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(person.personId)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

