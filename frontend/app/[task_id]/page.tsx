'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import axios from '@/app/api/axios';
import { Database, Email, Script } from '@/datatypes';
import TaskCard from '@/components/FunctionalComponents/TaskCard';
import { fetchtask,fetchtaskScript } from '@/components/functions/fetching';

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
  const [script, setScript] = useState<Script[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if ((isnewTask === null || isnewTask === 'false')) {
      (async () => {
        try {
          const task = await fetchtask(task_id);
          console.log('Fetched task data:', task);

          setTitle(task.title || '');
          setDescription(task.description || '');
          setFrequency(task.frequency || '');
          setDatabases(task.databases || []);
          setEmails(task.emails || []);
          setScript(task.script || []);
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

  const file_viewing = async () => {
    try {
      const filename = 'test.py';
      const fileURL = await fetchtaskScript('wfjmtTMuYsD8mUtFBFrNujC9S', filename);
      
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = filename;
      link.click();
      link.remove();
      URL.revokeObjectURL(fileURL);
    } catch (err) {
      console.error('Error fetching file:', err);
      throw new Error('Failed to fetch file');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <TaskCard
        props={{
          task_id,
          title,
          description,
          frequency,
          databases,
          emails,
          setTitle,
          setDescription,
          setFrequency,
          setDatabases,
          setEmails,
        }}
      />
      <div>
        <button onClick={file_viewing}>View File</button>
        
      </div>
    </div>
  );
};

export default Task;
