import React from 'react'
import { useRef } from 'react';
import { ScriptProps} from '@/datatypes'
import { Input } from '../ui/input';
import InputFilesForm from './InputFilesForm';
import {useState} from 'react';

const Scripts = (props:ScriptProps) => {
    const exeRef=useRef<HTMLInputElement|null>(null);
    const scriptNameRef=useRef<HTMLInputElement|null>(null);
    const [scriptModified,setScriptModified]=useState<boolean>(false)
  return (
    <div className='m-4 py-3'>
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
            setScriptModified(true);
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
            setScriptModified(true);
          }} className='w-full mb-2' placeholder='Script Name'/>
         <InputFilesForm filename={props.script.s_id} scriptModified={scriptModified} 
         scriptname={props.script.script_name} exe_order={props.script.exe_order}
         task_id={props.task_id} setScriptModified={setScriptModified} />
    </div>
  )
}

export default Scripts
