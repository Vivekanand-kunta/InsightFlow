from app.databases import db

async def update_database_details(d_id: str, db_name: str, db_connection: str):
    if db.pool is None:
        raise Exception("Pool not initialized")
    
    async with db.pool.acquire() as conn:
        result = await conn.execute(
            'UPDATE databases SET db_name=$1, db_connection=$2 WHERE d_id=$3',
            db_name, db_connection, d_id
        ) 
    updated_count = int(result.split()[-1])  
    if updated_count == 0:
        return {
            "status": "failed",
            "msg": f"No database found with d_id {d_id}"
        }
    return {
        "status": "success",
        "msg": f"Database {db_name} updated successfully"
    }
