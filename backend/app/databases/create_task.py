from app.databases import db
from pydantic import BaseModel
from typing import List
class Database(BaseModel):
    db_name: str
    d_id:str
    db_connection: str

class Email(BaseModel):
    e_id:str
    category: str
    email: str

class Script(BaseModel):
    script_name: str
    exe_order: str
    s_id:str

class Task(BaseModel):
    title: str
    description: str
    frequency: str
    databases: List[Database]
    emails: List[Email]
    scripts: List[Script]

async def create_task(task_id: str,task:Task):
    if db.pool is None:
        raise Exception("Pool not initialized")

    async with db.pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute(
                """
                INSERT INTO tasks(id, title, description, frequency)
                VALUES($1, $2, $3, $4)
                """,
                task_id, task.title, task.description, task.frequency
            )
            for db in task.databases:
                await conn.execute(
                    """
                    INSERT INTO databases(task_id, db_name,db_connection,d_id)
                    VALUES($1, $2,$3)
                    """,
                    task_id, db.db_name,db.db_connection,db.d_id
                )
            for email in task.emails:
                await conn.execute(
                    """
                    INSERT INTO emails(task_id,category,email,eid)
                    VALUES($1, $2,$3)
                    """,
                    task_id,email.category,email.email,email.e_id
                )
            for script in task.scripts:
                await conn.execute(
                    """
                    INSERT INTO scripts(task_id,script_name,s_id,exe_order)
                    VALUES($1,$2,$3)
                    """,
                    task_id,script.script_name,script.s_id,script.exe_order
            )
    return {"status": "success"}