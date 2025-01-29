import Image from "next/image";

//TODO: Encontrar uma maneira melhor de deixar a logo 
export function Logo() {
    return (
        <div className="absolute bottom-4 right-4">
            <Image
                src="https://drive.google.com/uc?id=1McZQ39fyjSYjVPJN74xkjaUZ9ICiZb4R"
                alt="Logo Atto's Soluctions"
                width={300}
                height={300}
                priority
            />
        </div>
    );
}
