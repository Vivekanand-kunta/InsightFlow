from fastapi import APIRouter,HTTPException,UploadFile,File
from fastapi.responses import FileResponse
from app.databases.get_all_tasks import get_all_tasks
from app.databases.get_task import get_task
from app.databases.create_task import create_task
from app.files.upload import upload_file_to_frontend
from app.files.upload import download_file_from_frontend
from app.files.upload import delete_files
from app.databases.update_databases import update_database_details 
from app.databases.update_emails import update_email_details
from app.databases.update_scripts import update_script_details
import os 
from pydantic import BaseModel
from typing import List

router=APIRouter()

class Database(BaseModel):
    db_name: str
    d_id:str
    db_connection: str

class Email(BaseModel):
    category: str
    e_id:str
    email: str

class Script(BaseModel):
    script_name: str
    s_id:str
    exe_order: str

class Task(BaseModel):
    title: str
    description: str
    frequency: str
    databases: List[Database]
    emails: List[Email]
    scripts: List[Script]







# Fetching or Get requests
@router.get("/tasks")
async def get_tasks():
    try:
        tasks=await get_all_tasks()
        return tasks
    except Exception as e :
        raise HTTPException(status_code=400,detail=f"Error {e} \n While fetching tasks")

@router.get("/task/{task_id}")
async def get_single_task(task_id:str):
    try:
        task=await get_task(task_id)
        return task
    except Exception as e :
        raise HTTPException(status_code=400,detail=f"Error {e} \n While fetching tasks")

@router.get("/task/{task_id}/script/{filename}")
async def get_task_script(task_id:str,filename:str):
    try:
        res=await upload_file_to_frontend(task_id,filename)
        return res
    except Exception as e :
        raise HTTPException(status_code=400,detail=f"Error {e} \n While fetching script")
    







# Creations or Post requests
@router.post('/task/{task_id}')
async def upload_data(task_id:str,task:Task):
    try:
        res=await create_task(task_id,task)
        if res.get('status') == "success":
            os.makedirs(f"{os.getenv('BASE_ADD')}/scripts/{task_id}", exist_ok=True)
            return {"status":"success"}
    except Exception as e :
        raise HTTPException(status_code=400,detail=f"Error {e} \n While creating task")
    
@router.post('/task/{task_id}/script/{filename}')
async def upload_script(task_id:str,filename:str,file:UploadFile = File(...)):
    try:
        res=await download_file_from_frontend(task_id,filename,file)
        if res.get('status') == "success":
            return res
    except Exception as e :
        raise HTTPException(status_code=400,detail=f"Error {e} \n While uploading script")




# Updating or Put requests
@router.put('/task/database/{d_id}')
async def updateDbDetails(d_id:str,db_connection:str,db_name:str):
    try:
        res=await update_database_details(d_id,db_name,db_connection)
        if res.get('status') == "success":
            return res
    except Exception as e :
        raise HTTPException(status_code=400,detail=f"Error {e} \n While updating database details")

@router.put('/task/email/{e_id}')
async def updateEmailDetails(e_id:str,category:str,email:str):
    try:
        res=await update_email_details(e_id,category,email)
        if res.get('status') == "success":
            return res
    except Exception as e :
        raise HTTPException(status_code=400,detail=f"Error {e} \n While updating database details")
    
@router.put('task/script/{s_id}')
async def updateScriptDetails(s_id:str,exe_order:str,script_name:str,task_id:str):
    try:
        res=await update_script_details(task_id,s_id,exe_order,script_name)
        if res.get('status') == "success":
            return res
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Error {e} \n While updating database details")
    




# Deletions
@router.delete('/task/{task_id}/script/{filename}')
async def delete_script(task_id:str,filename:str):
    try:
        res=await delete_files(task_id,filename)
        if res.get('status') == "success":
            return res
        else:
            raise HTTPException(status_code=400,detail=f"Error {res.get('msg')} \n While deleting script")
    except Exception as e :
        raise HTTPException(status_code=400,detail=f"Error {e} \n While deleting script")