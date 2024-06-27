from typing import List, Optional, Union, Literal
from pydantic import BaseModel, Field
from datetime import datetime

class User(BaseModel):
    id: int
    email: str
    password: str
    
class Objective(BaseModel):
    id: int
    title: str
    description: str
    clarity: int
    created_at: datetime
    owner: User
    collaborators: List[User] = []
    permissions: List[str] = []
    phases: List[str] = []
    completion_date: datetime = None
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
    
class UserPermission(BaseModel):
    id: int
    User: User
    Objective: Objective
    PermissionType: str

class Activity(BaseModel):
    name: str
    description: str
    AssignedTo: User
    ActivityType: str
    cost: float
    duration: int
    AssignedBy: User
    start_date: datetime
    completion_date: datetime
    order: int

class Dependency(BaseModel):
    activity: Activity
    type: Literal["FIFO", "LIFO", "FILO", "LILO"]

class Relation(BaseModel):
    task: "Task"
    type: Literal["FIFO", "LIFO", "FILO", "LILO"]

class Task(BaseModel):
    name: str
    description: str
    duration: int
    start_time: datetime
    end_time: datetime
    Budget: float
    order: int
    relatedTo: Relation
    Activities: List[Activity]

class Step(BaseModel):
    name: str
    description: str
    assignedTo: User
    assignedBy: User
    duration: int
    start_time: datetime
    end_time: datetime
    order: int
    Tasks: List[Task]

class Phase(BaseModel):
    name: str
    description: str
    PhaseBefore: Optional["Phase"]
    PhaseAfter: Optional["Phase"]
    duration: int
    start_time: datetime
    end_time: datetime
    Steps: List[Step]

# Updating forward references
Objective.update_forward_refs()
UserPermission.update_forward_refs()
Phase.update_forward_refs()
Relation.update_forward_refs()