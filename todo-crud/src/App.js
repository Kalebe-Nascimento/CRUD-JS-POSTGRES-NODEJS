import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Todos = ({ todos }) => {
  console.log(todos); // Verifique se o todos está vindo corretamente
  return (
    <div className="todos">
      {todos.map((todo, index) => {
        return (
          <div className="todo" key={index}>
            <p>{todo.name}</p>
            <button
              className="checkbox"
              style={{
                backgroundColor: todo.status ? "blue" : "white",
              }}
            ></button>
            <button>
              <AiOutlineEdit size={20} color={"#64697b"} />
            </button>
            <button>
              <AiOutlineDelete size={20} color={"#64697b"} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

function App() {
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    try {
      const response = await axios.get("http://localhost:3030/todos");
      console.log(response.data); // Adicionando log para verificar o formato da resposta
      setTodos(response.data); 
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []); 

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Lista de Tarefas!</h1>
        </div>
        <Todos todos={todos} />
        <input className="inputName" placeholder="Nova tarefa..." />
        <button className="newTaskButton">+ Nova Tarefa</button>
      </header>
    </div>
  );
}

export default App;
