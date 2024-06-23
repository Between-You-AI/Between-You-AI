import asyncio
import json
from datetime import datetime
from typing import List, Optional, Union

from pydantic import BaseModel
from gpt_researcher.config import Config
from gpt_researcher.memory import Memory
from gpt_researcher.utils.llm import create_chat_completion
from gpt_researcher.researcher.research import GoogleBard
from experts.service import ExpertService

previous_queries = []
questions = []
class Task(BaseModel):
    id: int
    name: str
    objective_id: int
    task_level: int
    parent_task: int
    sub_tasks: Optional[List['Task']] = []
    next_task: Optional['Task'] = None
    prev_task: Optional['Task'] = None
    task_types: Optional[List['TaskType']] = []
    task_type: Optional[List['TaskType']] = None
    estimates_id: Optional[int] = None
    question_tasks: Optional[List['QuestionTask']] = []
    milestone_id: Optional[int] = None
    achieved_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class QuestionTask(BaseModel):
    question: str
    answer: Union[str, int, float, None]
    question_type: str
    related_data: dict

class Milestone(BaseModel):
    id: int
    name: str
    tasks_to_complete: Optional[List[Task]] = []

class TaskUpdate(BaseModel):
    id: int
    is_latest: bool
    created_at: datetime
    status: str
    task_id: int
    qualifier: float

class Objective(BaseModel):
    statement: str
    clarity: float
    task_id: int

class TaskType(BaseModel):
    name: str
    icon_image: str

class Estimates(BaseModel):
    days: int
    date: str
    budget: str

class GPTResponse(BaseModel):
    tasks: List[Task] = []
    objectives: List[Objective] = []
    task_updates: List[TaskUpdate] = []
    task_types: List[TaskType] = []
    milestones: List[Milestone] = []
    estimates: List[Estimates] = []
    questions: List[QuestionTask] = []

class GPTResearcher:
    """GPT Researcher"""

    def __init__(self, query: str, report_type: str = None, report_source=None, source_urls=None, config_path=None, websocket=None, verbose: bool = True):
        self.query: str = query
        self.report_type: str = report_type
        self.report_source: str = report_source
        self.source_urls = source_urls
        self.verbose: bool = verbose
        self.websocket = websocket
        self.cfg = Config(config_path)
        self.agent = None
        self.context = []
        self.memory = Memory(self.cfg.embedding_provider)
        self.type: str = ""
        
    async def conduct_research(self):
        previous_queries.append(self.query)
        print("Previous Queries:", previous_queries)
        self.agent = await ExpertService(self.query,self.cfg).find_expert()
        response = await self.get_gpt_response(previous_queries, self.context)
        questions.append(response)
        print(questions)
        return response
    
    async def researcher_openai(self):
        return await self.get_suggestions()
    
    async def researcher_bard(self):
        return await GoogleBard().generate(self.summary_prompt())
    
    async def get_gpt_response(self, pqueries, context):
        messages = [
            {"role": "system", "content": self.auto_questions()},
            {"role": "user", "content": self.generate_response_prompt(pqueries, context)}
        ]
        try:
            response = await create_chat_completion(
                model=self.cfg.smart_llm_model,
                messages=messages,
                temperature=0.7,
                llm_provider=self.cfg.llm_provider,
                stream=True,
                max_tokens=self.cfg.smart_token_limit,
                llm_kwargs=self.cfg.llm_kwargs
            )
            response_data = json.loads(response)
            return response_data["QuestionTask"]
        except json.JSONDecodeError as e:
            print(f"JSON decoding error: {e} - Response received: '{response}'")
            return {}
        except Exception as e:
            print(f"Error during GPT communication: {e}")
            return {}
        
    async def get_suggestions(self):
        try:
            messages = [
                {"role": "system", "content": "Provide Deep Research."},
                {"role": "user", "content": self.summary_prompt()}
            ]
            response = await create_chat_completion(
                model=self.cfg.smart_llm_model,
                messages=messages,
                temperature=0.7,
                llm_provider=self.cfg.llm_provider,
                stream=True,
                max_tokens=self.cfg.smart_token_limit,
                llm_kwargs=self.cfg.llm_kwargs
            )
            response_data = json.loads(response)
            
            return response_data
        except Exception as e:
            print(f"Error in get_suggestions: {e}")
            return

    def generate_response_prompt(self, query, context):
        context_str = "\n".join(context)
        prompt = f"Query: {query}\n\nContext:\n{context_str}\n\n. You are a Expert - {self.agent[0]}, Provide a detailed response including tasks, objectives, task updates, task types, milestones, and estimates."
        return prompt

    def summary_prompt(self):
        return f"You are a Expert - {self.agent[0]}. Detailed Research based on the User Conversation - {previous_queries} and {self.query}"
    
    def auto_questions(self):
        return """
            Your task is to generate questions based on user query to get more details from User
            examples:
            task: "should I invest in apple stocks?"
            response: 
            {
                "QuestionTask":[ {
                    "question": "Why do you want to invest in Apple?",
                    "answer": "string",
                    "QuestionType": "input based",
                    "relatedData": {
                    "input_text": "Please provide your reason for wanting to invest in Apple.",
                    "validation": "required"
                    }, {
                    "question": "How much are you planning to invest in Apple?",
                    "answer": "number",
                    "QuestionType": "input based",
                    "relatedData": {
                    "input_text": "Please enter the amount you are planning to invest in Apple.",
                    "validation": "required|min:1"
                    },{
                    "question": "What is your investment horizon?",
                    "answer": "string",
                    "QuestionType": "option based",
                    "relatedData": {
                    "options": ["Short-term (less than 1 year)", "Medium-term (1-5 years)", "Long-term (more than 5 years)"],
                    "other": "Please select one of the options that best describes your investment horizon."
                    },{
                    "question": "What is your risk tolerance?",
                    "answer": "string",
                    "QuestionType": "option based",
                    "relatedData": {
                    "options": ["Low", "Moderate", "High"],
                    "other": "Please select your risk tolerance level."
                    }
                ]
            }
        """

    async def stream_output(self, type, output, websocket=None, logging=True):
        if logging:
            print(output)
        if websocket:
            await websocket.send_json({"type": type, "output": output})