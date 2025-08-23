export interface Database{
    db_name:string;
    d_id:string;
    db_connection:string;
}

export interface Email{
    cateogry:string;
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