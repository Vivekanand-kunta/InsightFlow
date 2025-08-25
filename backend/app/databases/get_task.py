from app.databases import db
import asyncio

async def get_task(task_id: str):
    if db.pool is None:
        raise Exception("Pool not initialized")
    print('Before starting task')
    async with db.pool.acquire() as conn:
        task_row = await conn.fetchrow(
            "SELECT * FROM tasks WHERE task_id=$1", task_id
        )
        print(f'task_row_fetched : {task_row}')
        if not task_row:
            return {"status": "failed", "msg": f"Task {task_id} not found"}
        
        task = {k: v for k, v in task_row.items() if k != "task_id"}
        print("Before database scripts and email seletion")
        print("Fetching databases...")
        db_rows = await conn.fetch(
                "SELECT db_name, db_connection, d_id FROM databases WHERE task_id=$1", task_id
            )
        print(f"db_rows: {db_rows}")

        print("Fetching emails...")
        email_rows = await conn.fetch(
            "SELECT category, email, e_id FROM emails WHERE task_id=$1", task_id
        )
        print(f"email_rows: {email_rows}")

        print("Fetching scripts...")
        script_rows = await conn.fetch(
            "SELECT script_name, exe_order, s_id FROM scripts WHERE task_id=$1", task_id
        )
        print(f"script_rows: {script_rows}")

        task["databases"] = [dict(r) for r in db_rows]
        task["emails"] = [dict(r) for r in email_rows]
        task["scripts"] = [dict(r) for r in script_rows]
        print('After selction')
        print('Task complete')

    return {"status": "success", "task": task}
