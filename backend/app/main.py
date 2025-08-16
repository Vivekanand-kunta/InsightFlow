from fastapi import FastAPI
from app import task 
from databases.db import db_init,db_terminate,pool
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

# Allowed origins to use the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

#Router
app.include_router(task.router,prefix='/task',tags=['task'])

# Event functions to connect to datases on start and end
@app.on_event("startup")
async def startup():
    await db_init()
@app.on_event("shutdown")
async def shutdown():
    await db_terminate()
