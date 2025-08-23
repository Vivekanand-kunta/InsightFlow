from app.databases import db

async def get_task(task_id: str):
    if db.pool is None:
        raise Exception("Pool not initialized")

    async with db.pool.acquire() as conn:
        task_row = await conn.fetchrow("SELECT * FROM tasks WHERE task_id=$1", task_id)
        
        task = {k: v for k, v in task_row.items() if k != "task_id"}

        # Run the other three queries concurrently
        db_rows = await conn.fetch("SELECT db_name,db_connection,d_id FROM databases WHERE task_id=$1", task_id)
        email_rows = await conn.fetch("SELECT category,email,e_id FROM emails WHERE task_id=$1", task_id)
        script_rows = await conn.fetch("SELECT script_name,exe_order,s_id FROM scripts WHERE task_id=$1", task_id)
        
        task["databases"] = [dict(r) for r in db_rows]
        task["emails"] = [dict(r) for r in email_rows]
        task["scripts"] = [dict(r) for r in script_rows] 

    return task
