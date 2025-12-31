const express = require('express');
const path = require('path');
const { status } = require('minecraft-server-util');

const app = express();
const MINECRAFT_SERVER = "bacalaomc.aternos.me";
const MINECRAFT_PORT = 25565;

app.use(express.static(path.join(__dirname)));

app.get('/status', async (req, res) => {
    try {
        const response = await status(MINECRAFT_SERVER, MINECRAFT_PORT);
        res.json({
            online: true,
            players: response.players.online,
            maxPlayers: response.players.max
        });
    } catch {
        res.json({ online: false, players: 0, maxPlayers: 0 });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor web BacalaoMC activo en puerto ${PORT}`));
