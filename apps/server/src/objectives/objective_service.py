import datetime
import string
from models.py_types.objective_type import Objective, User


class ObjectiveService:
  def get_objective_plan(task: string, User: User):
    # create a query for objectives
    title, description = func()
    id = 1
    created_at =  datetime.date
    owner = User
    Collaborators = []
    Permissions = []
    Phases = PhaseService.get_phases(title, description)
    finalresult = Objective()    
    return finalresult.model_dump_json(indent=4)
    