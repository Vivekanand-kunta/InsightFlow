from app.databases import db
import asyncio

async def get_task(task_id: str):
    if db.pool is None:
        raise Exception("Pool not initialized")

    async with db.pool.acquire() as conn:
        task_row = await conn.fetchrow(
            "SELECT * FROM tasks WHERE task_id=$1", task_id
        )
        if not task_row:
            return {"status": "failed", "msg": f"Task {task_id} not found"}
        task = {k: v for k, v in task_row.items() if k != "task_id"}
        
        db_rows, email_rows, script_rows = await asyncio.gather(
            conn.fetch("SELECT db_name, db_connection, d_id FROM databases WHERE task_id=$1",task_id,),
            conn.fetch("SELECT category, email, e_id FROM emails WHERE task_id=$1",task_id,),
            conn.fetch("SELECT script_name, exe_order, s_id FROM scripts WHERE task_id=$1",task_id,),
        )

        task["databases"] = [dict(r) for r in db_rows]
        task["emails"] = [dict(r) for r in email_rows]
        task["scripts"] = [dict(r) for r in script_rows]

    return {"status": "success", "task": task}
