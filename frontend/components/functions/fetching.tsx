export async function fetchtask(task_id: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/${task_id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch task. Status: ${response.status}`);
      }
      const task = await response.json();
      return task.task;
    } catch (err) {
      console.error("\n functions/fetching/ \n Error fetching task:", err);
      throw new Error("Failed to fetch task data");
    }
  }
  
  export async function fetchtaskScript(task_id:string,filename:string){
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
  }