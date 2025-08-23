'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 
import { generateTaskId } from "@/components/functions/functionalities";
import { fetchTasks } from "@/components/functions/fetching";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState(null);
  
  useEffect(() => {
    const loadTasks = async () => {
      const task_data = await fetchTasks();
      setTasks(task_data.tasks);
    };
    loadTasks();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
      <Button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => {
          const id = generateTaskId();  
          router.push(`/${id}?task_new_option=true`); 
        }}
      >
        +
      </Button>
    </div>
  );
}
