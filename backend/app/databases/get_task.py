import asyncio
from app.databases import db

async def get_task(task_id: str):
    if db.pool is None:
        raise Exception("Pool not initialized")

    async with db.pool.acquire() as conn:
        task_row = await conn.fetchrow("SELECT * FROM tasks WHERE task_id=$1", task_id)
        
        task = dict(task_row)
        # Run the other three queries concurrently
        db_rows = await conn.fetch("SELECT * FROM databases WHERE task_id=$1", task_id)
        email_rows = await conn.fetch("SELECT * FROM emails WHERE task_id=$1", task_id)
        script_rows = await conn.fetch("SELECT * FROM scripts WHERE task_id=$1", task_id)
        print("AFTER DBASE AND EMAIL AND SCRIPT QUERY")
        # db_rows, email_rows, script_rows = await asyncio.gather(
        #     db_query, email_query, script_query
        # )
        
        task["databases"] = [dict(r) for r in db_rows]
        task["emails"] = [dict(r) for r in email_rows]
        task["scripts"] = [dict(r) for r in script_rows] 
        print(task)
    return task
