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

class ResearchRequest(BaseModel):
    task: str



app = FastAPI()

app.mount("/site", StaticFiles(directory="./frontend"), name="site")
app.mount("/static", StaticFiles(directory="./frontend/static"), name="static")

templates = Jinja2Templates(directory="./frontend")

manager = WebSocketManager()


# Dynamic directory for outputs once first research is run
@app.on_event("startup")
def startup_event():
    if not os.path.isdir("outputs"):
        os.makedirs("outputs")
    app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse('index.html', {"request": request, "report": None})

@app.post("/research-openai")
async def research_openai(request: ResearchRequest):
    researcher = GPTResearcher(request)
    research = await researcher.researcher_openai()
    print(research)
    return research

@app.post("/research-bard")
async def research_bard(request: ResearchRequest):
    researcher = GPTResearcher(request)
    research = await researcher.researcher_bard()
    print(research)
    return research

@app.post("/expert")
async def get_agent(request: ResearchRequest):
    results = await ExpertService(request).find_expert()
    print(results)
    return results


@app.post("/chat")
async def get_chat():
    results =  await GPTResearcher("bike").conduct_research() # Need to pass the values from frontend
    print(results)
    return results
    

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            if data.startswith("start"):
                json_data = json.loads(data[6:])
                task = json_data.get("task")
                report_type = json_data.get("report_type")
                filename = f"task_{int(time.time())}_{task}"
                report_source = json_data.get("report_source")
                if task and report_type:
                    report = await manager.start_streaming(task, report_type, report_source, websocket)
                else:
                    print("Error: not enough parameters provided.")

    except WebSocketDisconnect:
        await manager.disconnect(websocket)

