import React from 'react'
import { Database } from '@/datatypes';
import { Input } from '../ui/input';

interface DatabasesProps {
  database: Database;
  databases: Database[];
  setDatabases: (databases: Database[]) => void;
}

const Databases = (props: DatabasesProps) => {
  return (
    <div>
    <Input
        type="text"
        placeholder="Database Connection"
        value={props.database.db_name}
        onChange={(e) => {
          props.setDatabases(
            props.databases.map((db) =>
              db.db_name === props.database.db_name
                ? { ...db, db_name: e.target.value }
                : db
            )
          );
        }}
      />
      <Input
        type="text"
        placeholder="Database Connection"
        value={props.database.db_connection}
        onChange={(e) => {
          props.setDatabases(
            props.databases.map((db) =>
              db.db_name === props.database.db_name
                ? { ...db, db_connection: e.target.value }
                : db
            )
          );
        }}
      />
    </div>
  )
}

export default Databases;
