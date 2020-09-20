/*
Esse script mostra os times e os membros de cada equipe
*/

import {getFuncionarioByID, getEquipeByID, getFuncionariosInEquipe} from "./fakedb.js";

// Quando um botão de uma aba for clicada, muda a aba
$("#tabs-select a").click(function() {
    $("li.current").removeClass("current");

    $(this).parent().addClass("current");
    $(".tab.current").removeClass("current");

    var id = $(this).attr('id').replace("select-", "");

    $(`.tab#${id}`).addClass("current");
});

// Pega as equipes do usuário
function getEquipes() {
    var usuarioID = sessionStorage.getItem("usuario");
    var usuario = getFuncionarioByID(usuarioID);
    var equipeIDs = usuario.equipes;

    var equipes = [];

    equipeIDs.forEach(id => {
        var equipe = getEquipeByID(id);
        if (equipe) equipes.push(equipe);
    });

    return equipes;
}

// Fabrica o html que mostra uma equipe
function htmlEquipe(equipe) {
    let code = "";

    code += `<button class="equipe" onclick="listarMembros(${equipe.id})">`;
    code += `<img class="equipe-img" src="${equipe.imgUrl}" />`;
    code += `<div class="equipe-desc">`;
    code += `<h1 class="equipe-nome">${equipe.nome}</h1>`;
    code += `<p class="equipe-descricao">${equipe.descricao}</p>`;
    code += `</div>`;
    code += `</button>`;

    return code;
}

// Fabrica p html que mostra um membro de uma equipe
function htmlFuncionario(funcionario) {
   let code = "";

   code += `<button class="membro-equipe">`;
   code += `<img class="membro-img" src="../img/logo.png" />`
   code += `<h1 class="membro-nome">${funcionario.nome}</h1>`
   code += `</button>`;

   return code;
}

// Lista as equipes no html
function listarEquipes() {
    let equipes = getEquipes();
    let equipesHtml = "";

    equipes.forEach(equipe => {
        equipesHtml += htmlEquipe(equipe);
    });

    $("#listar-equipes").html(equipesHtml);
}

// Lista os membros no html de uma equipe pelo id da equipe
function listarMembros(equipeID) {
    let equipe = getEquipeByID(equipeID);
    let membros = getFuncionariosInEquipe(equipe);
    
    let membrosHtml = "";
    membros.forEach(membro => {
        membrosHtml += htmlFuncionario(membro);
    });

    $("#listar-membros-equipe").html(membrosHtml);

    $("#listar-equipes").removeClass("current");
    $("#listar-membros-equipe").addClass("current");
}

// Expôe a função "listarMembros" para poder ser chamada no html,
// por padrão um JS do tipo módulo não espôe as variáveis e funções
window.listarMembros = listarMembros;

// Lista as equipes quando a página carregar
listarEquipes();