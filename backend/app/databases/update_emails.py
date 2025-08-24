from app.databases import db

async def update_email_details(e_id: str, category: str, email: str):
    if db.pool is None:
        raise Exception("Pool not initialized")
    
    async with db.pool.acquire() as conn:
        result = await conn.execute(
            'UPDATE emails SET category=$1, email=$2 WHERE e_id=$3',
            category, email, e_id
        )
    updated_count = int(result.split()[-1])  
    if updated_count == 0:
        return {
            "status": "failed",
            "msg": f"No email found with e_id {e_id}"
        } 
    return {
        "status": "success",
        "msg": f"Email {email} updated successfully"
    }
