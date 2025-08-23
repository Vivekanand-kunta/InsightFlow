from app.databases import db
from app.files.update_filename import update_filename
async def update_script_details(task_id:str,s_id:str,exe_order:str,script_name:str):
    if db.pool is None:
        raise Exception("Pool not initialized")
    old_name=''
    async with db.pool.acquire() as conn:
        rows=await conn.execute('Select script_name from scripts where s_id=$1',s_id)
        old_name=rows[0]['script_name']
        await conn.execute('Update scripts set exe_order=$1,script_name=$2  where s_id=$3',int(exe_order),script_name,s_id)
    await update_filename(task_id,old_name,script_name)
    return {"status": "success", "msg": f"Script {script_name} updated successfully"}

