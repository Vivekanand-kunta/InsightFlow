from app.databases import db

async def check_task(task_id: str):
    if db.pool is None:
        raise Exception("Pool not initialized")
    async with db.pool.acquire() as conn:
        row = await conn.fetchrow(
            'SELECT task_id FROM tasks WHERE task_id=$1', task_id
        )
    exists = 'true' if row else 'false'
    return {
        "status": "success",
        "exists": exists,
        "msg": f"Query for task_id {task_id} executed successfully"
    }
