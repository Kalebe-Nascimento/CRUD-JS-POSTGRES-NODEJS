const express = require('express');
const todosRoutes = require("./todos.routes");
const cors = require("cors");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(todosRoutes);

app.get("/health", (req, res) => {
    return res.json("ola mundo");
});

app.get("/", (req, res) => {
    res.send("Bem-vindo ao servidor do CRUD!");
});




app.listen(3030, () => console.log("Server up in 3030"));
