from typing import List
from fastapi import APIRouter
from apps.server.src.objectives.objective_service import ObjectiveService
import json
from models.py_types.objective_type import Objective
from pydantic.json import pydantic_encoder

router = APIRouter()


@router.get("/", response_model=List[Objective])
async def read_objectives():
    return ObjectiveService.get_all_objectives()
  
@router.get("/{objectId}", response_model=Objective)
async def read_objectives(objectiveId: str):
    return ObjectiveService.get_objective_plan(objectiveId)


# @router.get("/users/me", tags=["users"])
# async def read_user_me():
#     return {"username": "fakecurrentuser"}


# @router.get("/users/{username}", tags=["users"])
# async def read_user(username: str):
#     return {"username": username}