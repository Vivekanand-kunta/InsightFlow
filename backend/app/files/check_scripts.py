import os  
from dotenv import load_dotenv

load_dotenv()

def check_script(task_id:str,script_name:str):
    base_dir=f"{os.getenv('BASE_ADD')}/script/{task_id}"
    script_add=f"{base_dir}/{script_name}"
    exists='true' if (os.path.exists(base_dir) and os.path.isdir(base_dir) and os.path.isfile(script_add)) else 'false'
    return {'status':'success','exists':exists,'msg':f"Script to check script id :{script_name} is successful"}