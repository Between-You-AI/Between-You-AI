# objective_service.py
from pydantic import BaseModel
from common.gpt_researcher.master.agent import GPTResearcher
from datetime import date
import string
from models.py_types.objective_type import Objective, User

newUser = User(id = 1, name = 'Vardhman Hundia', email= 'vardhmanhundia@gmail.com', password='123')

class ObjectiveService:
  @staticmethod
  async def create_objective_plan(task_query: str):
    res = await GPTResearcher(task_query).get_objective()
    title: str = res.get("title")
    description: str = res.get("description")
    id = 3
    
    return Objective(id = id, title = title, description = description, clarity = 30, completion_date = date.today().isoformat(), created_at = date.today().isoformat(), Owner = newUser, Collaborators=[], Permissions=[], Phases=[]) 
    
  @staticmethod
  async def get_objective_plan(ObjectiveId: string):
    result =  Objective(id = ObjectiveId, title = 'Buy a house', description = 'Buy a $15,000 house', clarity = 30, completion_date = date.today().isoformat(), created_at = date.today().isoformat(), Owner = newUser, Collaborators=[], Permissions=[], Phases=[]) 
    print(result)
    return result

  @staticmethod
  async def get_all_objectives():
    obj1: Objective = await ObjectiveService.get_objective_plan(ObjectiveId='1')
    obj2: Objective = await ObjectiveService.get_objective_plan(ObjectiveId='2')
    
    return [obj1, obj2]
