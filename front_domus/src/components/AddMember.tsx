import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { criarRegistro } from "@/utils/AxiosService";

interface OpenDialog {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function AddMemberForm({ open, setOpen }: OpenDialog) {

    const { register, handleSubmit, formState: { errors } } = useForm<Person.personEntity>();

    const handleSave: SubmitHandler<Person.personEntity> = async (data) => {
        try {
            await criarRegistro<Person.personEntity>({ data: data }, "new-person");
            setOpen(false);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Adicionar nova pessoa</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" {...register("name", { required: true })} autoComplete="off"
                            />
                            {errors.name && <span className="text-[#EA4335]">O nome é obrigatório </span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastname">Sobrenome</Label>
                            <Input id="lastname" {...register("lastName", { required: true })} autoComplete="off" />
                            {errors.lastName && <span className="text-[#EA4335]">O sobrenome é obrigatório </span>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input id="phone" {...register("phone", { required: false })} autoComplete="off" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cellPhone">Celular</Label>
                            <Input id="cellPhone"{...register("cellPhone", { required: true })} autoComplete="off" />
                            {errors.lastName && <span className="text-[#EA4335]">O número do celular é obrigatório </span>}
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register("email", { required: false })} autoComplete="off" />
                        </div>

                    </div>
                    <DialogFooter className="flex justify-end space-x-2">
                        <Button type="button" className="bg-red-600 hover:bg-red-700" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700" type="submit">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
