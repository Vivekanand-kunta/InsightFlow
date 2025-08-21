from fastapi import APIRouter,HTTPException
from fastapi.responses import FileResponse
from app.databases.get_all_tasks import get_all_tasks
from app.databases.get_task import get_task
import os 
router=APIRouter()

@router.get("/tasks")
async def get_tasks():
    try:
        tasks=await get_all_tasks()
        return {"tasks":tasks}
    except Exception as e :
        raise HTTPException(status_code=400,detail=f"Error {e} \n While fetching tasks")

@router.get("/task/{task_id}")
async def get_single_task(task_id:str):
    try:
        task=await get_task(task_id)
        return {"task":task}
    except Exception as e :
        raise HTTPException(status_code=400,detail=f"Error {e} \n While fetching tasks",media_type="application/json")

@router.get("/task/{task_id}/script/{filename}")
async def get_task_script(task_id:str,filename:str):
    base_add=f"{os.getenv("BASE_ADD")}/scripts/{task_id}"
    print(f"Base directory: {base_add}")
    if not os.path.exists(base_add):
        return {"error": "Base directory does not exist"}
    file_path = os.path.join(base_add,f"{filename}")
    if not os.path.exists(file_path):
        return {"error": "File not found"}
    return FileResponse(file_path, media_type='application/octet-stream', filename=f"{filename}")
    
