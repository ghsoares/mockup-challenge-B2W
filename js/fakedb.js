class funcionario {
    constructor(nome = "", email = "", senha = "", telefone = "", cargo = 0, equipes = []) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.cargo = cargo;
        this.equipes = equipes;
    }
}

const FUNCIONARIOS = {
    0: new funcionario("Mario Almeida", "marioalmeida@gmail.com", "marioa1234", "(11) 99543-9790", 0, [0, 1]),
    1: new funcionario("Ana Carolina", "anacarolina@gmail.com", "anaac1234", "(11) 99543-9790", 0, [0, 1]),
}

function encontrarID(id = 0) {
    if (id in FUNCIONARIOS) {
        return FUNCIONARIOS[id];
    }
    return null;
}

function encontrarEmail(email = "") {
    return Object.values(FUNCIONARIOS).find((funcionario) => funcionario.email === email);
}

export {
    encontrarID,
    encontrarEmail
}