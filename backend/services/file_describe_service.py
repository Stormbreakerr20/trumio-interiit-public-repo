import dotenv
import json
import os
from openai import OpenAI

from api.models import RepoFilesDescriptionRequest, RepoFilesDescriptionResponse

dotenv.load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if api_key is None:
    raise Exception("OPENAI_API_KEY not found in environment variables")
else:
    client = OpenAI(api_key=api_key)


def describe_files(
    request: RepoFilesDescriptionRequest
) -> RepoFilesDescriptionResponse:
    output_format = """\n
    {
        "files": [
            {
                "name": "file1.py",
                "description": "This is the description of file1.py"
            },
            {
                "name": "file2.py",
                "description": "This is the description of file2.py"
            },
            ...
        ],
        "summary": "This is the summary of the repository"
    }
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {
                "role": "system",
                "content": f"You are a senior developer. You are expert in understanding the code and its context. You can describe the code in very details with critical information. \n ............ \n You have given the files of a repository. Please describe the files with as much detail as you can (minimum 30 words) .\n ............ \n Also give a detailed summary of the repository and the technologies used in it. You have to give the output in the following json format without trailing commas: \n {output_format}",
            },
            {
                "role": "user",
                "content": "\n".join(
                    [
                        f"{file.name} is a file. It is located at {file.path} and its content is: \n {file.content} \n ............ \n"
                        for file in request.repo_files
                    ]
                ),
            },
        ],
    )

    if response.choices[0].message.content:
        response_json = json.loads(response.choices[0].message.content)

        return RepoFilesDescriptionResponse(
            repo_files_description=response_json["files"],
            summary=response_json["summary"],
        )
    else:
        return RepoFilesDescriptionResponse(
            repo_files_description=[], summary="No summary found"
        )
