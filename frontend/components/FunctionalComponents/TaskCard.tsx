import React from 'react'
import { Database, Email, Script } from '@/datatypes';

interface TaskCardProps {
    props:{
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
        setEmails: (emails: Email[]) => void;}
};

const TaskCard = ({props}:TaskCardProps) => {
  return (
    <div>
        <h1>Task ID: {props.task_id}</h1>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p>Frequency: {props.frequency}</p>
        <div>
            <h3>Databases</h3>
            {props.databases.map((db, index) => (
            <div key={index}>
                <p>{db.db_name} - {db.db_connection}</p>
            </div>
            ))}
        </div>
        <div>
            <h3>Emails</h3>
            {props.emails.map((email, index) => (
            <div key={index}>
                <p>{email.email} - {email.cateogry}</p>
            </div>
            ))}
        </div>
      
    </div>
  )
}

export default TaskCard
