import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { buscarComParametros, buscarTodos, criarRegistro } from "@/utils/AxiosService";
import { Building, Building2Icon, FilePenIcon, HomeIcon, IdCardIcon, MailIcon, MapIcon, MapPinHouse, MapPinIcon, MapPinned, PhoneIcon, Search, SubtitlesIcon, UserIcon } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function AddMemberForm({ open, setOpen }: OpenDialog) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<any>({});

    const [step, setStep] = useState(1);
    const [personType, setPersonType] = useState("");
    const [isActive, setIsActive] = useState("");
    const [gender, setGender] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [formData, setFormData] = useState<Person.PersonEntity>();


    // Função para salvar os dados conforme o usuário avança nas etapas
    const saveStepData = (data: any) => {
        setFormData((prev: any) => ({ ...prev, ...data }));
        setStep((prev) => prev + 1);
    };

    // Função para voltar para a etapa anterior
    const prevStep = () => setStep((prev) => prev - 1);


    const handleSave: SubmitHandler<Person.PersonEntity> = async (data) => {
        try {
            console.log(formData);
            await criarRegistro<Person.PersonEntity>({ data: data }, "new-person");
            setOpen(false);

        } catch (error) {
            console.error(error);
        }
    };

    const handleCep = async () => {

        const cepInput = document.getElementById('cep') as HTMLInputElement;
        const cep = cepInput?.value;

        try {
            const response = await buscarComParametros<Address.viaCepResponse>("get-cep", { cep });

            //seta os valores
            setValue("street", response.logradouro || "", { shouldValidate: true });
            setValue("district", response.bairro || "", { shouldValidate: true });
            setValue("city", response.localidade || "", { shouldValidate: true });
            setValue("state", response.estado || "", { shouldValidate: true });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }



    //FIXME: colocar description nos dialogs, para sumir os warnings 


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
                                            {...register("name", personType === 'F' ? { required: true } : { required: false })}
                                            autoComplete="off"
                                            className="pl-10"
                                            disabled={personType === 'J'}
                                        />
                                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                    </div>

                                    {errors.name && personType === 'F' && <span className="text-red-600">O nome é obrigatório</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastname">Sobrenome</Label>

                                    <Input id="lastname" {...register("lastName", personType === 'F' ? { required: true } : { required: false })} autoComplete="off"
                                        disabled={personType === 'J'} />

                                    {errors.lastName && personType === 'F' && <span className="text-red-600">O sobrenome é obrigatório</span>}
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
                                    <Label htmlFor="isActive">Status</Label>
                                    <Select onValueChange={(value) => {
                                        setIsActive(value),
                                            setValue("isActive", value)
                                    }}>
                                        <SelectTrigger id="isActive">
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>

                                            <SelectItem value="S">Ativo</SelectItem>
                                            <SelectItem value="N">Inativo</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                        <Label htmlFor="companyName">Razão Social</Label>
                                        <div className="relative">
                                            <Input id="companyName" {...register("companyName", { required: true })} autoComplete="off" className="pl-10" />
                                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                        </div>

                                        {errors.companyName && <span className="text-red-600">A Razão Social é obrigatória</span>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tradeName">Nome fantasia</Label>
                                        <div className="relative">
                                            <Input id="tradeName" {...register("tradeName", { required: false })} autoComplete="off" className="pl-10" />
                                            <SubtitlesIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                        </div>

                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cnpj">CNPJ</Label>
                                        <div className="relative">
                                            <Input id="cnpj" {...register("cnpj", { required: true })} autoComplete="off" className="pl-10" />
                                            <IdCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                        </div>

                                        {errors.cnpj && <span className="text-red-600">O CNPJ é obrigatório</span>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="stateRegistration">Inscrição estadual</Label>
                                        <div className="relative">
                                            <Input id="stateRegistration" {...register("stateRegistration", { required: false })} autoComplete="off" className="pl-10" />
                                            <FilePenIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                        </div>

                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="municipalRegistrarion">Inscrição municipal</Label>
                                        <div className="relative">
                                            <Input id="municipalRegistrarion" {...register("municipalRegistrarion", { required: false })} autoComplete="off" className="pl-10" />
                                            <FilePenIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                        </div>

                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="openingDate">Data de abertura</Label>
                                        <Input id="openingDate" type="date" {...register("openingDate", { required: false })} />
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
                                    <div className="relative">

                                        <Input id="street" {...register("street", { required: true })} autoComplete="off" className="pl-10" />
                                        <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                    </div>

                                    {errors.street && <span className="text-red-600">A rua é obrigratória</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="district">Bairro</Label>
                                    <Input id="district" {...register("district", { required: true })} autoComplete="off" />
                                    {errors.district && <span className="text-red-600">O bairro é obrigatório</span>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city">Cidade</Label>
                                    <div className="relative">
                                        <Input id="city" {...register("city", { required: true })} autoComplete="off" className="pl-10" />
                                        <Building2Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />

                                    </div>
                                    {errors.city && <span className="text-red-600">A cidade é obrigatória</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="number">Número</Label>
                                    <Input id="number" {...register("number", { required: true })} autoComplete="off" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">Estado</Label>
                                    <div className="relative">
                                        <Input id="state" {...register("state", { required: true })} autoComplete="off" className="pl-10" />
                                        <MapIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                    </div>

                                    {errors.state && <span className="text-red-600">O estado é obrigatório</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cep">Cep</Label>
                                    <div className="relative">

                                        <Input
                                            id="cep"
                                            type="text"
                                            {...register("cep")}
                                            autoComplete="off"
                                            className="pl-10 pr-14"
                                            maxLength={8}
                                        />

                                        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />

                                        <button
                                            type="button"
                                            onClick={handleCep}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                                        >
                                            <Search size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="complement">Complemento</Label>
                                    <div className="relative">
                                        <Input id="complement" type="text" {...register("complement")} autoComplete="off" className="pl-10" />
                                        <FilePenIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={14} />
                                    </div>

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
        </Dialog >
    );
}
