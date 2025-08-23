from app.databases import db

async def delete_scripts(task_id: str,filename:str):
    if db.pool is None:
        raise Exception("Pool not initialized")
    async with db.pool.acquire() as conn:
        await conn.execute('Delete from scripts where task_id=$1 and script_name=$2',task_id,filename)
    return {"status": "success", "msg": f"Script {filename} deleted successfully from database."}
