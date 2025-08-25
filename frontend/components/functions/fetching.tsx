import { Task } from "@/datatypes";
import { validateTask } from "./functionalities";

// Get requests

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
      const res = await response.json();
      return res.task;
    } catch (err) {
      console.error("\n functions/fetching/ \n Error fetching task:", err);
      throw new Error("Failed to fetch task data");
    }
  };
  
export async function fetchTaskScript(task_id:string,filename:string){
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${task_id}/script/${filename}.py`
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









// Post requests

export async function uploadTask(task_id:string,task_data:Task){
    try{
        if(validateTask(task_data)){
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
            alert('Please fill title,emails,description and frequency fields');
            return {"status":'failed'};
        }
  }
    catch(err){
        console.error("\n functions/fetching/ \n Error uploading task:", err);
        throw new Error("Failed to upload task data");
    }
};

export async function uploadScript(task_id: string, filename: string, file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${task_id}/script/${filename}.py`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to upload script. Status: ${response.status}`);
    }
    const url = await fetchTaskScript(task_id, filename);
    return url;
  } catch (err) {
    console.error("\n functions/fetching/ \n Error uploading script:", err);
    throw new Error("Failed to upload script data");
  }
};


export async function checkScript(task_id:string,filename:string){
  try{
    const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/validate/script`,
      {method:'POST',headers:{"Content-Type":'application/json'},
      body:JSON.stringify({task_id,'script_name':filename})}
      );
  if(!response.ok){
    throw new Error(`Failed to fetch script status . Status: ${response.status}`);
  }
  const res=await response.json()
  return res.exists==='true'?true:false
}
  catch(err){
      console.error("\n functions/fetching/ \n Error fetching tasks:", err);
      throw new Error("Failed to fetch tasks data");
}
};

export async function checkTask(task_id:string){
  try{
    const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/validate/task`,
      {method:'POST',headers:{"Content-Type":'application/json'},body:JSON.stringify({task_id})}
      );
    if(!response.ok){
      throw new Error(`Failed to fetch tasks status . Status: ${response.status}`);
    }
    const res=await response.json()
    return res.exists==='true'?true:false
  }
  catch(err){
    console.error("\n functions/fetching/ \n Error fetching tasks:", err);
    throw new Error("Failed to fetch tasks data");
  }
};

export async function updateScriptsConnection(task_id:string,s_id:string,exe_order:string,script_name:string){
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/script/${s_id}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },  // <-- add this
      body: JSON.stringify({
        exe_order: exe_order,
        script_name: script_name,
        task_id: task_id
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to update script. Status : ${response.status}`);
    }
    const res = await response.json();
    return res;
  } 
  catch(err){
    console.error("\n functions/fetching/ \n Error uploading script:", err);
    throw new Error("Failed to upload script data");
  }
};
