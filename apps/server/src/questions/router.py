from fastapi import APIRouter
from  pydantic import BaseModel
from typing import List
from models.py_types.question_type import QuestionTask
from .questions_service import QuestionsService 

router = APIRouter()

class CreateObjectiveResponseBody(BaseModel):
    task_query: str

@router.post('/', response_model=List[QuestionTask])
async def create_objective(request: CreateObjectiveResponseBody):
    return await QuestionsService.create_Questions_plan(request.task_query)

# @router.get("/users/me", tags=["users"])
# async def read_user_me():
#     return {"username": "fakecurrentuser"}


# @router.get("/users/{username}", tags=["users"])
# async def read_user(username: str):
#     return {"username": username}