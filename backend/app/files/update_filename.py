import os 
from dotenv import load_dotenv

load_dotenv()

async def update_filename(task_id:str,old_file:str,new_file:str):
    os.rename(f"{os.getenv('BASE_ADD')}/scripts/{task_id}/{old_file}",f"{os.getenv('BASE_ADD')}/scripts/{task_id}/{new_file}")
    return 