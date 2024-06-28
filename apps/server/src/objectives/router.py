from fastapi import APIRouter
from  pydantic import BaseModel
from typing import List
from models.py_types.objective_type import Objective
from .objective_service import ObjectiveService

router = APIRouter()

class CreateObjectiveResponseBody(BaseModel):
    task_query: str


@router.get("/", response_model=List[Objective])
async def read_objectives():
    return await ObjectiveService.get_all_objectives()
  
@router.get("/{objectId}", response_model=Objective)
async def read_objectives(objectiveId: str):
    return await ObjectiveService.get_objective_plan(objectiveId)


@router.post('/', response_model=Objective)
async def create_objective(request: CreateObjectiveResponseBody):
    return await ObjectiveService.create_objective_plan(request.task_query)

# @router.get("/users/me", tags=["users"])
# async def read_user_me():
#     return {"username": "fakecurrentuser"}


# @router.get("/users/{username}", tags=["users"])
# async def read_user(username: str):
#     return {"username": username}