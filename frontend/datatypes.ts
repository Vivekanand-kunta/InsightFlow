export interface Database{
    db_name:string;
    d_id:string;
    db_connection:string;
}

export interface Email{
    category:string;
    e_id:string;
    email:string;
}

export interface Script{
    script_name:string;
    s_id:string;
    exe_order:string;
}

export interface Task{
    title:string;
    description:string;
    frequency:string;
    databases:Database[];
    emails:Email[];
    scripts:Script[];
}
export interface TaskContainerProps{
    task_id:string,
    title:string,
    description:string,
    frequency:string,
    databases:Database[],
    emails:Email[],
    scripts:Script[]
    setTitle:React.Dispatch<React.SetStateAction<string>>,
    setDescription:React.Dispatch<React.SetStateAction<string>>,
    setFrequency:React.Dispatch<React.SetStateAction<string>>,
    setDatabases:React.Dispatch<React.SetStateAction<Database[]>>,
    setEmails:React.Dispatch<React.SetStateAction<Email[]>>,
    setScripts:React.Dispatch<React.SetStateAction<Script[]>>
}

export interface FrequencyProps{
    frequency:string,
    setModified:React.Dispatch<React.SetStateAction<boolean>>,
    setFrequency:React.Dispatch<React.SetStateAction<string>>
}

export interface DatabasesProps{
    database:Database,
    setModified:React.Dispatch<React.SetStateAction<boolean>>,
    setDatabases:React.Dispatch<React.SetStateAction<Database[]>>
}

export interface EmailsProps{
    email:Email,
    setModified:React.Dispatch<React.SetStateAction<boolean>>,
    setEmails:React.Dispatch<React.SetStateAction<Email[]>>
}

export interface ScriptProps{
    task_id:string,
    script:Script,
    setScripts:React.Dispatch<React.SetStateAction<Script[]>>
}

export interface InputFilesFormProps{
    filename:string,
    task_id : string,
    exe_order:string,
    scriptname:string,
    scriptModified:boolean,
    setScriptModified:React.Dispatch<React.SetStateAction<boolean>>,
 }