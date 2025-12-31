// Función existente para copiar IP
function copiarIP() {
    const ip = document.getElementById("ip").innerText;
    navigator.clipboard.writeText(ip);
    alert("IP copiada: " + ip);
}

// Nueva función para actualizar el estado del servidor
async function actualizarEstado() {
    const res = await fetch('/status');
    const data = await res.json();
    const statusBox = document.querySelector('.status-box');

    if (data.online) {
        statusBox.classList.add('online');
        statusBox.innerHTML = `<span class="dot"></span><p>Servidor ONLINE</p><small>Jugadores: ${data.players} / ${data.maxPlayers}</small>`;
    } else {
        statusBox.classList.remove('online');
        statusBox.innerHTML = `<span class="dot"></span><p>Servidor OFFLINE</p>`;
    }
}

// Ejecutar al cargar la página y actualizar cada 30 segundos
actualizarEstado();
setInterval(actualizarEstado, 30000);
