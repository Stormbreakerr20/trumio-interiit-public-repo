import json
import os
from openai import OpenAI
from dotenv import load_dotenv
from api.models import MoM, Project

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    client = OpenAI(api_key=api_key)
else:
    raise Exception("OPENAI_API_KEY not found in environment variables")


def create_prompt(project: Project):
    prompt = f""" You have given a context of a project as follows: \n
    
    Project Name: {project.project_name} \n
    Project Description: {project.description} \n
    Project Duration: {project.duration} {project.duration_unit} \n

    # Project Team: \n
    # """

    # for member in project.team.members:
    #     prompt += f"Name: {member.name}, Role: {member.role} \n"

    prompt += """ \n
    Project Milestones: \n
    """

    for milestone in project.milestones:
        prompt += f"Name: {milestone.name}, Description: {milestone.description}, Duration: {milestone.duration}, Milestones Deliverables: {milestone.deliverables} \n"

    prompt += """ \n
    Project Skills Required: \n
    """

    if project.skills:
        for skill in project.skills:
            prompt += f"{skill.name} \n"
        prompt += "\n"
    prompt += """ \n
    Project Tools Required: \n
    """

    if project.tools:
        for tool in project.tools:
            prompt += f"{tool.name} \n"

    prompt += """ \n
    Project Meeting Transcripts: \n
    """

    if project.meeting_transcripts:
        for transcript in project.meeting_transcripts:
            prompt += f"Timestamp: {transcript.timestamp} \n"

            prompt += """ \n
            Meeting Members: \n
            """

            for member in transcript.members:
                prompt += f"Name: {member.name}, Role: {member.role} \n"

            prompt += """ \n
            Transcript Summary: \n
            """

            for chapter in transcript.trancriptSummary.chapters:
                prompt += (
                    f"Title: {chapter.title}, Description: {chapter.description} \n"
                )

    prompt += """ \n
    You have given a meeting transcription. You have to break it into chapters and give a list of chapters with title and detailed description(Try to include as much information as posible in description). You can use the following format to return the chapters as json. \n
    {
        'Chapters': [
            {
                'Title': '<Chapter Name>',
                'Details': '<Pointwise Description of everything discussed in this chapter>',
            },
            {
                'Title': '<Chapter Name>',
                'Details': '<Pointwise Description of everything discussed in this chapter>',
            },
        ],
        'error': False
    }
    """

    return prompt


async def get_chapters_from_transcription(transcription: str, prompt: str):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-16k",
            messages=[
                {
                    "role": "system",
                    "content": prompt,
                },
                {"role": "user", "content": f"{transcription}"},
            ],
        )
        # return {"text": str(response.choices[0].message.content)}
        if response.choices[0].message.content:
            response_json = json.loads(response.choices[0].message.content)
            # print(response_json)
            return response_json

    except Exception as e:
        return {"status": "Internal Server Error 500", "message": str(e), "error": True}


def get_minutes_of_meetings_from_transcription(transcription: str):
    prompt = """ You have given a meeting transcription. You have to understand the meeting and give a list of Key Points discussed in the meeting. You can use the following format to return the minutes of meeting as json. \n"""

    prompt += """ \n
    {
        "Minutes": [
            {
                "agenda": "<Agenda of the meeting>",
                "key_points": [
                    "<Key Point 1>",
                    "<Key Point 2>",
                    "<Key Point 3>",
                ],
                "action_items": [
                    "<Action Item 1>",
                    "<Action Item 2>",
                    "<Action Item 3>",
                ],
            },
            {
                "agenda": "<Agenda of the meeting>",
                "key_points": [
                    "<Key Point 1>",
                    "<Key Point 2>",
                    "<Key Point 3>",
                ],
                "action_items": [
                    "<Action Item 1>",
                    "<Action Item 2>",
                    "<Action Item 3>",
                ],
            },
        ],
        "error": False
    }
    """

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-16k",
            messages=[
                {
                    "role": "system",
                    "content": prompt,
                },
                {"role": "user", "content": f"{transcription}"},
            ],
        )
        if response.choices[0].message.content:
            print(response.choices[0].message.content)
            response_json = json.loads(response.choices[0].message.content)
            print(response_json)
            moms = []
            for mom in response_json["Minutes"]:
                moms.append(
                    MoM(
                        agenda=mom["agenda"],
                        key_points=mom["key_points"],
                        action_items=mom["action_items"],
                    )
                )
            return moms

    except Exception as e:
        return {"status": "Internal Server Error 500", "message": str(e), "error": True}
