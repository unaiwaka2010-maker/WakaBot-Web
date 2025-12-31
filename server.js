const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor BacalaoMC activo en puerto ${PORT}`));
