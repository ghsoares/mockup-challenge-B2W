function setCookie(name, value, expire = "") {
    document.cookie = name + "=" + value + ";" + expire + ";path=/";
}

function removeCookie(name) {
    setCookie(name, "");
}

function addStorageValue(name, value) {
    localStorage.setItem(name, value);
}

function removeStorageValue(name) {
    localStorage.removeItem(name);
}

export {
    setCookie,
    removeCookie,
    addStorageValue,
    removeStorageValue
}