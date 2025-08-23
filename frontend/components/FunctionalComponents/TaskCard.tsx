import React from 'react'
import { Database, Email } from '@/datatypes';
import { Input } from '../ui/input';
import Databases from './Databases';

interface TaskCardProps {
  props: {
    task_id: string;
    title: string;
    description: string;
    frequency: string;
    databases: Database[];
    emails: Email[];
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setFrequency: (frequency: string) => void;
    setDatabases: (databases: Database[]) => void;
    setEmails: (emails: Email[]) => void;
  };
}

const TaskCard = ({ props }: TaskCardProps) => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Title"
        value={props.title}
        onChange={(e) => props.setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        value={props.description}
        onChange={(e) => props.setDescription(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Frequency"
        value={props.frequency}
        onChange={(e) => props.setFrequency(e.target.value)}
      />
      {props.databases.map((database) => (
        <Databases
          key={database.task_id} 
          database={database}
          databases={props.databases}
          setDatabases={props.setDatabases}
        />
      ))}
    </div>
  )
}

export default TaskCard;
