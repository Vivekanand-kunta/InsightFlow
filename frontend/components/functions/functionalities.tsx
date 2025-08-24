import {  Task } from "@/datatypes";

export function generateTaskId(){ 
    const chars =
      "abcdefghijklmnopqrstuvwxyz" +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "0123456789";
    let result = "";
    for (let i = 0; i < 25; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

export function urlCreatorfunction(file:File){
  return URL.createObjectURL(file)
}

export function validateTask(task:Task){
    if (task.title.length==0 || task.emails.length==0 || task.description.length==0 || task.scripts.length==0){
      alert('Please fill title,emails,description,frequency and script fields');
      return false;}
    return true;
};