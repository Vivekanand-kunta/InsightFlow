import { Email,Script } from "@/datatypes";

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

  export function validateTask(title:string,emails:Email[],scripts:Script[]){
    if (title.length==0 || emails.length==0 || scripts.length==0){
      alert('Please fill title,emails and script fields');
      return false;}
    return true;
  };