from app.databases import db

async def update_script_details(task_id: str, s_id: str, exe_order: str, script_name: str):
    if db.pool is None:
        raise Exception("Pool not initialized")

    async with db.pool.acquire() as conn:
        # check if script exists
        row = await conn.fetchrow(
            'SELECT s_id FROM scripts WHERE s_id=$1',
            s_id
        )
        if row:
            # update existing
            await conn.execute(
                'UPDATE scripts SET exe_order=$1, script_name=$2 WHERE s_id=$3',
                int(exe_order), script_name, s_id
            )
            action = "updated"
        else:
            # insert new
            await conn.execute(
                'INSERT INTO scripts (task_id, s_id, exe_order, script_name) VALUES ($1, $2, $3, $4)',
                task_id, s_id, int(exe_order), script_name
            )
            action = "inserted"

    return {"status": "success", "msg": f"Script {script_name} {action} successfully"}
