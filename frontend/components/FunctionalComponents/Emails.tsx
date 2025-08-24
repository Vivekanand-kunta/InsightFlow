import React from 'react'
import { EmailsProps } from '@/datatypes'
import { Input } from '../ui/input';
import {Button} from '../ui/button';
import { updateEmailConnection } from '../functions/fetching';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Emails = (props:EmailsProps) => {
    const [modified,setModified]=useState<boolean>(false);
  return (
    <div>
         <Select
            defaultValue={props.email.category }
            onValueChange={(value) =>
              props.setEmails(prevValues =>
                prevValues.map(e =>
                  e.e_id === props.email.e_id ? { ...e, category: value } : e
                )
              )} >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Category type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="failures">Alerts Only</SelectItem>
          <SelectItem value="alerts">Failures Only</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

        <Input type="text" 
        value={props.email.email} 
        onChange={(e) => {
          props.setEmails(prevValues =>
            prevValues.map(email_=>
              email_.e_id === props.email.e_id
                ? { ...email_, email: e.target.value }
                : email_
            )
          );
          setModified(true);
        }}
        className='w-full mb-2' placeholder='Email'/>

        {modified &&
        <Button onClick={async()=>{
            try{
            await updateEmailConnection(props.email.e_id,props.email.category,props.email.email);
            setModified(false)
            }
            catch(err){
                console.error(err);
                throw new Error("Failed to update Email details")
            };
        }}>Update</Button>
    }
    </div>
  )
}

export default Emails
