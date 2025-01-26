const express = require("express");

const allTodos = [{name: "kalebe", status:false}];

const todosRoutes = express.Router();

const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const router = express.Router();

router.get("/todos", (req, res) => {
    res.json([
        { id: 1, tarefa: "Estudar Node.js", status: "pendente" },
        { id: 2, tarefa: "Criar projeto CRUD", status: "concluído" }
    ]);
});

module.exports = router;

//C
todosRoutes.post("/todos",async (request,response) => {
    const {name} =  request.body;
    const todo = await prisma.todo.create({
        data: {
        name,
        },
    });
    return response.status(201).json(todo);
});

//R
todosRoutes.get("/todos", async (request, response) => {
    const todos = await prisma.todo.findMany();
    return response.status(200).json(todos);
});
//U

todosRoutes.put("/todos", async (request,response) => {
    const { name, id ,status } = request.body;

    if(!id){
        return response.status(400).json("ID is mandatory");
    }
    const todoAlreadyExist = await prisma.todo.findUnique({where: {id}});

    if(!todoAlreadyExist){ 
        return response.status(404).json("ToDO not found ID");
    }

     
    const todo = await prisma.todo.update({
        where:{
            id,
        },
        data:{
            name,
            status,
        },
    });
    return response.status(200).json(todo);
});

//D

todosRoutes.delete("/todos/:id", async (request, response) =>{

    const { id } = request.params;
    const intID = parseInt(id)

    if(!intID){
        return response.status(400).json("ID is mandatory");
    }
    const todoAlreadyExist = await prisma.todo.findUnique({where: {id:intID}});

    if(!todoAlreadyExist){ 
        return response.status(404).json("ToDO not found ID");
    }
    await prisma.todo.delete({ where: {id:intID}});
    return response.status(200).send();
});

module.exports = todosRoutes;

