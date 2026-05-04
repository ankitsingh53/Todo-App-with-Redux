import {createStore} from "redux"

const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";

const initialState = {
    task: [],
}

const taskreducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_TASK:
            return{
                ...state, 
                task:[ ...state.task ,action.payload],
            };

        case DELETE_TASK:
            const updatedTask = state.task.filter((item, index) =>{
                return index !== action.payload
            })
            return{
                ...state, 
                task: updatedTask
            };

        default: 
        return state

    }
};

//  create store 
export const store = createStore(taskreducer);

// ------Action Creator---------
export const addTask = (data)=>{
    return {type: ADD_TASK, payload: data};
}
export const deleteTask = (id)=>{
    return {type: DELETE_TASK, payload:id};
}

// ---calling----

store.dispatch(addTask("Buy Something"))
store.dispatch(addTask("Buy Apple"))
store.dispatch(addTask("Buy Banana"))
console.log(store.getState())

