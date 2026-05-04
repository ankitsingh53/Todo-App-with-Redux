import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, fetchTask } from "./Store";
import { deleteTask } from "./Store";

function Todo() {
  const [data, setData] = useState("");
  const tasks = useSelector((state) => state.task);
    // console.log(tasks);

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(data));
    return setData("")
  };
  
  const handleDelete = (id)=>{
    return dispatch(deleteTask(id))
  }

  const handleFetchTasks = ()=>{
    dispatch(fetchTask())
  }

  return (
    <>
      <div className="Container">
        <h1>Todo App</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter your task"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button type="submit">ADD TASK</button>
        </form>
        <div>

          <button onClick={handleFetchTasks}>Fetch Task</button>

          <ul>
            {tasks.map((item, index) => {
              return (
                <li key={index}>
                  <p>
                    {index}: {item}{" "}
                  </p>
                  <button onClick={()=>handleDelete(index)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
export default Todo;
