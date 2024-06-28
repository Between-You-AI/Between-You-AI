from fastapi import APIRouter
from  pydantic import BaseModel
from typing import List
from models.py_types.expert_type import Expert
from .service import ExpertService

router = APIRouter()

class CreateObjectiveResponseBody(BaseModel):
    task_query: str


@router.get("/", response_model=Expert)
async def read_objectives():
    return ExpertService.get_expert()

@router.post('/', response_model=Expert)
async def create_objective(request: CreateObjectiveResponseBody):
    return await ExpertService(request).find_expert()

# @router.get("/users/me", tags=["users"])
# async def read_user_me():
#     return {"username": "fakecurrentuser"}


# @router.get("/users/{username}", tags=["users"])
# async def read_user(username: str):
#     return {"username": username}