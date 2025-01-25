import logo from './logo.svg';
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";


const arrayTodos = [
  { name: "Fazer Diagramas POO", status: true },
  { name: "Jogar com os amigos", status: false },
];

const Todos = ({ todos }) => {
  return (
    <div className="todos">
      {todos.map((todo, index) => {
        return (
          <div className="todo" key={index}>
            <p>{todo.name}</p>
            <button className="checkbox" style={{ backgroundColor: todo.status ? "blue" : "white" }}></button>
            <button>
              <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
            </button>
            <button>
              <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
            </button>
          </div>
        );
      })}
    </div>
  );
}; 

function App() {
  async function getTodos() {
    const response = await axios.get("http://localhost:3030/todos");
    console.log(response);
  }

  const [todos,setTodos] = useState([]);
  useEffect(() => {
    getTodos();
  });
  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Lista de Tarefas!</h1>
        </div>
        <Todos todos={arrayTodos}/>
        <input className="inputName"></input>
        <button className='newTaskButton'>+ Nova Tarefa</button>
      </header>
    </div>
  );
}

export default App;
