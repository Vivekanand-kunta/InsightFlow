from app.databases import db 

async def get_all_tasks():
    tasks=await get_only_task_data()
    task_ids=list(tasks.keys())
    logs=await get_logs(task_ids)
    for task in tasks:
        tasks[task]["logs"]=logs.get(task, [])
    return tasks

async def get_only_task_data():
    tasks={}
    async with db.pool.acquire() as conn:
        rows=await conn.fetch("SELECT * FROM tasks")
        # it returns {task_id1 :{},task_id2:{}}
        for row in rows:
            tasks[row['task_id']]={k: v for k, v in row.items() if k != "task_id"}
    return tasks

async def get_logs(task_ids):
    logs = {}
    async with db.pool.acquire() as conn:
        # # THIS IS USEFUL WHEN WE HAVE FEW TASK IDS 
        # coroutines = [
        #     conn.fetch("SELECT task_time,task_status FROM logs WHERE task_id=$1", task_id)
        #     for task_id in task_ids
        # ]
        # # Run all queries concurrently
        # results = await asyncio.gather(*coroutines)

        # # Store results in the dictionary
        # #It returns logs={task_id1:[{time:"",status:""},{..},{..}],task_id2:[{}{}{}]}
        # for task_id, rows in zip(task_ids, results):
        #     logs[task_id] = [dict(r) for r in rows]

        # THIS IS USEFUL WHEN WE HAVE MANY TASKS
        rows = await conn.fetch(
            "SELECT task_time,task_status FROM logs WHERE task_id = ANY($1::text[])", task_ids
        )
        for row in rows:
            logs.setdefault(row['task_id'], []).append(dict(row))
    return logs



    