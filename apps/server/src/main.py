import sys
import os

# Add the commons directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../common')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../apps')))


from typing import Union
from fastapi import FastAPI
from experts.service import ExpertService

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/expert")
async def get_agent(query: str):
    results = await ExpertService(query).find_expert()
    print(results)
    return results