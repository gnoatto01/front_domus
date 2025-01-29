export default function Footer() {

    const currentYear = new Date().getUTCFullYear();

    return (
        <footer className="bg-secondary text-secondary-foreground p-4 text-center">
            <p> {currentYear} Atto's Soluctions. Todos os direitos reservados.</p>

        </footer>
    )
}

