from fastapi import APIRouter

router = APIRouter()


@router.get("/timeline")
def timeline():

    return [

        {

            "time": "11:10",

            "event": "EC2 Started"

        },

        {

            "time": "11:18",

            "event": "CloudWatch Alarm Triggered"

        },

        {

            "time": "11:25",

            "event": "User Login"

        },

        {

            "time": "11:35",

            "event": "Lambda Executed"

        }

    ]