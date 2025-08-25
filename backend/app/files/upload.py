from fastapi.responses import FileResponse
from fastapi import UploadFile, File
import os, shutil
from dotenv import load_dotenv
from app.databases.deletions import delete_scripts
import aiofiles.os 

load_dotenv()
script_add = f"{os.getenv('BASE_ADD')}/scripts"

async def upload_file_to_frontend(task_id: str, filename: str):
    file_path = f"{os.getenv('BASE_ADD')}/scripts/{task_id}/{filename}"
    if not os.path.exists(file_path):
        return {"status": "failure",'msg':'File not found'}
    if filename.endswith(".txt"):
        media_type = "text/plain"
    elif filename.endswith(".py"):
        media_type = "text/x-python"
    else:
        media_type = "application/octet-stream"
    return FileResponse(path=file_path, filename=filename, media_type=media_type)

async def download_file_from_frontend(task_id: str, filename: str, file: UploadFile = File(...)):
    print("Inside downlaod from frontend")
    folder_path = f"{os.getenv('BASE_ADD')}/scripts/{task_id}"
    print(f"Folder path :{folder_path}")
    os.makedirs(folder_path, exist_ok=True)  
    file_path = os.path.join(folder_path, filename) 
    print(f'file_path : {file_path}')
    print("Before writing into the file")
    with open(file_path, "wb") as f:
        while chunk := await file.read(1024 * 1024):  
            f.write(chunk)
    print("After writing into the file")
    return {"status": "success", "msg": f"File {filename} uploaded successfully."}
       
async def delete_files(task_id: str,filename:str):
    folder_path = f"{os.getenv('BASE_ADD')}/scripts/{task_id}/{filename}"
    if os.path.exists(folder_path):
        try:
            await aiofiles.os.remove(folder_path)
        except Exception as e:
            return {"status": "failure", "msg": f"Error deleting file: {e}"}
        try:
            await delete_scripts(task_id,filename)
        except Exception as e:
            return {"status": "failure", "msg": f"File deleted but error deleting from database: {e}"}
        return {"status": "success", "msg": f"File {filename} deleted successfully."}
    else:
        return {"status": "failure", "msg": "File not found."}
    
