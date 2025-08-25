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

class Task(BaseModel):
    title: str
    description: str
    frequency: str
    databases: List[Database]
    emails: List[Email]


async def update_task_details(task_id: str, task: Task):
    if db.pool is None:
        raise Exception("Pool not initialized")
    print("Inside updating details")

    async with db.pool.acquire() as conn:
        print('Before transaction')
        async with conn.transaction():

            # Update main task
            await conn.execute(
                """
                UPDATE tasks 
                SET title=$1, description=$2, frequency=$3
                WHERE task_id=$4
                """,
                task.title, task.description, task.frequency, task_id
            )
            print('After updating task')

            # ---- Databases ----
            for database in task.databases:
                existing_db = await conn.fetchval(
                    """
                    SELECT 1 FROM databases 
                    WHERE task_id=$1 AND d_id=$2
                    """,
                    task_id, database.d_id
                )
                if existing_db:
                    # Update
                    await conn.execute(
                        """
                        UPDATE databases
                        SET db_name=$1, db_connection=$2
                        WHERE task_id=$3 AND d_id=$4
                        """,
                        database.db_name, database.db_connection, task_id, database.d_id
                    )
                else:
                    # Insert
                    await conn.execute(
                        """
                        INSERT INTO databases (task_id, d_id, db_name, db_connection)
                        VALUES ($1, $2, $3, $4)
                        """,
                        task_id, database.d_id, database.db_name, database.db_connection
                    )
            print('After updating databases')

            # ---- Emails ----
            for email in task.emails:
                existing_email = await conn.fetchval(
                    """
                    SELECT 1 FROM emails 
                    WHERE task_id=$1 AND e_id=$2
                    """,
                    task_id, email.e_id
                )
                if existing_email:
                    # Update
                    await conn.execute(
                        """
                        UPDATE emails
                        SET category=$1, email=$2
                        WHERE task_id=$3 AND e_id=$4
                        """,
                        email.category, email.email, task_id, email.e_id
                    )
                else:
                    # Insert
                    await conn.execute(
                        """
                        INSERT INTO emails (task_id, e_id, category, email)
                        VALUES ($1, $2, $3, $4)
                        """,
                        task_id, email.e_id, email.category, email.email
                    )
            print('After updating emails')

        print("After complete transaction")

    return {
        "status": "success",
        "msg": f"Task '{task.title}' updated successfully"
    }
