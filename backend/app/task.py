from fastapi import APIRouter
from databases.db import pool
router=APIRouter()

@router.get("/")
async def task_data(task_id):
    return {"message":"Hello World"}