from fastapi import APIRouter,HTTPException,UploadFile,File,Body
from fastapi.responses import FileResponse
from app.databases.get_all_tasks import get_all_tasks
from app.databases.get_task import get_task
from app.databases.create_task import create_task
from app.files.upload import upload_file_to_frontend
from app.files.upload import download_file_from_frontend
from app.files.upload import delete_files
from app.databases.update_task import update_task_details
from app.databases.update_scripts import update_script_details
from app.databases.check_task import check_task
from app.files.check_scripts import check_script
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

class TaskCheck(BaseModel):
    task_id: str





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
        print('IN API.PY')
        res=await get_task(task_id)
        print('After getting Task')
        return res
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
        response=await check_task(task_id)
        if not response:
            res=await create_task(task_id,task)
            return {"status":"success"}
        else:
            print("Before updating task")
            res=await update_task_details(task_id,task)
            print('After updating task')
            return {'status':'success'}
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

@router.post('/validate/task')
async def check_task_existence(payload=Body(...)):
    print(f"task payload:{payload}")
    try:
        task_id=payload.get('task_id')
        res=await check_task(task_id)
        exists='true' if res else 'false'
        return {'status':'success','exists':exists,'msg':'Validated task Successfully'}
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Error {e} \n While fetching tasks")

@router.post('/validate/script')
async def check_script_existence(payload=Body(...)):
    try:
        task_id=payload.get('task_id')
        script_name=payload.get('script_name')
        res=check_script(task_id,script_name)
        return {'status':'success','exists':res,'msg':"Checking script done"}
    except Exception as e:
        raise HTTPException(status_code=400,detail=f"Error {e} \n While fetching tasks")
 
@router.post('/task/script/{s_id}')
async def updateScriptDetails(s_id:str,payload=Body(...)):
    try:
        exe_order=payload.get('exe_order')
        script_name=payload.get('script_name')
        task_id=payload.get('task_id')
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