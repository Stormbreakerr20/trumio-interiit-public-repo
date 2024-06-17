import openai
import os
from dotenv import load_dotenv
from api.models import CommitDiff

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    client = openai.OpenAI(api_key=api_key)
else:
    raise Exception("OPENAI_API_KEY not found in environment variables")


def summarise_commit(diff: CommitDiff):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-16k",
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert programmer, and you are trying to summarize a git diff.
    Reminders about the git diff format:
    For every file, there are a few metadata lines, like (for example):
    ```
    diff --git a/lib/index.js b/lib/index.js
    index aadf691..bfef603 100644
    --- a/lib/index.js
    +++ b/lib/index.js
    ```
    This means that `lib/index.js` was modified in this commit. Note that this is only an example.
    Then there is a specifier of the lines that were modified.
    A line starting with `+` means it was added.
    A line that starting with `-` means that line was deleted.
    A line that starts with neither `+` nor `-` is code given for context and better understanding.
    It is not part of the diff.
    [...]
    EXAMPLE SUMMARY COMMENTS:
    ```
    * Raised the amount of returned recordings from `10` to `100` [packages/server/recordings_api.ts], [packages/server/constants.ts]
    * Fixed a typo in the github action name [.github/workflows/gpt-commit-summarizer.yml]
    * Moved the `octokit` initialization to a separate file [src/octokit.ts], [src/index.ts]
    * Added an OpenAI API for completions [packages/utils/apis/openai.ts]
    * Lowered numeric tolerance for test files
    ```
    Most commits will have less comments than this examples list.
    The last comment does not include the file names,
    because there were more than two relevant files in the hypothetical commit.
    Do not include parts of the example in your summary.
    It is given only as an example of appropriate comments.

    Remember to include the file names in your comments.

    Return the comments as a list of strings, separated by newlines.""",
                },
                {
                    "role": "user",
                    "content": f"""Please summarise the following diff file: \n\n{diff}
                    
                    """,
                },
            ],
        )

        if response.choices[0].message.content:
            summary = []
            for line in response.choices[0].message.content.split("\n"):
                if line.startswith("*"):
                    summary.append(line)
            return summary
        else:
            return None
    except Exception as e:
        print(e)
        return None


def summarise_all_commits(commits):
    summaries = []
    for commit in commits:
        summaries.append(summarise_commit(commit))
    return summaries
