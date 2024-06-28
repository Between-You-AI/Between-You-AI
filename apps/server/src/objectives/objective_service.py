from datetime import date
import string
from models.py_types.objective_type import Objective, User
import typing


class ObjectiveService:
  @staticmethod
  def get_objective_plan(ObjectiveId: string) -> Objective:
    # create a query for objectives
    newUser = User(id = ObjectiveId, name = 'Vardhman Hundia', email= 'vardhmanhundia@gmail.com', password='123')
    finalresult = Objective(id = ObjectiveId, title = 'Buy a House', description = 'I want to buy a fully functioning house at Evnaston', clarity = 30, completion_date = date.today(), created_at = date.today(), Owner = newUser, Collaborators=[], Permissions=[], Phases=[]) 
    print(finalresult)   
    return finalresult
  
  @staticmethod
  def get_all_objectives():
    obj1 = ObjectiveService.get_objective_plan(ObjectiveId='1')
    obj2 = ObjectiveService.get_objective_plan(ObjectiveId='2')
    
    return [obj1, obj2]
    
    