from fastapi import FastAPI, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add the commons directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../common')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../models')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../apps')))

from common.gpt_researcher.master.agent import GPTResearcher

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed
)

templates = Jinja2Templates(directory="templates")

previous = ["Task - "]

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/chat")
async def get_chat(request: Request):
    data = await request.json()
    request_data = data.get("request")
    previous[0] += " " + request_data
    request_data = previous[0]
    results = await GPTResearcher(request_data).conduct_research()
    return results

@app.post("/objective")
async def get_obj(request: Request):
    data = await request.json()
    request_data = data.get("request")
    previous[0] += " " + request_data
    request_data = previous[0]
    results = await GPTResearcher(request_data).get_objectives()
    return results

@app.post("/estimates")
async def get_estimates(request: Request):
    data = await request.json()
    request_data = data.get("request")
    previous[0] += " " + request_data
    request_data = previous[0]
    results = await GPTResearcher(request_data).get_estimate()
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
