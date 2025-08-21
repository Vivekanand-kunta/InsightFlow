export interface Database{
task_id:string;
db_name:string;
db_connection:string;
}

export interface Email{
    task_id:string;
    cateogry:string;
    email:string;
}

export interface Script{
    task_id:string;
    script_name:string;
    exe_order:string;
    script_extension:string;
}

export interface Task{
    title:string;
    description:string;
    frequency:string;
    databases:Database[];
    emails:Email[];
    scripts:Script[];
}