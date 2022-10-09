function home() {
    location.href = "Kiosk_first.html";
}

function reset_storage() {
    localStorage.clear();
    sessionStorage.clear();
    for (var i = 0; i < 10; i++) {
        localStorage.removeItem("image" + i);
    }

}