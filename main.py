from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# 서버시작
app.mount("/", StaticFiles(directory="static", html=True), name="static")
