from pydantic import BaseModel
from typing import List


class TimelineEvent(BaseModel):
    time: str
    event: str


class TimelineResponse(BaseModel):
    count: int
    timeline: List[TimelineEvent]