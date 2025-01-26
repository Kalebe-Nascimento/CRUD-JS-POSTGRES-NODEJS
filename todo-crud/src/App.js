import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();


  const Todos = ({ todos }) => {
    console.log(todos); // Verifique se o todos está vindo corretamente
    return (
      <div className="todos">
        {todos.map((todo, index) => {
          return (
            <div className="todo" key={index}>
              <p>{todo.name}</p>
              <button
                onClick={() => modifyStatusTodo(todo)}
                className="checkbox"
                style={{ backgroundColor: todo.status ? "purple" : "white" }}
              ></button>
                <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
              </button>
              <button onClick={()=> deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"} />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility);
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisibility(true);
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3030/todos", 
    {name: inputValue});
    getTodos();
    setInputVisibility(!inputVisibility);
    setInputValue("");
  }; 

  async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3030/todos/${todo.id}`
    );
    getTodos();
  }

  async function modifyStatusTodo(todo) {
    const response = await axios.put("http://localhost:3030/todos", {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }

  async function editTodo() {
    const response = await axios.put("http://localhost:3030/todos", {
      id: selectedTodo.id,
      name: inputValue,
    });
    setSelectedTodo();
    setInputVisibility(false);
    getTodos();
    setInputValue("");
  }

  async function getTodos() {
    try {
      const response = await axios.get("http://localhost:3030/todos");
      console.log(response.data); 
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
        <input value={inputValue}
            style={{display: inputVisibility ? "block" : "none"}} 
            onChange={(event)=>{
            setInputValue(event.target.value);
        }} className="inputName" placeholder="Nova tarefa..." />
        <button
          onClick={
            inputVisibility? selectedTodo? editTodo: createTodo: handleWithNewButton
          }
          className="newTaskButton">
          {inputVisibility ? "Confirmar" : "+ Nova Tarefa"}
        </button>
      </header>
    </div>
  );
}

export default App;
