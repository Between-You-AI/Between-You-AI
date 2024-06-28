from pydantic import BaseModel


class Expert(BaseModel):
    name: str
    quote: str