import {getFuncionarioByID, getEquipeByID} from "./fakedb.js";

$("#tabs-select a").click(function() {
    $("li.current").removeClass("current");

    $(this).parent().addClass("current");
    $(".tab.current").removeClass("current");

    var id = $(this).attr('id').replace("select-", "");

    $(`.tab#${id}`).addClass("current");
});

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

function htmlEquipe(equipe) {
    let code = "";
    code += `<button class="equipe">`;
    code += `<img class="equipe-img" src="${equipe.imgUrl}" />`;
    code += `<div class="equipe-desc">`;
    code += `<h1 class="equipe-nome">${equipe.nome}</h1>`;
    code += `<p class="equipe-descricao">${equipe.descricao}</p>`;
    code += `</div>`;
    code += `</button>`;

    return code;
}

function listarEquipes() {
    let equipes = getEquipes();
    let equipesHtml = "";

    equipes.forEach(equipe => {
        equipesHtml += htmlEquipe(equipe);
    });

    $("#lista-equipes").html(equipesHtml);
}

listarEquipes();