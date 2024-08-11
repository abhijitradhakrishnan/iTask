import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  // Input text todo 
  const [todo, setTodo] = useState("")
  // todos is an array which holds all the todos
  const [todos, setTodos] = useState([])
  // for finished sets
  const [showFinished, setShowFinished] = useState(false)

  // Will run one's and load all are todos from localstorage
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  // Function for saving to local storage
  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  // for finished sets
  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLs()
  }
  
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLs()
  }
  
  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLs()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLs()
  }
  

  return (
    <>
      <Navbar />
      <div className="  md:container md:mx-auto my-5 rounded-md p-5 bg-violet-100 min-h-[85vh] md:w-3/5 "> 
        <h1 className="font-bold text-center text-xl">iTask - Manage your todos at one place</h1>
        <div className="todoContainer mx-20 mt-20">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-full md:w-3/4 rounded-lg px-5 py-2" />
          <button onClick={handleAdd} disabled={todo.length<1} className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-600 p-6 py-2 text-sm font-bold text-white rounded-md mx-6">Add</button>
        </div>
        <input className="my-1 mx-1" onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold my-3 mx-1">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map(item=>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-3/4 my-4 mx-4 justify-between">
              <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1">Edit</button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1">Delete</button>
              </div>
            </div>
          })}
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
