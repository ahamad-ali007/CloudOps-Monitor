from sqlalchemy.orm import Session

from app.models.alert import Alert


def save_alert(
    db: Session,
    severity: str,
    title: str,
    message: str,
):
    alert = Alert(
        severity=severity,
        title=title,
        message=message,
        status="active",
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)

    return alert


def get_recent_alerts(
    db: Session,
    limit: int = 20,
):
    return (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .limit(limit)
        .all()
    )