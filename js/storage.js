/*
Módulo para gerenciamento de cookies e storage local
*/

// "seta" um cookie
function setCookie(name, value, expire = "") {
    var expireDate = expire;
    if (expireDate == "") {
        var date = new Date(Date.now());
        date.setFullYear(date.getFullYear + 9999);
        expireDate = date.toUTCString();
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";" + encodeURIComponent(expireDate) + ";path=/";
}

// remove um cookie
function removeCookie(name) {
    setCookie(name, "");
}

// pega o valor de um cookie caso exista
function getCookie(name) {
    name += "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// adiciona um valor ao storage local
function addStorageValue(name, value) {
    localStorage.setItem(name, value);
}

// remove um valor do storage local
function removeStorageValue(name) {
    localStorage.removeItem(name);
}

// pega um valor do storage local
function getStorageValue(name) {
    return localStorage.getItem(name);
}

export {
    setCookie,
    removeCookie,
    getCookie,
    addStorageValue,
    removeStorageValue,
    getStorageValue
}