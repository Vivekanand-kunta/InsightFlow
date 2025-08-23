from app.databases import db

async def update_email_details(e_id:str,category:str,email:str):
    if db.pool is None:
        raise Exception("Pool not initialized")
    async with db.pool.acquire() as conn:
        await conn.execute('Update emails set category=$1,email=$2  where e_id=$3',category,email,e_id)
    return {"status": "success", "msg": f"Email {email} updated successfully"}
