async function fetchCursos() {
    const response = await fetch('https://api.origamid.dev/json/cursos.json');
    const data = await response.json();
    mostrarCursos(data);
}

fetchCursos();

interface Curso {

    nome: string;
    horas: number;
    aulas: number;
    gratuito: boolean;
    tags: Array<string>;
    idAulas: Array<number;
    nivel: "iniciante" | "avancado";
}

function mostrarCursos(cursos: Array<Curso>) {

    cursos.forEach((curso) => {
        let color;

        if (curso.nivel === "iniciante") {
            color = "blue";
        } else if (curso.nivel === "avancado") {
            color = "red";
        }


        document.body.innerHTML += `
            <div>
                <h2 style="color: ${color}">${curso.nome}</h2>
                <p>Horas: ${curso.horas}</p>
                <p>Aulas: ${curso.aulas}</p>
                <p>Gratuito: ${curso.gratuito ? "Gratuito" : "Pago"}</p>
                <p>Tags: ${curso.tags.join(", ")}</p>
                <p>idAulas: ${curso.idAulas.join(", ")}</p>
                <p>Nível: ${curso.nivel}</p>
            </div>
        `;
    })
}
