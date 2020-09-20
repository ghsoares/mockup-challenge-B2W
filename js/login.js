import {getFuncionarioByEmail} from "./fakedb.js";
import {setCookie, removeCookie, getCookie, addStorageValue, removeStorageValue, getStorageValue} from "./storage.js";

/*
Esse script usa o fakedb.js para autenticar o usuário e
storage.js para lembrar do usuário
*/

// Erros de autenticação
const LOGIN_ERRO_EMAIL = 1;
const LOGIN_ERRO_SENHA = 2;

// Caso o form foi enviado, bloqueia o duplo envio em caso de lag
let submitted = false;

// Função assíncrona que valida o form, caso não validar, chama a função reject com o erro
async function validarForm(email, senha) {
    return new Promise((resolve, reject) => {
        var funcionario = getFuncionarioByEmail(email);
        if (funcionario == null) {
            reject(LOGIN_ERRO_EMAIL);
            return;
        }
        if (funcionario.senha != senha) {
            reject(LOGIN_ERRO_SENHA);
            return;
        }
        resolve();
    });
}

// Redireciona para a página principal e "seta" o id do usuário ao armazenamento da sessão
function redirectPrincipal(id) {
    sessionStorage.setItem("usuario", id);
    window.location = "principal.html";
}

// Checa se o navegador lembra o usuário, bloqueia o form, checa nos cookies e o storage local
// para validar o login, caso não tiver ou o login for inválido, desbloqueia o form. Caso
// lembra e for válido o login, redireciona para a página principal
function checkIfRememberLogin() {
    if (getCookie("lembrar") == "true") {
        let email = getStorageValue("lembrar-usuario");
        let senha = getStorageValue("lembrar-senha");

        $("#login-form").addClass("logging");
        $("#form-submit").prop("disable", true);

        validarForm(email, senha).then(() => {
            redirectPrincipal(getFuncionarioByEmail(email).id);
        }).catch(err => {
            if (err === LOGIN_ERRO_EMAIL || err === LOGIN_ERRO_SENHA) {
                $(this).removeClass("logging");
                $("#form-submit").prop("disable", false);
            }
        });
    }
}

// Função chamada quando é enviado o form,
// bloqueia a validação nativa de email, telefone, etc. mas
// não recarrega a página no envio, dando um feedback ao usuário maior
$("#login-form").submit(function() {
    if (submitted) {
        return false;
    }
    var values = $(this).serializeArray();
    var email = values[0].value;
    var senha = values[1].value;
    var remember = false;
    if (values.length > 2) {
        remember = values[2].value === "on";
    }

    $(this).addClass("logging");
    $("#form-submit").prop("disable", true);

    $("#email").removeClass("is-invalid");
    $("#paswd").removeClass("is-invalid");

    validarForm(email, senha).then(() => {
        if (remember) {
            var querySetCookies = new Promise((resolve) => {
                setCookie("lembrar", "true");
                addStorageValue("lembrar-usuario", email);
                addStorageValue("lembrar-senha", senha);
                resolve();
            });
            querySetCookies.then(() => {
                redirectPrincipal(getFuncionarioByEmail(email).id);
            });
        } else {
            var querySetCookies = new Promise((resolve) => {
                removeCookie("lembrar");
                removeStorageValue("lembrar-usuario");
                removeStorageValue("lembrar-senha");
                resolve();
            });
            querySetCookies.then(() => {
                redirectPrincipal(getFuncionarioByEmail(email).id);
            });
        }
        submitted = true;
    }).catch((err) => {
        if (err === LOGIN_ERRO_EMAIL) {
            $("#email").addClass("is-invalid");
        } else if (err === LOGIN_ERRO_SENHA) {
            $("#paswd").addClass("is-invalid")
        }
        $(this).removeClass("logging");
        $("#form-submit").prop("disable", false);
    });

    return false;
});

// Função chamada quando a página é carregada para checar se lembra o login
checkIfRememberLogin();