declare namespace Address {
    type addressEntity = {
        personId: number
        street: string
        district: string
        city: string
        number: string
        state: string
        cep: string
        complement: string
    }

    type viaCepResponse = {
        cep: string
        logradouro: string
        complemento: string
        unidade: string
        bairro: string
        localidade: string
        uf: string
        estado: string
        regiao: string
        ibge: string
        gia: string
        ddd: string
        siafi: string
    }
}