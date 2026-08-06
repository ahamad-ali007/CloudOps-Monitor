from fastapi import APIRouter

router = APIRouter()


@router.get("/alerts")
def alerts():

    return [

        {

            "level": "Critical",

            "message": "CPU exceeded 90%"

        },

        {

            "level": "Warning",

            "message": "Storage utilization reached 78%"

        },

        {

            "level": "Info",

            "message": "EC2 instance restarted"

        }

    ]