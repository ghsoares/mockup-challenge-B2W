import {encontrarEmail} from "./fakedb.js";
import {setCookie, removeCookie, addStorageValue, removeStorageValue} from "./storage.js";

const LOGIN_ERRO_EMAIL = 1;
const LOGIN_ERRO_SENHA = 2;

let submitted = false;

async function validarForm(email, senha) {
    return new Promise((resolve, reject) => {
        var funcionario = encontrarEmail(email);
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

function redirectPrincipal(email, senha) {
    sessionStorage.setItem("usuario", 0);
    window.location = "principal.html";
}

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
                redirectPrincipal(email, senha);
            });
        } else {
            var querySetCookies = new Promise((resolve) => {
                removeCookie("lembrar");
                removeStorageValue("lembrar-usuario");
                removeStorageValue("lembrar-senha");
                resolve();
            });
            querySetCookies.then(() => {
                redirectPrincipal(email, senha);
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