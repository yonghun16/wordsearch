from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from wordsearch import create_word_search_grid

app = FastAPI()

# 서버시작
app.mount("/", StaticFiles(directory="static", html=True), name="static")
