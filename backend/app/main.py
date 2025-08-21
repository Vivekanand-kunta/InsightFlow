from fastapi import FastAPI,HTTPException
from app import api
from app.databases.db import db_init,db_terminate
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os 

load_dotenv() 

app=FastAPI()

# Allowed origins to use the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("ALLOWED_ORIGINS")],  
    allow_methods=["*"],
    allow_headers=["*"],
)

#Router
app.include_router(api.router,prefix='/api',tags=['api'])

# Event functions to connect to datases on start and end
@app.on_event("startup")
async def startup():
    await db_init()
@app.on_event("shutdown")
async def shutdown():
    await db_terminate()

