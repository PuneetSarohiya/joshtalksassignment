
export const FETCH_TASK_DETAILS = "FETCH_TASK_DETAILS"; 

export function loadtasksDetails(data) {
  return {
    type: FETCH_TASK_DETAILS,
    tasks: data,
  };
}

