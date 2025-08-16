import asyncio
import asyncpg
import os
from dotenv import load_dotenv

load_dotenv()
pool: asyncpg.pool.Pool | None = None

async def db_init():
    """
    Initialize the asyncpg connection pool.
    """
    global pool
    if pool:
        print("Pool is already initialized.")
        return
    try:
        db_url = os.getenv("NEON_DB")
        if not db_url:
            raise ValueError("Database URL not found in environment variables.")

        pool = await asyncpg.create_pool(dsn=db_url, min_size=1, max_size=5)
        print(" Database pool connection successful")
    except Exception as e:
        print(f" Error during pool connection: {e}")
        raise  

async def db_terminate():
    """
    Close the asyncpg connection pool.
    """
    global pool
    try:
        if pool:
            await pool.close()
            pool = None
            print("Pool connection terminated")
        else:
            print("Pool was already terminated or not initialized")
    except Exception as e:
        print(f"Error during pool termination: {e}")
        raise
