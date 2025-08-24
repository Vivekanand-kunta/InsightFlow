import React from 'react'
import { DatabasesProps } from '@/datatypes'
import { Input } from '../ui/input';
import {Button} from '../ui/button';
import { updateDatabaseConnection } from '../functions/fetching';
import { useState } from 'react';

const Databases = (props:DatabasesProps) => {
    const [modified,setModified]=useState<boolean>(false);
  return (
    <div>
        <Input type="text" 
        value={props.database.db_name} 
        onChange={(e) => {
          props.setDatabases(prevValues =>
            prevValues.map(db =>
              db.d_id === props.database.d_id
                ? { ...db, db_name: e.target.value }
                : db
            )
          );
          setModified(true);
        }}
        className='w-full mb-2' placeholder='Database Name'/>

        <Input type="text" 
        value={props.database.db_connection} 
        onChange={(e) => {
          props.setDatabases(prevValues =>
            prevValues.map(db =>
              db.d_id === props.database.d_id
                ? { ...db, db_connection: e.target.value }
                : db
            )
          );
          setModified(true);
        }}
        className='w-full mb-2' placeholder='Postgres Connection String'/>

        {modified &&
        <Button onClick={async()=>{
            try{
            await updateDatabaseConnection(props.database.d_id,props.database.db_connection,props.database.db_name);
            setModified(false)
            }
            catch(err){
                console.error(err);
                throw new Error("Failed to update database connection")
            };
        }}>Update</Button>
    }
    </div>
  )
}

export default Databases
