import React from 'react'
import { EmailsProps } from '@/datatypes'
import { Input } from '../ui/input';
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
  return (
    <div>
         <Select
            defaultValue={props.email.category }
            onValueChange={(value) =>{
              props.setEmails(prevValues =>
                prevValues.map(e =>
                  e.e_id === props.email.e_id ? { ...e, category: value } : e
                )
              );
              props.setModified(true);}} >
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
          props.setModified(true);
        }}
        className='w-full mb-2' placeholder='Email'/>

    </div>
  )
}

export default Emails
