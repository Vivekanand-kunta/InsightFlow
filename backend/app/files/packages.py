import subprocess 
import threading
from dotenv import load_dotenv
import os 

load_dotenv()

def install_packages(task_id:str):
    try:
        req_file = f"{os.getenv("BASE_ADD")}/scripts/{task_id}/task_requirements.txt"
        subprocess.check_call(["python3", "-m", "pip", "install", "-r", req_file, "--upgrade"])
        freeze_file = f"{os.getenv("BASE_ADD")}/requirements.txt"
        subprocess.check_call(f"python3 -m pip freeze > {freeze_file}", shell=True)
        
        print(f"Packages installed successfully for task_id: {task_id}")
    except Exception as e:
        print("Error installing packages for task_id {task_id} with Error :{e}")

def install_packages(task_id:str):
    thread=threading.Thread(target=install_packages,args=(task_id,))
    thread.start()
    return thread