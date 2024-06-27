from typing import Generic, TypeVar, List, Optional, Union
from pydantic import BaseModel, Field

T = TypeVar('T')

class AnswerPrefixOrSuffix(BaseModel, Generic[T]):
    defaultValue: T
    options: List[T]

class Answer(BaseModel, Generic[T]):
    AnswerTypeCode: str  # We will handle the AnswerTypes separately
    prefix: Optional[AnswerPrefixOrSuffix[T]] = None
    suffix: Optional[AnswerPrefixOrSuffix[T]] = None
    options: Optional[List[T]] = None
    validation: Optional[str] = None

class QuestionTask(BaseModel, Generic[T]):
    question: str
    Answer: Answer[T]

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