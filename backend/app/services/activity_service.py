from sqlalchemy.orm import Session

from app.models.activity import Activity


def save_activity(
    db: Session,
    event_type: str,
    message: str,
):
    activity = Activity(
        event_type=event_type,
        message=message,
    )

    db.add(activity)
    db.commit()
    db.refresh(activity)

    return activity


def get_recent_activities(
    db: Session,
    limit: int = 50,
):
    return (
        db.query(Activity)
        .order_by(Activity.created_at.desc())
        .limit(limit)
        .all()
    )