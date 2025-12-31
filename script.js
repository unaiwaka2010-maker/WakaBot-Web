// Copiar IP al portapapeles
function copiarIP() {
    const ip = document.getElementById("ip").innerText;
    navigator.clipboard.writeText(ip);
    alert("IP copiada: " + ip);
}

// Mostrar status del servidor
async function actualizarStatus() {
    try {
        const res = await fetch("/status");
        const data = await res.json();

        const statusBox = document.getElementById("server-status");
        const players = document.getElementById("players");

        if (data.online) {
            statusBox.className = "status-box online";
            statusBox.querySelector("p").innerText = "Servidor ONLINE";
            players.innerText = `${data.players} / ${data.maxPlayers}`;
        } else {
            statusBox.className = "status-box offline";
            statusBox.querySelector("p").innerText = "Servidor OFFLINE";
            players.innerText = "- / -";
        }
    } catch (err) {
        console.error(err);
    }
}

// Actualiza cada 10 segundos
actualizarStatus();
setInterval(actualizarStatus, 10000);
