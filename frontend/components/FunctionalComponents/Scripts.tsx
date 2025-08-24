import React from 'react'
import { useRef } from 'react';
import { ScriptProps} from '@/datatypes'
import { Input } from '../ui/input';
import InputFilesForm from './InputFilesForm';

const Scripts = (props:ScriptProps) => {
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
            props.setModified(true);
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
            props.setModified(true);
          }} className='w-full mb-2' placeholder='Script Name'/>
         <InputFilesForm filename={props.script.s_id}
         task_id={props.task_id} setModified={props.setModified}/>
    </div>
  )
}

export default Scripts
