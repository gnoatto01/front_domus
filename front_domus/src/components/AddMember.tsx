import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { criarRegistro } from "@/utils/AxiosService";
import { IdCardIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";

export default function AddMemberForm({ open, setOpen }: OpenDialog) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<any>({});

    const [step, setStep] = useState(1);
    const [personType, setPersonType] = useState("");
    const [gender, setGender] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [formData, setFormData] = useState<Person.naturalPersonEntity>();

    // Função para salvar os dados conforme o usuário avança nas etapas
    const saveStepData = (data: any) => {
        setFormData((prev: any) => ({ ...prev, ...data }));
        setStep((prev) => prev + 1);
    };

    // Função para voltar para a etapa anterior
    const prevStep = () => setStep((prev) => prev - 1);


    const handleSave: SubmitHandler<Person.naturalPersonEntity> = async (data) => {
        try {
            console.log(formData);
            await criarRegistro<Person.naturalPersonEntity>({ data: data }, "new-person");
            setOpen(false);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Cadastro de nova pessoa</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
                    {step === 1 && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <div className="relative">
                                        <Input
                                            id="name"
                                            {...register("name", { required: true })}
                                            autoComplete="off"
                                            className="pl-10"
                                        />
                                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                    </div>

                                    {errors.name && <span className="text-red-600">O nome é obrigatório</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastname">Sobrenome</Label>
                                    <div className="relative">
                                        <Input id="lastname" {...register("lastName", { required: true })} autoComplete="off" className="pl-10" />
                                    </div>
                                    {errors.lastName && <span className="text-red-600">O sobrenome é obrigatório</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefone</Label>
                                    <div className="relative">
                                        <Input id="phone" {...register("phone")} autoComplete="off" className="pl-10" />
                                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                    </div>

                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cellPhone">Celular</Label>
                                    <Input id="cellPhone" {...register("cellPhone", { required: true })} autoComplete="off" />
                                    {errors.cellPhone && <span className="text-red-600">O número do celular é obrigatório</span>}
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Input id="email" type="email" {...register("email")} autoComplete="off" className="pl-10" />
                                        <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                    </div>

                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipo">Tipo da pessoa</Label>
                                    <Select onValueChange={(value) => {
                                        setPersonType(value),
                                            setValue("personType", value)
                                    }}>
                                        <SelectTrigger id="tipo">
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="F">Física</SelectItem>
                                            <SelectItem value="J">Jurídica</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter className="flex justify-end space-x-2">
                                <Button type="button" className="bg-red-600 hover:bg-red-700" onClick={() => setOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700" type="button" onClick={handleSubmit(saveStepData)}>
                                    Avançar
                                </Button>
                            </DialogFooter>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            {personType === "F" ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                                        <Input id="birthDate" type="date" {...register("birthDate", { required: true })} />
                                        {errors.birthDate && <span className="text-red-600">A data de nascimento é obrigatória</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cpf">CPF</Label>
                                        <Input id="cpf" {...register("cpf", { required: true })} autoComplete="off" />
                                        {errors.cpf && <span className="text-red-600">O CPF é obrigatório</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rg">RG</Label>
                                        <Input id="rg" {...register("rg", { required: false })} autoComplete="off" />

                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="fatherName">Nome do pai</Label>
                                        <Input id="fatherName" {...register("fatherName", { required: false })} autoComplete="off" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="motherName">Nome do mãe</Label>
                                        <Input id="motherName" {...register("motherName", { required: false })} autoComplete="off" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gênero</Label>
                                        <Select value={gender} onValueChange={setGender}>
                                            {errors.gender && <span className="text-red-600">Selecione um gênero</span>}
                                            <SelectTrigger id="gender">
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="masculino">Masculino</SelectItem>
                                                <SelectItem value="feminino">Feminino</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="maritalStatus">Estado civil</Label>
                                        <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                                            {errors.gender && <span className="text-red-600">Selecione um estado civil</span>}
                                            <SelectTrigger id="maritalStatus">
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Solteiro(a)</SelectItem>
                                                <SelectItem value="2">Casado(a)</SelectItem>
                                                <SelectItem value="3">Separado(a)</SelectItem>
                                                <SelectItem value="4">Divorciado(a)</SelectItem>
                                                <SelectItem value="5">Viúvo(a)</SelectItem>
                                                <SelectItem value="6">União estável</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cnpj">CNPJ</Label>
                                        {/* <Input id="cnpj" {...register("cnpj", { required: true })} autoComplete="off" /> */}
                                        {/* {errors.cnpj && <span className="text-red-600">O CNPJ é obrigatório</span>} */}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="razaoSocial">Razão Social</Label>
                                        {/* <Input id="razaoSocial" {...register("razaoSocial", { required: true })} autoComplete="off" /> */}
                                        {/* {errors.razaoSocial && <span className="text-red-600">A Razão Social é obrigatória</span>} */}
                                    </div>
                                </div>
                            )}
                            <DialogFooter className="flex justify-between">
                                <Button type="button" className="bg-yellow-500 hover:bg-yellow-600" onClick={prevStep}>
                                    Voltar
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700" type="button" onClick={handleSubmit(saveStepData)}>
                                    Avançar
                                </Button>
                            </DialogFooter>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Rua</Label>
                                    <Input id="street" {...register("street", { required: true })} autoComplete="off" />
                                    {errors.street && <span className="text-red-600">A rua é obrigratória</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="district">Bairro</Label>
                                    <Input id="district" {...register("district", { required: true })} autoComplete="off" />
                                    {errors.district && <span className="text-red-600">O bairro é obrigatório</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">Cidade</Label>
                                    <Input id="city" {...register("city")} autoComplete="off" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">Estado</Label>
                                    <Input id="state" {...register("state", { required: true })} autoComplete="off" />
                                    {errors.state && <span className="text-red-600">O estado é obrigatório</span>}
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="cep">Cep</Label>
                                    <Input id="cep" type="text" {...register("cep")} autoComplete="off" />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="complement">Complemento</Label>
                                    <Input id="complement" type="text" {...register("complement")} autoComplete="off" />
                                </div>

                            </div>
                            <DialogFooter className="flex justify-between">
                                <Button type="button" className="bg-yellow-500 hover:bg-yellow-600" onClick={prevStep}>
                                    Voltar
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700" type="button" onClick={handleSubmit(saveStepData)}>
                                    Avançar
                                </Button>
                            </DialogFooter>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <p>Revise os dados antes de finalizar o cadastro.</p>
                            <DialogFooter className="flex justify-between">
                                <Button type="button" className="bg-yellow-500 hover:bg-yellow-600" onClick={prevStep}>
                                    Voltar
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700" type="submit">
                                    Finalizar Cadastro
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
