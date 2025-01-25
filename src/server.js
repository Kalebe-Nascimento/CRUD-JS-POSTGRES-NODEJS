const express = require('express');
const todosRoutes = require("./todos.routes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(todosRoutes);
app.use(cors());

app.get("/health", (req, res) => {
    return res.json("ola mundo");
});

app.listen(3030, () => console.log("Server up in 3030"));