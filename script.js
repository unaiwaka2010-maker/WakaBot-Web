function copiarIP() {
    const ip = document.getElementById("ip").innerText;
    navigator.clipboard.writeText(ip);
    alert("IP copiada: " + ip);
}
