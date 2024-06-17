import json
import os
from openai import OpenAI
from dotenv import load_dotenv
from api.models import MilestonesRequest

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    client = OpenAI(api_key=api_key)
else:
    raise Exception("OPENAI_API_KEY not found in environment variables")


def create_milestone_prompt(project: MilestonesRequest):
    prompt = f""" \n

    Project Name: {project.project_name} \n
    Project Description: {project.project_description} \n
    Project Duration: {project.project_duration} {project.project_duration_unit} \n
    Project Cost: {project.project_cost} {project.project_currency} \n
    Skills Required: {project.skills_required} \n
    Tools Required: {project.tools_required} \n
"""

    prompt += """ \n
    Availablity: \n
    """

    if project.weekdays:
        prompt += f"Weekdays: {project.weekdayStartHour} - {project.weekdayEndHour} \n"

    if project.weekends:
        prompt += f"Weekends: {project.weekendStartHour} - {project.weekendEndHour} \n"

    prompt += """ \n
    Working Days: \n
    """

    if project.workingWeekdays:
        prompt += f"Weekdays: {project.workingWeekdays} \n"

    if project.workingWeekends:
        prompt += f"Weekends: {project.workingWeekends} \n"

    prompt += """Provide a list of milestones with description and duration for the project {project.project_name} in the following format: \n
    """

    prompt += """ \n
    {
        "milestones": [
            {
                "name": "Milestone 1",
                "cost": "100 <currency>",
                "description": "This is the description of milestone 1",
                "duration": "2 <unit>",
                "skills_required": ["skill1", "skill2"]
            },
            {
                "name": "Milestone 2",
                "cost": "100 <currency>",
                "description": "This is the description of milestone 2",
                "duration": "1 <unit>",
                "skills_required": ["skill1", "skill2"]
            }
        ]
    }
    """

    return prompt


async def generate_milestones(Prompt: str):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-16k",
            messages=[
                {
                    "role": "system",
                    "content": "You are professional project manager. You are expert in understanding a project from its context and its requiremen, you can break a project into various milestones with proper description and duration and proper breakdown of project cost. You can also identify the skills and tools required for a project. You have given the details of a project, a person is going to work on this project.",
                },
                {"role": "user", "content": Prompt},
            ],
        )

        if response.choices[0].message.content:
            response_json = json.loads(response.choices[0].message.content)

            return response_json

    except Exception as e:
        return {"status": "Internal Server Error 500", "message": str(e), "error": True}
