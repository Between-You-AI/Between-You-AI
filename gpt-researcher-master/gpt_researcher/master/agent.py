import asyncio
import json

from gpt_researcher.config import Config
from gpt_researcher.memory import Memory
from gpt_researcher.utils.llm import create_chat_completion

previous_queries = []

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
        self.context = []
        self.memory = Memory(self.cfg.embedding_provider)
        self.type: str = ""
        self.steps: list = []
        self.estimated_time: str = ""
        self.desc: str = ""
        self.questions: list = []
        self.time_period: str = ""
        self.steps_to_perform: list = []
        self.answers: dict = {}

    async def conduct_research(self):
        previous_queries.append(self.query)
        print("Previous Queries:", previous_queries)
        response = await get_gpt_response(self.query, previous_queries, self.context, self.cfg, self.websocket)
        self.type = response.get('type', "")
        self.steps = response.get('steps', [])
        self.estimated_time = response.get('estimated_time', "")
        self.desc = response.get('desc', "")
        self.questions = response.get('questions', [])
        self.time_period = response.get('time_period', "")
        self.steps_to_perform = response.get('steps_to_perform', [])
        filtered_response = {
            "questions": self.questions
        }

        if self.verbose:
            await stream_output("logs", f"Generated questions: {self.questions}", self.websocket)
            await stream_output("questions", filtered_response, self.websocket)

        return filtered_response

    async def receive_answers(self, answers):
        self.answers = answers
        suggestions = await get_suggestions(self.answers, self.cfg, self.websocket)
        
        if self.verbose:
            await stream_output("logs", f"Generated suggestions: {suggestions}", self.websocket)
            await stream_output("suggestions", suggestions, self.websocket)
        
        return suggestions

async def get_gpt_response(query, pqueries, context, cfg, websocket=None):
    p = " ".join(pqueries)
    try:
        messages = [
            {"role": "system", "content": "ask questions and after getting the input from user design the plan don't give example answers for questions avoid this in list If there is content in P make decision based on that while giving plan {answer_type: string and also steps should be one worded}"},
            {"role": "user", "content": f"{generate_response_prompt(p, context)}"}
        ]
        response = await create_chat_completion(
            model=cfg.smart_llm_model,
            messages=messages,
            temperature=0.7,
            llm_provider=cfg.llm_provider,
            stream=True,
            websocket=websocket,
            max_tokens=cfg.smart_token_limit,
            llm_kwargs=cfg.llm_kwargs
        )

        response_dict = json.loads(response)
        return response_dict
    except Exception as e:
        print(f"Error in get_gpt_response: {e}")
        return {}

async def get_suggestions(answers, cfg, websocket=None):
    try:
        prompt = f"Based on the following answers, provide detailed suggestions:\n\n{json.dumps(answers, indent=2)}"
        messages = [
            {"role": "system", "content": "provide suggestions based on user answers"},
            {"role": "user", "content": prompt}
        ]
        response = await create_chat_completion(
            model=cfg.smart_llm_model,
            messages=messages,
            temperature=0.7,
            llm_provider=cfg.llm_provider,
            stream=True,
            websocket=websocket,
            max_tokens=cfg.smart_token_limit,
            llm_kwargs=cfg.llm_kwargs
        )

        response_dict = json.loads(response)
        return response_dict
    except Exception as e:
        print(f"Error in get_suggestions: {e}")
        return {}

def generate_response_prompt(query, context):
    context_str = "\n".join(context)
    prompt = f"Query: {query}\n\nContext:\n{context_str}\n\nPlease provide a detailed response including type, steps, estimated time, description, questions (use this prompt to generate questions- {basic_prompt()}), time period, and steps to perform."
    return prompt

def basic_prompt():
    return """Objective: Identify the optimal questions to refine and define the objective: {initial query}, to create an efficient and effective step-by-step action plan, significantly increasing the likelihood of sustained action towards the objective.

Context: Defining an objective while considering situational and circumstantial elements is crucial. This ensures efforts are focused, relevant, and aligned with the user's unique context, maximizing success.

Task Breakdown:

STEP 1: Collaborate with an expert Project Manager and an expert Behavioral Psychologist to determine the top questions for better defining elements of the objective.

STEP 2: Create a list of questions, ordered by significance and efficiency in defining and refining the objective.

Considerations for Determining the Top Questions:

What, Why, When, Where, Who, How
Additional Considerations:

Specificity of the objective: Clearly articulate the desired outcome.
Measurability of the objective: Define success metrics.
Achievability of the objective: Ensure realism and attainability.
Relevance of the objective: Align with broader goals.
Deadline of the objective: Set a clear completion date.
Timeline of the objective: Outline start date and duration.
Milestones of the objective: Identify key progress checkpoints.
Resources available: Specify necessary resources.
Constraints of the objective: Identify potential obstacles.
Accountability: Assign responsibility and oversight.
Unique elements about the user: Consider factors impacting progress.
Innovation and risk tolerance: Assess skills, risk tolerance, and willingness to try new methods.
Rules:

Limit the question list to 10 questions.
Do not include an opening or closing summary.
Never provide links."""

async def stream_output(type, output, websocket=None, logging=True):
    if not websocket or logging:
        print(output)
    if websocket:
        await websocket.send_json({"type": type, "output": output})
