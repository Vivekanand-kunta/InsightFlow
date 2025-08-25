import React from 'react'
import { Input } from '../ui/input';
import { TaskContainerProps,Script,Database, Email,Task} from '@/datatypes';
import Frequency from './Frequency';
import Databases from './Databases';
import Emails from './Emails';
import Scripts from './Scripts';
import { Button } from '../ui/button';
import { generateTaskId } from '../functions/functionalities';
import {useState} from 'react'
import { uploadTask } from '../functions/fetching';

const TaskContainer = (props: TaskContainerProps) => {
    const [modified,setModified]=useState<boolean>(false);

  return (
    <div className='w-full h-auto flex flex-col gap-4 p-4 border border-gray-300 rounded-lg'>
      <div>
        <label className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
        <Input
          type="text"
          value={props.title}
          onChange={(e) =>{props.setTitle(e.target.value);setModified(true);}}
          className='w-full'
        />
      </div>

      <div>
        <label className='block mb-2 text-sm font-medium text-gray-900'>Description</label>
        <Input
          type="text"
          value={props.description}
          onChange={(e) => {props.setDescription(e.target.value);setModified(true)}}
          className='w-full'
        />
      </div>

      <div>
        <label className='block mb-2 text-sm font-medium text-gray-900'>Frequency</label>
        <Frequency frequency={props.frequency} setModified={setModified} setFrequency={props.setFrequency} />
      </div>

      <div>
        <h1>Database</h1>
        <Button onClick={()=>{
            const databaseNew:Database={
              db_connection:'postgresql://username:password@host:port/database',
              d_id: generateTaskId(),
              db_name:'Enter database Name'}  
              props.setDatabases(prevValues=>[...prevValues,databaseNew]);
              }}/> 
        {props.databases.map((database) => (
          <Databases
            key={database.d_id}
            setModified={setModified}
            database={database}
            setDatabases={props.setDatabases}
          />
        ))}
      </div>

      <div>
        <h1>Emails</h1>
        <Button onClick={()=>{
          const emailNew:Email={category:'all',e_id:generateTaskId(),email:'email123@gmail.com'}
          props.setEmails(prevValues=>[...prevValues,emailNew])
        }} />
        {props.emails.map((email) => (
          <Emails
            key={email.e_id}
            setModified={setModified}
            email={email}
            setEmails={props.setEmails}
          />
        ))}
      </div>

      <div>
        <h1>Scripts</h1>
      <Button onClick={()=>{
          const scriptNew:Script={script_name:'NewScript.py',s_id:generateTaskId(),exe_order:'1'}
          props.setScripts(prevValues=>[...prevValues,scriptNew])
        }} />
        {props.scripts.map((script) => (
          <Scripts
            key={script.s_id}
            task_id={props.task_id}
            script={script}
            setScripts={props.setScripts}
          />
        ))}
      </div>
      {modified && <div>
        <Button
        onClick={async()=>{
          const taskData: Task = {
            title: props.title,
            description: props.description,
            frequency: props.frequency,
            databases: props.databases,
            emails: props.emails,
            scripts: props.scripts,
          };
          const res=await uploadTask(props.task_id,taskData);setModified(false);
        setModified(false);}}
        >Submit</Button>
      </div>}
    </div>
  );
};

export default TaskContainer;
