import React from 'react'
import { useRef } from 'react';
import { ScriptProps} from '@/datatypes'
import { Input } from '../ui/input';
import {Button} from '../ui/button';
import { updateScriptsConnection } from '../functions/fetching';
import { useState } from 'react';
import InputFilesForm from './InputFilesForm';

const Scripts = (props:ScriptProps) => {
    const [modified,setModified]=useState<boolean>(false);
    const exeRef=useRef<HTMLInputElement|null>(null);
    const scriptNameRef=useRef<HTMLInputElement|null>(null);
  return (
    <div>
        <Input type="text" 
        value={props.script.exe_order} 
        ref={exeRef}
        onChange={(e)=>{props.setScripts(prevValues=>[...prevValues,{...props.script,exe_order:e.target.value}]);setModified(true);}} 
        className='w-full mb-2' placeholder='Exe-Order Number'/>

        <Input type="text" 
        value={props.script.script_name} 
        ref={scriptNameRef}
        onChange={(e)=>{props.setScripts(prevValues=>[...prevValues,{...props.script,script_name:e.target.value}]);setModified(true);}} 
        className='w-full mb-2' placeholder='Script Name'/>

        {modified && exeRef.current && scriptNameRef.current &&
        <div>
        <InputFilesForm filename={scriptNameRef.current.value}
         task_id={props.task_id} url={props.url} setUrls={props.setUrls}/>
        {
        props.url &&
        <Button onClick={async()=>{
            try{
            await updateScriptsConnection(props.task_id,props.script.s_id,props.script.exe_order,props.script.script_name);
            setModified(false)
            }
            catch(err){
                console.error(err);
                throw new Error("Failed to update Scripts")
            };
        }}>Update</Button>
    }
        </div>
    }
    </div>
  )
}

export default Scripts
