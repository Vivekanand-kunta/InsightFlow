from app.databases import db

async def update_script_details(task_id: str, s_id: str, exe_order: str, script_name: str):
    if db.pool is None:
        raise Exception("Pool not initialized")
    old_name = None
    async with db.pool.acquire() as conn:
        await conn.execute(
            'UPDATE scripts SET exe_order=$1, script_name=$2 WHERE s_id=$3',
            int(exe_order), script_name, s_id
        )
    return {"status": "success", "msg": f"Script {script_name} updated successfully"}
