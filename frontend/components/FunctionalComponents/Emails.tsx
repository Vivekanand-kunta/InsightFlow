import React from 'react'
import { EmailsProps } from '@/datatypes'
import { Input } from '../ui/input';
import {Button} from '../ui/button';
import { updateEmailConnection } from '../functions/fetching';
import { useState } from 'react';

const Emails = (props:EmailsProps) => {
    const [modified,setModified]=useState<boolean>(false);
  return (
    <div>
        <Input type="text" 
        value={props.email.cateogry} 
        onChange={(e)=>{props.setEmails([...props.emails,{...props.email,cateogry:e.target.value}]);setModified(true);}} 
        className='w-full mb-2' placeholder='Email Category'/>

        <Input type="text" 
        value={props.email.email} 
        onChange={(e)=>{props.setEmails([...props.emails,{...props.email,email:e.target.value}]);setModified(true);}} 
        className='w-full mb-2' placeholder='Email'/>

        {modified &&
        <Button onClick={async()=>{
            try{
            await updateEmailConnection(props.email.e_id,props.email.cateogry,props.email.email);
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
