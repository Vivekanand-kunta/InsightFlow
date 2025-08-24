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
        onChange={(e) => {
            props.setScripts(prevValues =>
              prevValues.map(sc =>
                sc.s_id === props.script.s_id
                  ? { ...sc, exe_order: e.target.value }
                  : sc
              )
            );
            setModified(true);
          }}
          className='w-full mb-2' placeholder='Exe-Order Number'/>

        <Input type="text" 
        value={props.script.script_name} 
        ref={scriptNameRef}
        onChange={(e) => {
            props.setScripts(prevValues =>
              prevValues.map(sc =>
                sc.s_id === props.script.s_id
                  ? { ...sc, script_name: e.target.value }
                  : sc
              )
            );
            setModified(true);
          }} className='w-full mb-2' placeholder='Script Name'/>
         <InputFilesForm filename={props.script.s_id}
         task_id={props.task_id} setModified={setModified}/>
        {modified && exeRef.current && scriptNameRef.current &&
        <div>
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
    
        </div>
    }
    <Button onClick={()=>{}}>Delete</Button>
    </div>
  )
}

export default Scripts
