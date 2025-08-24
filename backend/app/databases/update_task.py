from app.databases import db
from pydantic import BaseModel
from typing import List

class Database(BaseModel):
    db_name: str
    d_id: str
    db_connection: str

class Email(BaseModel):
    category: str
    e_id: str
    email: str

class Script(BaseModel):
    script_name: str
    s_id: str
    exe_order: str

class Task(BaseModel):
    title: str
    description: str
    frequency: str
    databases: List[Database]
    emails: List[Email]
    scripts: List[Script]

async def update_task_details(task: Task):
    if db.pool is None:
        raise Exception("Pool not initialized")

    async with db.pool.acquire() as conn:
        async with conn.transaction():

            # Update main task table (assuming you identify task by some task_id)
            await conn.execute(
                """
                UPDATE task 
                SET title=$1, description=$2, frequency=$3
                WHERE title=$1
                """,
                task.title, task.description, task.frequency
            )

            # UPSERT databases
            for database in task.databases:
                await conn.execute(
                    """
                    INSERT INTO databases (d_id, db_name, db_connection)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (d_id) 
                    DO UPDATE SET db_name=EXCLUDED.db_name,
                                  db_connection=EXCLUDED.db_connection
                    """,
                    database.d_id, database.db_name, database.db_connection
                )

            # UPSERT emails
            for email in task.emails:
                await conn.execute(
                    """
                    INSERT INTO emails (e_id, category, email)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (e_id) 
                    DO UPDATE SET category=EXCLUDED.category,
                                  email=EXCLUDED.email
                    """,
                    email.e_id, email.category, email.email
                )

    return {
        "status": "success",
        "msg": f"Task '{task.title}' updated successfully"
    }
