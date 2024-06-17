import datetime
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum


class Chapter(BaseModel):
    title: str
    description: str

    @classmethod
    def toDict(cls, chapter):
        return {"title": chapter.title, "description": chapter.description}


class Transcript(BaseModel):
    text: str


class MoM(BaseModel):
    agenda: str
    key_points: List[str]
    action_items: List[str]


class MoMs(BaseModel):
    minutes: List[MoM]


class TranscriptSummary(BaseModel):
    chapters: List[Chapter]

    @classmethod
    def toDict(cls, transcript_summary):
        return {
            "chapters": [
                Chapter.toDict(chapter) for chapter in transcript_summary.chapters
            ]
        }


class TranscriptRequest(BaseModel):
    transcript: str
    project_name: str
    description: str
    duration: int
    duration_unit: str


class TranscriptResponse(BaseModel):
    transcript_summary: TranscriptSummary
    message: Optional[str]


class TeamMember(BaseModel):
    id: str
    name: str
    role: str

    @classmethod
    def toDict(cls, member):
        return {"name": member.name, "role": member.role}

    @classmethod
    def toString(cls, member):
        return f"Member name: {member.name}\nMember role: {member.role}"


class MeetingTranscript(BaseModel):
    timestamp: str
    members: List[TeamMember]
    trancriptSummary: TranscriptSummary

    @classmethod
    def toString(cls, transcript):
        return f"Meeting timestamp: {transcript.timestamp}\nMeeting members: {[TeamMember.toString(member) for member in transcript.members]}\nMeeting transcript: {transcript.trancriptSummary}"


class Milestone(BaseModel):
    name: str
    description: str
    duration: str
    cost: str
    deliverables: Optional[List[str]] = None
    skills_required: Optional[List[str]] = None


class MilestonesRequest(BaseModel):
    project_name: str
    project_description: str
    project_duration: int
    project_duration_unit: str
    skills_required: List[str] or None
    tools_required: List[str] or None
    project_cost: int
    project_currency: str
    weekdays: bool
    weekends: bool
    weekdayStartHour: int
    weekdayEndHour: int
    weekendStartHour: int
    weekendEndHour: int
    workingWeekdays: List[str]
    workingWeekends: List[str]


class Team(BaseModel):
    name: str
    description: str
    members: List[TeamMember]

    @classmethod
    def toString(cls, team):
        return f"Team name: {team.name}\nTeam description: {team.description}\nTeam members: {[TeamMember.toString(member) for member in team.members]}"


class Budget(BaseModel):
    amount: str
    currency: str


class ProjectStatus(str, Enum):
    active = "active"
    completed = "completed"
    cancelled = "cancelled"


class ProjectProgress(BaseModel):
    completed: int
    total: int


class Skill(BaseModel):
    id: str
    name: str


class Tool(BaseModel):
    id: str
    name: str


class Project(BaseModel):
    id: str
    project_name: str
    description: str
    duration: int
    duration_unit: str
    timezone: str
    timeOverlap: int
    weekdays: bool
    weekends: bool
    weekdayStartHour: int
    weekdayEndHour: int
    weekendStartHour: int
    weekendEndHour: int
    workingWeekdays: List[str]
    workingWeekends: List[str]
    countries: List[str]
    isIncluding: bool
    nda: bool
    budget: Budget
    progress: ProjectProgress
    status: ProjectStatus
    meeting_transcripts: List[MeetingTranscript] or None
    milestones: List[Milestone]
    skills: List[Skill] or None
    tools: List[Tool] or None

    @classmethod
    def toStr(cls, project):
        return f"Project name: {project.name}\nProject description: {project.description}\nProject budget: {project.budget.amount} {project.budget.currency}\nProject expected duration: {project.expected_duration}\nProject listing duration: {project.listing_duration}\nProject team: {[team.toString(project.team) for team in project.team]}\nProject milestones: {[milestone.toString(project.milestones) for milestone in project.milestones]}"


class ProjectRequest(BaseModel):
    project: Project


class GithubUser(BaseModel):
    name: str
    email: str
    username: str
    avatar_url: str or None


class Commit(BaseModel):
    sha: str
    message: str
    author: GithubUser
    timestamp: datetime.datetime


class CommitRequest(BaseModel):
    owner: str
    repo: str
    since: Optional[datetime.datetime] = None


class CommitsResponse(BaseModel):
    commits: List[Commit]


class CommitResponse(BaseModel):
    commits: List[Commit]


class CommitDiff(BaseModel):
    sha: str
    diff: str


class CommitDiffRequest(BaseModel):
    owner: str
    repo: str
    commit_sha: str


class CommitDiffResponse(BaseModel):
    commit_diff: CommitDiff


class CommitSummary(BaseModel):
    commit: Commit
    commit_diff: CommitDiff
    summary: List[str]


class AllCommitsSummary(BaseModel):
    commits: List[CommitSummary]


class AllCommitsSummaryRequest(BaseModel):
    owner: str
    repo: str


class RepoContent(BaseModel):
    name: str
    path: str
    url: str
    type: str


class RepoContentRequest(BaseModel):
    owner: str
    repo: str


class RepoContentResponse(BaseModel):
    repo_content: List[RepoContent]


class RepoFile(BaseModel):
    name: str
    path: str
    url: str
    type: str
    content: str


class RepoFiles(BaseModel):
    repo_files: List[RepoFile]


class RepoFileRequest(BaseModel):
    owner: str
    repo: str
    path: str


class RepoFileResponse(BaseModel):
    repo_file: RepoFile


class RepoFilesResponse(BaseModel):
    repo_files: List[RepoFile]


class RepoFileDescription(BaseModel):
    name: str
    description: str


class RepoFilesDescriptionRequest(BaseModel):
    repo_files: List[RepoFile]


class RepoFilesDescriptionResponse(BaseModel):
    repo_files_description: List[RepoFileDescription]
    summary: str


class CommitData(BaseModel):
    sha: str
    timestamp: datetime.datetime
    author: GithubUser
    message: str


class RepoFileData(BaseModel):
    name: str
    description: str
    path: str
    url: str


class RepoData(BaseModel):
    name: str
    owner: GithubUser
    summary: Optional[str] = None
    url: str
    commits: List[CommitData]
    repo_files: Optional[List[RepoFileData]] = None


class RepoDataRequest(BaseModel):
    owner: str
    repo: str
    since: Optional[datetime.datetime] = None


class RepoDataResponse(BaseModel):
    repo_data: Optional[RepoData] = None
    error: Optional[str] = None


class GithubUserProfile(BaseModel):
    name: str
    email: str
    username: str
    avatar_url: str or None


class GithubUserProfileRequest(BaseModel):
    username: str
