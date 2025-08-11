import { Input } from "@/components/ui/input";
import Databases from "@/components/FuntionalComponents/Databases";
import Scripts from "@/components/FuntionalComponents/Scripts";
import * as React from "react"
import Email from "@/components/FuntionalComponents/Email";
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
type Params = {
  params: { task_id: string };
};

const page = ({ params: { task_id } }: Params) => {
  return (
    <div className="mx-auto w-[70vw]">
    <div className="mt-20 mx-auto">
      <Input type="text" placeholder="Title"></Input>
    </div>
    <Databases></Databases>
    <Scripts></Scripts>
    <div className="mt-10 flex justify-between align-center">
        <div><h3 className="font-bold text-2xl">Schedule</h3></div>
        <div className="w-[40vw]">
        <Select  >
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Scheduling Interval" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quaterly">Quaterly</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
        </div>
    </div>
    <Email></Email>
    <div className="my-5 flex justify-around align-center">
        <Button className="w-[7.5vw] min-w-[75px] min-h-[37.5px] h-[5vh]">Add</Button>
        <Button className="w-[7.5vw] min-w-[75px] min-h-[37.5px] h-[5vh]">Delete</Button>
    </div>
    </div>
    
  );
};

export default page;