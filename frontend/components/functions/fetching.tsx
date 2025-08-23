import { Task } from "@/datatypes";
import { validateTask } from "./functionalities";

export async function fetchTasks(){
  try{
    const res=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`);
    if(!res.ok){
      throw new Error(`Failed to fetch tasks. Status: ${res.status}`);
    }
    const tasks=await res.json();
    return tasks;
  }
  catch(err){
    console.error("\n functions/fetching/ \n Error fetching tasks:", err);
    throw new Error("Failed to fetch tasks data");
  }
};


export async function fetchTask(task_id: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${task_id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch task. Status: ${response.status}`);
      }
      const task = await response.json();
      return task;
    } catch (err) {
      console.error("\n functions/fetching/ \n Error fetching task:", err);
      throw new Error("Failed to fetch task data");
    }
  };
  
  export async function fetchTaskScript(task_id:string,filename:string){
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${task_id}/script/${filename}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch script. Status: ${response.status}`);
      }
      const scriptBlob = await response.blob();
      return URL.createObjectURL(scriptBlob);
    } catch (err) {
      console.error("\n functions/fetching/ \n Error fetching task script:", err);
      throw new Error("Failed to fetch task script");
    }
  };

  export async function uploadTask(task_id:string,task_data:Task){
    try{
        if(validateTask(task_data.title,task_data.emails,task_data.scripts)==false){

            const response =await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${task_id}`,
                {method:"POST",headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(task_data)
            });

            if(!response.ok){
                throw new Error(`Failed to upload task. Status: ${response.status}`);
            }
            const res = await response.json();
            return res;
        }
        else{
            alert('Please fill title,emails and script fields');
            return {"status":'failed'};
        }
  }
    catch(err){
        console.error("\n functions/fetching/ \n Error uploading task:", err);
        throw new Error("Failed to upload task data");
    }
  };