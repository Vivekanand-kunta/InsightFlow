from app.databases import db

async def get_all_tasks():
    tasks = await get_only_task_data()
    task_ids = list(tasks.keys())
    logs = await get_logs(task_ids)
    for task in tasks:
        tasks[task]["logs"] = logs.get(task, [])
    return tasks

async def get_only_task_data():
    tasks = {}
    async with db.pool.acquire() as conn:
        rows = await conn.fetch("SELECT * FROM tasks")
        for row in rows:
            tasks[row['task_id']] = {k: v for k, v in row.items() if k != "task_id"}
    return tasks

async def get_logs(task_ids):
    logs = {}
    async with db.pool.acquire() as conn:
        rows = await conn.fetch(
            "SELECT task_id, task_time, task_status FROM logs WHERE task_id = ANY($1::text[])",
            task_ids
        )
        for row in rows:
            logs.setdefault(row['task_id'], []).append(
                {"task_time": row["task_time"], "task_status": row["task_status"]}
            )
    return logs
