import json
import sys
import os

from pydantic import BaseModel



# Add the commons directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../common')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../models')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../apps')))


import time
from typing import Union
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from .utils.websocket_manager import WebSocketManager
from common.gpt_researcher.master.agent import GPTResearcher
from common.experts.service import ExpertService
from fastapi.middleware.cors import CORSMiddleware

from .objectives.router import router as ObjectiveRouter
from .experts.router import router as ExpertRouter
from .questions.router import router as QuestionsRouter
previous_queries = ["Task - "]
class ResearchRequest(BaseModel):
    task: str
    
    
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_origins=["*"],  # Adjust as needed
)

manager = WebSocketManager()


@app.route('/')
def index():
    return render_template('index.html')

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/expert")
async def get_agent(query: str):
    results = await ExpertService(query).find_expert()
    print(results)
    return results

@app.post("/chat")
async def get_chat(request: ResearchRequest):
    results =  await GPTResearcher(request).conduct_research() # Need to pass the values from frontend
    print(results)
    return results

@app.post("/objective")
async def get_obj(request: ResearchRequest):
    results = await GPTResearcher(request).get_objectives()
    return results
@app.post("/estimates")
async def get_obj(request: ResearchRequest):
    results = await GPTResearcher(request).get_estimate()
    return results

@app.post("/phases")
async def get_phasess(request: ResearchRequest):
    results = await GPTResearcher(request).get_phases()
    return results

#app.include_router(ObjectiveRouter, prefix='/objectives', tags=['objectives'])
app.include_router(ExpertRouter, prefix='/experts')
app.include_router(QuestionsRouter, prefix='/questions')
# @app.post("/objectives")
# async def get_obj(request: ResearchRequest):
#     results = await GPTResearcher(request).get_objectives()
#     return results

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            if data.startswith("start"):
                json_data = json.loads(data[6:])
                task = json_data.get("task")
                print(previous_queries[0])
                previous_queries[0]+=" "+task
                task = previous_queries[0]
                report_type = json_data.get("report_type")
                #filename = f"task_{int(time.time())}_{task}"
                report_source = json_data.get("report_source")
                if task and report_type:
                    report = await manager.start_streaming(task, report_type, report_source, websocket)
                else:
                    print("Error: not enough parameters provided.")

    except WebSocketDisconnect:
        await manager.disconnect(websocket)