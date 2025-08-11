'use client';
import { Input } from "@/components/ui/input";
import Databases from "@/components/FuntionalComponents/Databases";
import Schedule from "@/components/FuntionalComponents/Schedule";
import Scripts from "@/components/FuntionalComponents/Scripts";
import Email from "@/components/FuntionalComponents/Email";
import { Button } from "@/components/ui/button";
import React, { useState, Dispatch, SetStateAction } from "react";

type Logs = {
  time: string;
  status: "failure" | "success";
};

type Task = {
  title: string;
  task_id: string;
  creation_time: string;
  schedule_freq: string;
  logs: Logs[];
};

type Prop = {
  field_id: string;
  connection: string;
};

type InputProp = {
  setTask: Dispatch<SetStateAction<Task[]>>;
  toggle:()=>void;
};

const Add = ({ setTask,toggle }: InputProp) => {
  const [title, setTitle] = useState<string>("");
  const [databases, setDatabases] = useState<Prop[]>([]);
  const [email, setEmail] = useState<Prop[]>([]);
  const [schedule, setSchedule] = useState<string>("daily");

  const getCurrentTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const generateRandomString = (length: number): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const updateTask = () => {
    if (title.trim() === "" || databases.length === 0 || email.length === 0) {
      alert("All credentials must be entered");
      return false;
    }
    const newTask: Task = {
      title,
      task_id: generateRandomString(15),
      creation_time: getCurrentTime(),
      schedule_freq: schedule,
      logs: [],
    };
    setTask((prev) => [...prev, newTask]);
    return true
  };

  return (
    <div className="mx-auto w-[70vw]">
      <div className="mt-15 flex justify-center">
        <h1 className="font-bold text-4xl">Task Desk</h1>
      </div>
      <div className="mt-15 mx-auto">
        <Input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          value={title}
        />
      </div>
      <Databases databases={databases} setDatabases={setDatabases} />
      <Scripts />
      <Schedule schedule={schedule} setSchedule={setSchedule} />
      <Email databases={email} setDatabases={setEmail} />
      <div className="my-5 flex justify-around align-center">
        <Button
          className="w-[7.5vw] min-w-[75px] min-h-[37.5px] h-[5vh]"
          onClick={()=>{if(updateTask()){toggle()};}}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default Add;
