/*
Esse JS tenta imitar um banco de dados
*/

/*Classe que armazena os dados de um funcionário*/
class funcionario {
    constructor(id = 0, nome = "", email = "", senha = "", telefone = "", cargo = 0, equipes = []) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.cargo = cargo;
        this.equipes = equipes;
    }
}

/*Classe que armazena os dados de uma equipe*/
class equipe {
    constructor(id = 0, nome = "", imgUrl = "", descricao = "") {
        this.id = id;
        this.nome = nome;
        this.imgUrl = imgUrl;
        this.descricao = descricao;
    }
}

/*Classe que armazena os dados de uma avaliação*/
class avaliacao {
    cosntrutor(id = 0, nome = "", nota = 0, funcionarioId = 0, feedback = "") {
        this.id = id;
        this.nota = nota;
        this.funcionarioId = funcionarioId;
        this.feedback = feedback;
    }
}

/*Um dicionário que armazena os funcionário para imitar um banco de dados*/
const FUNCIONARIOS = {
    0: new funcionario(0, "Mario Almeida", "marioalmeida@gmail.com", "marioa1234", "(11) 99543-9790", 0, [0, 1, 2]),
    1: new funcionario(1, "Ana Carolina", "anacarolina@gmail.com", "anaac1234", "(11) 99543-9790", 0, [0, 1]),
}

/*Um dicionário que armazena as equipes para imitar um banco de dados*/
const EQUIPES = {
    0: new equipe(0, "RH", "../img/logo.png", "Time designado aos recursos humanos da empresa"),
    1: new equipe(1, "Televendas", "../img/logo.png", "Time designado ás televendas direcionadas aos clientes"),
    2: new equipe(2, "Suporte", "../img/logo.png", "Time designado ao suporte técnico aos clientes")
}

/*Um dicionário que armazena as avaliações para imitar um banco de dados*/
const AVALIACOES = {
    0: new avaliacao(0, "Questionário cultural", 4, 0, ""),
    1: new avaliacao(1, "Questionário profissional", 3, 1, ""),
}

/*Função que retorna um funcionário pelo id dele*/
function getFuncionarioByID(id = 0) {
    if (id in FUNCIONARIOS) {
        return FUNCIONARIOS[id];
    }
    return null;
}

/*Função que retorna um funcionário pelo email dele*/
function getFuncionarioByEmail(email = "") {
    return Object.values(FUNCIONARIOS).find((funcionario) => funcionario.email === email);
}

/*Função que retorna uma equipe pelo id dela*/
function getEquipeByID(id = 0) {
    if (id in EQUIPES) {
        return EQUIPES[id];
    }
    return null;
}

/*Função que retorna uma avaliação pelo id dela*/
function getAvaliacaoByID(id = 0) {
    if (id in AVALIACOES) {
        return AVALIACOES[id];
    }
    return null;
}

/*Função que retorna avaliações designadas para um funcionário com id*/
function getAvaliacoesByFuncionarioID(funcionarioID = 0) {
    let av = []
    Object.values(AVALIACOES).forEach(avaliacao => {
        if (avaliacao.funcionarioId == funcionarioID) {
            av.push(avaliacao);
        }
    });
    return av;
}

/*Função que retorna todos os funcionários dentro de uma equipe*/
function getFuncionariosInEquipe(equipe) {
    let func = [];
    Object.values(FUNCIONARIOS).forEach(funcionario => {
        if (equipe.id in funcionario.equipes) func.push(funcionario);
    });
    return func;
}

/*Exporta as funções desse módulo*/
export {
    getFuncionarioByID,
    getFuncionarioByEmail,
    getEquipeByID,
    getAvaliacaoByID,
    getAvaliacoesByFuncionarioID,
    getFuncionariosInEquipe
}