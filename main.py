from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from wordsearch import create_word_search_grid, print_word_search_grid


grid_size = (12, 12)
words = ["BMW", "TESLA", "KIA", "BENZ", "HYUNDAI", "FERRARI"]

app = FastAPI()

@app.get("/create")
def create_word():
    word_search_grid = create_word_search_grid(words, grid_size)
    return word_search_grid

app.mount("/", StaticFiles(directory="static", html=True), name="static")

