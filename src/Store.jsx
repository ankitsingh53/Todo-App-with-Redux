import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASK = "task/fetch";

const initialState = {
  task: [],
};

const taskreducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };

    case DELETE_TASK:
      const updatedTask = state.task.filter((item, index) => {
        return index !== action.payload;
      });
      return {
        ...state,
        task: updatedTask,
      };

    case FETCH_TASK:
      return {
        ...state,
        task: [...state.task, ...action.payload],
      };

    default:
      return state;
  }
};

//  create store
export const store = createStore(taskreducer, applyMiddleware(thunk));

// ------Action Creator---------
export const addTask = (data) => {
  return { type: ADD_TASK, payload: data };
};
export const deleteTask = (id) => {
  return { type: DELETE_TASK, payload: id };
};

// ----redux thunk------
export const fetchTask = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
      )
      const task = await res.json();
      dispatch({
        type: FETCH_TASK,
        payload: task.map((currentItem) => currentItem.title),
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// ---calling----

store.dispatch(addTask("Buy Something"))
store.dispatch(addTask("Buy Apple"))
store.dispatch(addTask("Buy Banana"))
// console.log(store.getState())
