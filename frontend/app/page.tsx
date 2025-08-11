'use client';
import Image from "next/image";
import Card from "@/components/FuntionalComponents/Card";
import { useState } from "react";
import Add from "@/components/FuntionalComponents/Add";
import { Button } from "@/components/ui/button";
type Logs={
    time:string;
    status: "failure" | "success"
}

type Task={
    title:string;
    task_id:string;
    creation_time:string;
    schedule_freq:string;
    logs:Logs[]
}


export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([
        {
          title: "Daily Backup",
          task_id: "task-001",
          creation_time: "2025-08-10 14:30",
          schedule_freq: "Daily",
          logs: [
            { time: "2025-08-10 14:31", status: "success" },
            { time: "2025-08-09 14:30", status: "failure" },
          ],
        },
        {
          title: "Weekly Report",
          task_id: "task-002",
          creation_time: "2025-08-05 09:00",
          schedule_freq: "Weekly",
          logs: [
            { time: "2025-08-05 09:01", status: "success" },
            { time: "2025-07-29 09:00", status: "success" },
          ],
        },
        {
          title: "Data Sync",
          task_id: "task-003",
          creation_time: "2025-08-01 20:00",
          schedule_freq: "Hourly",
          logs: [],
        },
      ]);
    
    const [dashboard,setDashboard]=useState<boolean>(true )

    const toggle=()=>{setDashboard(prev=>!prev);}
return (
<>
{ dashboard ?
(<div className="mt-20 max-w-[90vw] mx-auto grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
    {tasks.map((task)=>(<Card key={task.task_id} props={task}/>))}
    <Button className="absolute rounded-4xl h-[60px] w-[60px] top-11 text-4xl bg-gray-800" onClick={toggle} >+</Button>
</div>):(
<>
<Add setTask={setTasks} toggle={toggle}/>
<Button className="absolute rounded-4xl h-[60px] w-[60px] top-11 left-23 text-2xl bg-gray-800" onClick={toggle} >Back</Button>
</>
)
}
</>
);
}