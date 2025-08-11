'use client';
import { Input } from "@/components/ui/input";
import Databases from "@/components/FuntionalComponents/Databases";
import Schedule from "@/components/FuntionalComponents/Schedule";
import Scripts from "@/components/FuntionalComponents/Scripts";
import * as React from "react"
import Email from "@/components/FuntionalComponents/Email";
import { Button } from "@/components/ui/button";
import {useState} from "react";
import { Dispatch, SetStateAction } from "react";



type Prop={
  field_id:string;
  connection:string;
}
const card_page = () => {
  const [title,setTitle]=useState<string>('')
  const [databases,setDatabases]=useState<Prop []>([])
  const [email,setEmail]=useState<Prop[]>([])
  const [schedule,setSchedule]=useState<string>("daily")
 
 const titleSetter=(value:string)=>{
  setTitle(value);
 }

  return (
    <div className="mx-auto w-[70vw]">
    <div className="mt-15 flex justify-center">
      <h1 className="font-bold text-4xl">Task Desk</h1>
    </div>
    <div className="mt-15 mx-auto">
      <Input onChange={(e)=>{titleSetter(e.target.value)}} type="text" placeholder="Title" value={title}></Input>
    </div>
    <Databases databases={databases} setDatabases={setDatabases}></Databases>
    <Scripts></Scripts>
    <Schedule schedule={schedule} setSchedule={setSchedule}></Schedule>
    <Email databases={email} setDatabases={setEmail}></Email>
    <div className="my-5 flex justify-around align-center">
        <Button className="w-[7.5vw] min-w-[75px] min-h-[37.5px] h-[5vh]">Update</Button>
        <Button className="w-[7.5vw] min-w-[75px] min-h-[37.5px] h-[5vh]">Delete</Button>
    </div>
    </div>
    
  );
};

export default card_page;