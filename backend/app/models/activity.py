from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.database import Base


class Activity(Base):
    __tablename__ = "activities"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    event_type = Column(
        String(100),
        nullable=False,
    )

    message = Column(
        String(1000),
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )