import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const Email = () => {
  return (
    <div className='mt-10'>
      <div className='flex justify-between'>
        <h2 className='font-bold text-2xl'>Email</h2>
        <Button className='relative top-1 right-2'>+</Button>  
      </div>
      <div className='mt-5 flex flex-col space-y-4 '>
      <Input placeholder='Email'></Input>
      <Input placeholder='Email'></Input>
      <Input placeholder='Email'></Input>
      <Input placeholder='Email'></Input>
      </div>
    </div>
  )
}

export default Email
