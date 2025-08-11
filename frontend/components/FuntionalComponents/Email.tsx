import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

type Prop={
  field_id:string;
  connection:string;
}

type props={
    databases: Prop[];
    setDatabases: React.Dispatch<React.SetStateAction<Prop[]>>
}

const Email = ({databases,setDatabases}:props) => {
  const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const add_email=(id:string)=>{
    const item:Prop={field_id:id,connection:``}
    setDatabases(prev=>[...prev,item]) 
  }

  const update_email = (field_id: string, value: string) => {
    setDatabases(prev =>
      prev.map(db =>
        db.field_id === field_id ? { ...db, connection: value } : db
      )
    );
  };

  const delete_email=(field_id:string)=>{
    setDatabases(prev => prev.filter(db => db.field_id !== field_id));
  }
  
  return (
    <div className='mt-10'>
      <div className='flex justify-between'>
        <h2 className='font-bold text-2xl'>Email</h2>
        <Button className='relative top-1 right-2' onClick={()=>{add_email(generateRandomString(15))}}>+</Button>  
      </div>
      <div className='mt-5 flex flex-col space-y-4 '>
       {databases.map((base)=>(
        <div key={base.field_id} className='flex justify-between align-center w-[97.5%] '>
        <Input className="mr-4"onChange={(e) => update_email(base.field_id, e.target.value)} key={base.field_id} placeholder="Email" value={base.connection} />
        <Button onClick={()=>{delete_email(base.field_id)}}>-</Button>
        </div>))}
      </div>
    </div>
  )
}

export default Email
