import {
    FETCH_TASK_DETAILS
  } from "../Action/Appaction";
  
  const initialState = {
  tasks:[]
  };
  
  const Appreducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TASK_DETAILS:
        return {
          ...state,
          tasks: action.tasks,
        };
      default:
        return state;
    }
  };

  export const getAgentsTasksDetails = (state)=> state.app.tasks
  
  export default Appreducer;
  