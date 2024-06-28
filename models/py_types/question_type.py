from typing import Generic, TypeVar, List, Optional, Union
from pydantic import BaseModel, Field

T = TypeVar('T')

class AnswerPrefixOrSuffix(BaseModel):
    defaultValue: str
    options: List[str]

class Answer(BaseModel):
    AnswerTypeCode: str  # We will handle the AnswerTypes separately
    prefix: Optional[List[str]] = None
    suffix: Optional[List[str]] = None
    options: Optional[List[str]] = None
    validation: Optional[str] = None

class QuestionTask(BaseModel):
    question: str
    Answer: Answer

# Since Python doesn't have a direct equivalent of TypeScript's `typeof`, 
# we can define AnswerTypes as a class with class variables.
class AnswerTypes:
    INT = "INT"
    FLOAT = "FLOAT"
    TEXT = "TEXT"
    STRING = "STRING"
    BOOLEAN = "BOOLEAN"
    SINGLE_CHOICE = "SINGLE_CHOICE"
    MULTI_CHOICE = "MULTI_CHOICE"