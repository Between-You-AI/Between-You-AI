# objective_service.py
from datetime import datetime
from pydantic import BaseModel
from common.gpt_researcher.master.agent import GPTResearcher
from models.py_types.objective_type import Objective, User

class ObjectiveService:
    async def get_objective_plan(self, task: str, user_name: str, user_id: int, user_email: str, user_password: str) -> str:
        # Create a query for objectives
        res = await GPTResearcher(task).get_objective()
        title = res.get("title")
        description = res.get("description")
        id = 1
        created_at = datetime.now()
        owner = User(id=user_id, name=user_name, email=user_email, password=user_password)
        collaborators = []  # Replace with actual list of User instances if available
        permissions = []  # Replace with actual list of permissions if available
        phases = []  # Replace with actual list of phases if available
        completion_date = datetime.now()  # Assuming you have a completion date, else set to None

        final_result = Objective(
            id=id,
            title=title,
            description=description,
            clarity=10,  # Assuming clarity is an int, set it to 10 or any other default value
            created_at=created_at,
            owner=owner,
            collaborators=collaborators,
            permissions=permissions,
            phases=phases,
            completion_date=completion_date
        )
        
        return final_result
