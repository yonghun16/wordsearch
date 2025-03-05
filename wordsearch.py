import random

# word_search_grid의 최대 행과 열
GRID_MAX_ROW = 12
GRID_MAX_COL = 12
grid_size = (GRID_MAX_ROW, GRID_MAX_COL)

# create word_search_grid
def create_word_search_grid(grid_size, words):
    grid_rows, grid_cols = grid_size

    # word_search_grid 생성
    word_search_grid = [['_' for _ in range(grid_cols)] for _ in range(grid_rows)]

    # 단어 배치
    input_word(word_search_grid, grid_size, words)
    
    # word_search_grid 출력
    for i in range(grid_rows):
        for j in range(grid_cols):
            print(word_search_grid[i][j], end=' ')
        print()

# input words 단어 배치
def input_word(grid, grid_size, words):
    grid_rows, grid_cols = grid_size
    count = 1
    for word in words:
        placed = False
        while not placed:
            ''' 8가지 방향
            0 1 2   ↖️ ⬆️ ↗️  
            7   3   ⬅️   ➡️  
            6 5 4   ↙️ ⬇️ ↘️  
            '''
            direction = random.randint(0, 7)
            # 방향 포인트          (0.좌상↖️ ,  1.상⬆️ , 2.우상↗️ , 3.우➡️ , 4.우하↘️ , 5.하⬇️ , 6.좌하↙️ , 7좌⬅️ )
            direction_move_point = [(-1, -1), (0, -1), (1, -1), (1, 0), (1, 1), (0, 1), (-1, 1), (-1, 0)]
            dr, dc = direction_move_point[direction]

            start_x, start_y = set_start_point(direction, word, grid_rows, grid_cols)

            check = True
            for i in range(len(word)):
                if(grid[start_y + i*dc][start_x + i*dr] != '_'):
                    check = False
                    break;
            if check == True:
                for i in range(len(word)):
                    grid[start_y + i*dc][start_x + i*dr] = word[i]
                placed = True
                count += 1

# set start point
def set_start_point(direction, word, grid_rows, grid_cols):
    start_x, start_y = (0, 0)
    len_word = len(word)
    if (direction == 0):  # 좌상↖️
        start_x = random.randint(len_word-1, grid_rows-1)
        start_y = random.randint(len_word-1, grid_cols-1)
    elif (direction == 1):  # 상⬆️
        start_x = random.randint(0, grid_rows-1)
        start_y = random.randint(len_word-1, grid_cols-1)
    elif (direction == 2):  # 우상↗️
        start_x = random.randint(0, grid_rows-len_word)
        start_y = random.randint(len_word-1, grid_cols-1)
    elif (direction == 3):  # 우➡️
        start_x = random.randint(0, grid_rows-len_word)
        start_y = random.randint(0, grid_cols-1)
    elif (direction == 4):  # 우하↘️
        start_x = random.randint(0, grid_rows-len_word)
        start_y = random.randint(0, grid_cols-len_word)
    elif (direction == 5):  # 하⬇️
        start_x = random.randint(0, grid_rows-1)
        start_y = random.randint(0, grid_cols-len_word)
    elif (direction == 6):  # 좌하↙️
        start_x = random.randint(len_word-1, grid_rows-1)
        start_y = random.randint(0, grid_cols-len_word)
    elif (direction == 7):  # 좌⬅️
        start_x = random.randint(len_word-1, grid_rows-1)
        start_y = random.randint(0, grid_cols-1)
    return (start_x, start_y)


# __main__
words = ["BMW", "TESLA", "KIA", "BENZ", "HYUNDAI", "FERRARI"]

word_search_grid = create_word_search_grid(grid_size, words)
