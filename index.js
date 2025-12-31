// -------------------- EXPRESS PARA RENDER --------------------
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Rutas para servir la web
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Puerto para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Web Service activo en puerto ${PORT}`));


// -------------------- BOT DE DISCORD --------------------
import { Client, GatewayIntentBits } from "discord.js";

const TOKEN = process.env.TOKEN;
if (!TOKEN) {
  console.error("❌ ERROR: La variable de entorno TOKEN no está definida.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (msg.content !== "!verify") return;
  if (!msg.guild) return;

  const role = msg.guild.roles.cache.find(r => r.name === "Verificado");
  if (!role) return msg.reply("❌ Rol 'Verificado' no existe");

  try {
    await msg.member.roles.add(role);
    msg.reply("🐟 Verificado correctamente. Ya puedes entrar a BacalaoMC");
  } catch (error) {
    console.error("❌ Error al asignar rol:", error);
    msg.reply("❌ No se pudo asignar el rol. Contacta con un admin.");
  }
});

client.login(TOKEN).catch((err) => {
  console.error("❌ No se pudo iniciar sesión. Token inválido o problemas de conexión.", err);
  process.exit(1);
});
