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
        

    async def conduct_research(self):
        previous_queries.append(self.query)
        print(previous_queries)
        response = await get_gpt_response(self.query, previous_queries, self.context, self.cfg, self.websocket)
        self.type = response.get('type', "")
        self.steps = response.get('steps', [])
        self.estimated_time = response.get('estimated_time', "")
        self.desc = response.get('desc', "")
        self.questions = response.get('questions', [])
        self.time_period = response.get('time_period', "")
        self.steps_to_perform = response.get('steps_to_perform', [])

        if self.verbose:
            await stream_output("logs", f"Generated response:\nType: {self.type}\nSteps: {self.steps}\nEstimated Time: {self.estimated_time}\nDescription: {self.desc}\nQuestions: {self.questions}\nTime Period: {self.time_period}\nSteps to Perform: {self.steps_to_perform}", self.websocket)

        return response

async def get_gpt_response(query, pqueires, context, cfg, websocket=None):
    p = " ".join(pqueires)
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

def generate_response_prompt(query, context):
    context_str = "\n".join(context)
    prompt = f"Query: {query}\n\nContext:\n{context_str}\n\nPlease provide a detailed response including type, steps, estimated time, description, questions, time period, and steps to perform."
    return prompt

async def stream_output(type, output, websocket=None, logging=True):
    if not websocket or logging:
        print(output)
    if websocket:
        await websocket.send_json({"type": type, "output": output})
