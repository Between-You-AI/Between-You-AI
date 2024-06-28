# objective_service.py
from pydantic import BaseModel
from common.gpt_researcher.master.agent import GPTResearcher
from datetime import date
import string
from models.py_types.objective_type import Objective, User
import typing
import uuid

newUser = User(id = 1, name = 'Vardhman Hundia', email= 'vardhmanhundia@gmail.com', password='123')

class ObjectiveService:
  @staticmethod
  async def create_objective_plan(task_query: str):
    res = await GPTResearcher(task_query).get_objective()
    title = res.get("title")
    description = res.get("description")
    id = uuid.uuid4()
    
    
    finalresult = Objective(id = id, title = title, description = description, clarity = 30, completion_date = date.today(), created_at = date.today(), Owner = newUser, Collaborators=[], Permissions=[], Phases=[]) 
    return finalresult
    
  @staticmethod
  async def get_objective_plan(ObjectiveId: string) -> Objective:
    # create a query for objectives

    
    finalresult = Objective(id = ObjectiveId, title = 'Buy a house', description = 'Buy a $15,000 house', clarity = 30, completion_date = date.today(), created_at = date.today(), Owner = newUser, Collaborators=[], Permissions=[], Phases=[]) 
    print(finalresult)   
    return finalresult
  
  @staticmethod
  def get_all_objectives():
    obj1 = ObjectiveService.get_objective_plan(ObjectiveId='1')
    obj2 = ObjectiveService.get_objective_plan(ObjectiveId='2')
    
    return [obj1, obj2]
