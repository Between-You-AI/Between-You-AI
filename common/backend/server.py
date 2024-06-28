from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from backend.websocket_manager import WebSocketManager
from backend.utils import write_md_to_pdf, write_md_to_word, write_text_to_md
from gpt_researcher.master.agent import GPTResearcher
from experts.service import ExpertService
import time
import json
import os

previous_queries = ["Task - "]
class ResearchRequest(BaseModel):
    task: str
    
    
app = FastAPI()

manager = WebSocketManager()

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

@app.post("/chat")
async def get_chat(request: ResearchRequest):
    results =  await GPTResearcher(request).conduct_research() # Need to pass the values from frontend
    print(results)
    return results

@app.post("/objective")
async def get_obj(request: ResearchRequest):
    results = await GPTResearcher(request).get_objective()
    title = results.get("title")
    description = results.get("description")
    return results
@app.post("/estimates")
async def get_obj(request: ResearchRequest):
    results = await GPTResearcher(request).get_estimate()
    return results

@app.post("/phases")
async def get_phasess(request: ResearchRequest):
    results = await GPTResearcher(request).get_phases()
    return results


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