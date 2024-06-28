from typing import List, Optional, Union, Literal
from pydantic import BaseModel, ConfigDict, Field

class Expert(BaseModel):
    agent: str
    description: str
