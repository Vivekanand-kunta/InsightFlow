'use client';
import { useEffect, useState } from "react";
import axios from "@/app/api/axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState(null);

  const generateTaskId = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyz" +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "0123456789";
    let result = "";
    for (let i = 0; i < 25; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const fetch_tasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      return res.data; 
    } catch (err) {
      console.error("Error fetching tasks:", err);
      return {};
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      const task_data = await fetch_tasks();
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
