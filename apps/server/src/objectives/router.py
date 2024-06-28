from fastapi import APIRouter
import pydantic
from typing import List
from apps.server.src.objectives.objective_service import ObjectiveService
import json
from models.py_types.objective_type import Objective
from pydantic.json import pydantic_encoder

router = APIRouter()

class CreateObjectiveResponseBody(pydantic.BaseModel):
    task_query: str


@router.get("/", response_model=List[Objective])
async def read_objectives():
    return ObjectiveService.get_all_objectives()
  
@router.get("/{objectId}", response_model=Objective)
async def read_objectives(objectiveId: str):
    return ObjectiveService.get_objective_plan(objectiveId)


@router.post('/', response_model=Objective)
async def create_objective(request: CreateObjectiveResponseBody):
    return ObjectiveService.create_objective_plan(request.task_query)

# @router.get("/users/me", tags=["users"])
# async def read_user_me():
#     return {"username": "fakecurrentuser"}


# @router.get("/users/{username}", tags=["users"])
# async def read_user(username: str):
#     return {"username": username}