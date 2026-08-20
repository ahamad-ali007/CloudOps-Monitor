from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    severity = Column(
        String(20),
        nullable=False,
    )

    title = Column(
        String(255),
        nullable=False,
    )

    message = Column(
        String(1000),
        nullable=False,
    )

    status = Column(
        String(20),
        default="active",
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )