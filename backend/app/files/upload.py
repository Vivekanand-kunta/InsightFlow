from fastapi.responses import FileResponse
from fastapi import UploadFile, File
import os, shutil
from dotenv import load_dotenv

load_dotenv()
script_add = f"{os.getenv('BASE_ADD')}/scripts"

async def upload_file_to_frontend(task_id: str, filename: str):
    file_path = f"{script_add}/{task_id}/{filename}"
    if not os.path.exists(file_path):
        return {"error": "file not found"}
    if filename.endswith(".txt"):
        media_type = "text/plain"
    elif filename.endswith(".py"):
        media_type = "text/x-python"
    else:
        media_type = "application/octet-stream"
    return FileResponse(path=file_path, filename=filename, media_type=media_type)


async def download_file_from_frontend(task_id: str, filenames: list[str], priorities: list[int], files: list[UploadFile] = File(...)):
    folder_path = f"{script_add}/{task_id}"
    os.makedirs(folder_path, exist_ok=True) 
    for filename, priority, file in zip(filenames, priorities, files):
        upload_path = f"{folder_path}/{priority}_{filename}"
        with open(upload_path, "wb") as f:
            content = await file.read()
            f.write(content)
    return {"msg": "Files Uploaded Successfully"}


async def delete_files(task_id: str):
    script_location = f"{script_add}/{task_id}"
    if os.path.exists(script_location) and os.path.isdir(script_location):
        shutil.rmtree(script_location)  
        print(f"Deleted folder: {script_location}")


async def update_files(task_id: str, filenames: list[str], priorities: list[int], files: list[UploadFile] = File(...)):
    await delete_files(task_id)
    return await download_file_from_frontend(task_id, filenames, priorities, files)
