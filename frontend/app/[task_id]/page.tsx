'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Database, Email, Script } from '@/datatypes';
import TaskCard from '@/components/FunctionalComponents/TaskCard';
import { fetchTask,fetchTaskScript,uploadTask } from '@/components/functions/fetching';

const Task = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const isnewTask: string | null = searchParams.get('task_new_option');
  const task_id = params.task_id as string;

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [databases, setDatabases] = useState<Database[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [urls,setUrls]=useState<string[]>([]);

  useEffect(() => {
    if ((isnewTask === null || isnewTask === 'false')) {
      (async () => {
        try {
          const task = await fetchTask(task_id);
          console.log('Fetched task data:', task);

          setTitle(task.title || '');
          setDescription(task.description || '');
          setFrequency(task.frequency || '');
          setDatabases(task.databases || []);
          setEmails(task.emails || []);
          setScripts(task.script || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [task_id, isnewTask]);


  if (loading) return <p>Loading...</p>;

  return (
    <div>
      Hello this is testing frontend.I am Vivek
    </div>
  );
};

export default Task;
