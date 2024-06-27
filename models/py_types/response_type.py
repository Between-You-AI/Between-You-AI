from typing import Generic, TypeVar, List, Optional, Dict
from pydantic import BaseModel, Field

T = TypeVar('T')

class Error(BaseModel):
    status_code: int
    detail: str

class ResponseData(BaseModel, Generic[T]):
    read: Optional[List[T]] = None
    created: Optional[List[T]] = None
    updated: Optional[List[T]] = None
    deleted: Optional[List[T]] = None

class Response(BaseModel, Generic[T]):
    statusCode: int
    data: ResponseData[T]
    error: Optional[Error] = None