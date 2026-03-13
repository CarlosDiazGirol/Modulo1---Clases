// src/server.js
import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`CRUD API corriendo en http://localhost:${PORT}`);
});
