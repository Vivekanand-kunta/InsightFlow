import React from 'react'
import { DatabasesProps } from '@/datatypes'
import { Input } from '../ui/input';

const Databases = (props:DatabasesProps) => {
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
          props.setModified(true);
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
          props.setModified(true);
        }}
        className='w-full mb-2' placeholder='Postgres Connection String'/>
    </div>
  )
}

export default Databases
