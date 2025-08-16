import asyncio
from databases.db import pool

async def get_task(task_id: str):
    if pool is None:
        raise Exception("Pool not initialized")

    async with pool.acquire() as conn:
        try:
            # Task query (sequential)
            task_row = await conn.fetchrow("SELECT * FROM tasks WHERE task_id=$1", task_id)
            if not task_row:
                return {"error": "Task not found"}

            task = dict(task_row)

            # Run the other three queries concurrently
            db_query = conn.fetch("SELECT * FROM databases WHERE task_id=$1", task_id)
            email_query = conn.fetch("SELECT * FROM emails WHERE task_id=$1", task_id)
            script_query = conn.fetch("SELECT * FROM scripts WHERE task_id=$1", task_id)

            db_rows, email_rows, script_rows = await asyncio.gather(
                db_query, email_query, script_query
            )

            task["databases"] = [dict(r) for r in db_rows]
            task["emails"] = [dict(r) for r in email_rows]
            task["scripts"] = [dict(r) for r in script_rows]

        except Exception as e:
            print(f"Error while fetching details of task {task_id}: {e}")
            raise Exception(e)

    return task
