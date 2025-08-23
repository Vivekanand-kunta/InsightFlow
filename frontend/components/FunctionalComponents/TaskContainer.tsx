import React, { useState} from 'react'
import { Input } from '../ui/input';
import { TaskContainerProps, Url} from '@/datatypes';
import Frequency from './Frequency';
import Databases from './Databases';
import Emails from './Emails';
import Scripts from './Scripts';

const TaskContainer = (props: TaskContainerProps) => {
  const [urls, setUrls] = useState<Url[]>([]);

  return (
    <div className='w-full h-auto flex flex-col gap-4 p-4 border border-gray-300 rounded-lg'>
      <div>
        <label className='block mb-2 text-sm font-medium text-gray-900'>Title</label>
        <Input
          type="text"
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          className='w-full'
        />
      </div>

      <div>
        <label className='block mb-2 text-sm font-medium text-gray-900'>Description</label>
        <Input
          type="text"
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
          className='w-full'
        />
      </div>

      <div>
        <label className='block mb-2 text-sm font-medium text-gray-900'>Frequency</label>
        <Frequency frequency={props.frequency} setFrequency={props.setFrequency} />
      </div>

      <div>
        {props.databases.map((database) => (
          <Databases
            key={database.d_id}
            databases={props.databases}
            database={database}
            setDatabases={props.setDatabases}
          />
        ))}
      </div>

      <div>
        {props.emails.map((email) => (
          <Emails
            key={email.e_id}
            emails={props.emails}
            email={email}
            setEmails={props.setEmails}
          />
        ))}
      </div>

      <div>
        {props.scripts.map((script) => {
          const scriptUrl = urls.find((url) => url.s_id === script.s_id) || { url: null, s_id: script.s_id };
          return (
            <Scripts
              key={script.s_id}
              task_id={props.task_id}
              script={script}
              url={scriptUrl}
              setUrls={setUrls}
              setScripts={props.setScripts}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskContainer;
