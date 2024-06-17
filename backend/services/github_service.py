from typing import List
import requests
from services.file_describe_service import describe_files
import utils.consts as consts
from base64 import b64decode
from typing import Optional
from api.models import (
    Commit,
    CommitData,
    CommitDiff,
    CommitDiffRequest,
    CommitDiffResponse,
    CommitRequest,
    CommitsResponse,
    GithubUser,
    GithubUserProfileRequest,
    RepoContentRequest,
    RepoContentResponse,
    RepoContent,
    RepoData,
    RepoDataRequest,
    RepoDataResponse,
    RepoFile,
    RepoFileRequest,
    RepoFilesDescriptionRequest,
    RepoFileData,
)


class GithubService:
    def __init__(self, token: str):
        self.token = token
        self.headers = {"Authorization": f"token {self.token}"}

    def get_commit_diff(
        self, commitDiffRequest: CommitDiffRequest
    ) -> Optional[CommitDiffResponse]:
        url = f"https://github.com/{commitDiffRequest.owner}/{commitDiffRequest.repo}/commit/{commitDiffRequest.commit_sha}.diff"
        response = requests.get(url, headers=self.headers)

        print("response: ", response.text)

        if response.status_code == 200:
            return CommitDiffResponse(
                commit_diff=CommitDiff(
                    sha=commitDiffRequest.commit_sha, diff=response.text
                )
            )
        else:
            return None

    def get_commits(self, request: CommitRequest) -> Optional[CommitsResponse]:
        url = f"https://api.github.com/repos/{request.owner}/{request.repo}/commits"
        if request.since:
            url += f"?since={request.since.isoformat()}"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            for commit in response.json():
                name = commit["commit"]["author"]["name"]
                email = commit["commit"]["author"]["email"]
                username = commit["author"]["login"]
                avatar_url = commit["author"]["avatar_url"]

                return CommitsResponse(
                    commits=[
                        Commit(
                            sha=commit["sha"],
                            message=commit["commit"]["message"],
                            author=GithubUser(
                                name=name,
                                email=email,
                                username=username,
                                avatar_url=avatar_url,
                            ),
                            timestamp=commit["commit"]["author"]["date"],
                        )
                        for commit in response.json()
                    ]
                )

    def get_directory_content(self, directory: dict) -> List[RepoContent]:
        url = directory["url"]
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            files = [
                content
                for content in response.json()
                if content["type"] == "file"
                and content["name"].endswith(tuple(consts.included_extensions))
            ]

            for directory in [
                content for content in response.json() if content["type"] == "dir"
            ]:
                files.extend(self.get_directory_content(directory))

            return files
        else:
            return []

    def get_repo_files(
        self, request: RepoContentRequest
    ) -> Optional[RepoContentResponse]:
        url = f"https://api.github.com/repos/{request.owner}/{request.repo}/contents"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            files = [
                content
                for content in response.json()
                if content["type"] == "file"
                and content["name"].endswith(tuple(consts.included_extensions))
            ]

            for directory in [
                content for content in response.json() if content["type"] == "dir"
            ]:
                files.extend(self.get_directory_content(directory))

            return RepoContentResponse(
                repo_content=[
                    RepoContent(
                        name=file["name"],
                        path=file["path"],
                        url=file["url"],
                        type=file["type"],
                    )
                    for file in files
                ]
            )

        else:
            return None

    def get_repo_file_content(self, request: RepoFileRequest) -> Optional[RepoFile]:
        url = f"https://api.github.com/repos/{request.owner}/{request.repo}/contents/{request.path}"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return RepoFile(
                name=response.json()["name"],
                path=response.json()["path"],
                url=response.json()["url"],
                type=response.json()["type"],
                content=b64decode(response.json()["content"]).decode(
                    "utf-8", "replace"
                ),
            )

        else:
            return None

    def get_commit_author(
        self, commitDiffRequest: CommitDiffRequest
    ) -> Optional[CommitDiffResponse]:
        url = f"https://api.github.com/repos/{commitDiffRequest.owner}/{commitDiffRequest.repo}/commits/{commitDiffRequest.commit_sha}"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return CommitDiffResponse(
                commit_diff=CommitDiff(
                    sha=commitDiffRequest.commit_sha, diff=response.text
                )
            )
        else:
            return None

    def get_profile_data(
        self, request: GithubUserProfileRequest
    ) -> Optional[GithubUser]:
        url = f"https://api.github.com/users/{request.username}"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return GithubUser(
                name=response.json()["name"],
                email=response.json()["email"],
                username=response.json()["login"],
                avatar_url=response.json()["avatar_url"],
            )
        else:
            return None

    def get_all_data(self, request: RepoDataRequest) -> RepoDataResponse:
        # Profile Data
        profile = self.get_profile_data(
            GithubUserProfileRequest(username=request.owner)
        )

        if profile is None:
            return RepoDataResponse(
                repo_data=None,
                error="Profile data not found",
            )

        commits_data = []

        if not request.since:
            commits = self.get_commits(
                CommitRequest(owner=request.owner, repo=request.repo)
            )

            if commits:
                for commit in commits.commits:
                    commits_data.append(
                        CommitData(
                            sha=commit.sha,
                            message=commit.message,
                            author=commit.author,
                            timestamp=commit.timestamp,
                        )
                    )

            files = []
            summary = ""
            repo_files = self.get_repo_files(
                RepoContentRequest(owner=request.owner, repo=request.repo)
            )

            if repo_files:
                contents = []
                for file in repo_files.repo_content:
                    content = self.get_repo_file_content(
                        RepoFileRequest(
                            owner=request.owner, repo=request.repo, path=file.path
                        )
                    )

                    if content:
                        contents.append(content)

                descriptions_and_summary = describe_files(
                    RepoFilesDescriptionRequest(repo_files=contents)
                )

                descriptions = descriptions_and_summary.repo_files_description

                summary = descriptions_and_summary.summary

                for file, description in zip(contents, descriptions):
                    files.append(
                        RepoFileData(
                            name=file.name,
                            description=description.description,
                            path=file.path,
                            url=file.url,
                        )
                    )

            return RepoDataResponse(
                repo_data=RepoData(
                    name=request.repo,
                    owner=profile,
                    commits=commits_data,
                    repo_files=files,
                    summary=summary,
                    url=f"https://github.com/{request.owner}/{request.repo}",
                ),
                error=None,
            )
        else:
            commits = self.get_commits(
                CommitRequest(
                    owner=request.owner, repo=request.repo, since=request.since
                )
            )

            if commits:
                for commit in commits.commits:
                    commits_data.append(
                        CommitData(
                            sha=commit.sha,
                            message=commit.message,
                            author=commit.author,
                            timestamp=commit.timestamp,
                        )
                    )

            return RepoDataResponse(
                repo_data=RepoData(
                    name=request.repo,
                    owner=profile,
                    summary=None,
                    repo_files=None,
                    commits=commits_data,
                    url=f"https://github.com/{request.owner}/{request.repo}",
                )
            )
