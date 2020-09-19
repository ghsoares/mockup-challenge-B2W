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

class equipe {
    constructor(nome = "", imgUrl = "", descricao = "") {
        this.nome = nome;
        this.imgUrl = imgUrl;
        this.descricao = descricao;
    }
}

const FUNCIONARIOS = {
    0: new funcionario("Mario Almeida", "marioalmeida@gmail.com", "marioa1234", "(11) 99543-9790", 0, [0, 1, 2]),
    1: new funcionario("Ana Carolina", "anacarolina@gmail.com", "anaac1234", "(11) 99543-9790", 0, [0, 1]),
}

const EQUIPES = {
    0: new equipe("RH", "/img/logo.png", "Time designado aos recursos humanos da empresa"),
    1: new equipe("Televendas", "/img/logo.png", "Time designado ás televendas direcionadas aos clientes"),
    2: new equipe("Suporte", "/img/logo.png", "Time designado ao suporte técnico aos clientes")
}

function getFuncionarioByID(id = 0) {
    if (id in FUNCIONARIOS) {
        return FUNCIONARIOS[id];
    }
    return null;
}

function getFuncionarioByEmail(email = "") {
    return Object.values(FUNCIONARIOS).find((funcionario) => funcionario.email === email);
}

function getEquipeByID(id = 0) {
    if (id in EQUIPES) {
        return EQUIPES[id];
    }
    return null;
}

export {
    getFuncionarioByID,
    getFuncionarioByEmail,
    getEquipeByID
}