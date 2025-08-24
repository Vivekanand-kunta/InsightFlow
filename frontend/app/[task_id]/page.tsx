'use client';
import React, { useEffect, useState } from 'react';
import { useParams} from 'next/navigation';
import { Database, Email, Script } from '@/datatypes';
import { fetchTask,checkTask } from '@/components/functions/fetching';
import TaskContainer from '@/components/FunctionalComponents/TaskContainer'
const Task = () => {
  const params = useParams();
  const task_id = params.task_id as string;

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [databases, setDatabases] = useState<Database[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [scripts, setScripts] = useState<Script[]>([]);


  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initFunction = async () => {
      const oldTask: boolean = await checkTask(task_id);
      if (oldTask) {
        try {
          const task = await fetchTask(task_id);
          setTitle(task.title || 'Enter the title');
          setDescription(task.description || 'Enter some description');
          setFrequency(task.frequency || 'daily');
          setDatabases(task.databases || []);
          setEmails(task.emails || []);
          setScripts(task.scripts || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setTitle('Enter the title');
        setDescription('Enter some description');
        setFrequency('daily');
        setDatabases([]);
        setEmails([]);
        setScripts([]);
        setLoading(false);
      }
    };
    initFunction();
  }, [task_id]); 
  
  if (loading) return <p>Loading...</p>;
  return (
    <div>
     <TaskContainer 
     task_id={task_id}
     title={title}
    description={description}
    frequency={frequency}
    databases={databases}
    emails={emails}
    scripts={scripts}
    setTitle={setTitle}
    setDescription={setDescription}
    setFrequency={setFrequency}
    setDatabases={setDatabases}
    setEmails={setEmails}
    setScripts={setScripts}
    />
    </div>
  );
};

export default Task;
