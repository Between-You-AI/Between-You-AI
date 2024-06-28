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
        if self.agent == None:
            self.agent = await ExpertService(self.query,self.cfg).find_expert()
        response = await self.get_gpt_response(self.query, self.context)
        print(await self.get_objective())
        await self.get_estimate()
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
            if self.agent==None:
                self.agent = await ExpertService(self.query,self.cfg).find_expert()
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
            #print(questions_list)
            return response_data["QuestionTask"]
        except json.JSONDecodeError as e:
            print(f"JSON decoding error: {e} - Response received: '{response}'")
            return {}
        
    async def get_suggestions(self):
        try:
            if self.agent==None:
                self.agent = await ExpertService(self.query,self.cfg).find_expert()
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
    
    async def get_objective(self):
        try:
            if self.agent==None:
                self.agent = await ExpertService(self.query,self.cfg).find_expert()
            messages = [
                {"role": "system", "content": self.objective_prompt()},
                {"role": "user", "content": self.get_objective_p() }
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
            return response_data["Objective"]
        except json.JSONDecodeError as e:
            print(f"JSON decoding error: {e} - Response received: '{response}'")
            return {}
        
    async def get_estimate(self):
        try:
            if self.agent==None:
                self.agent = await ExpertService(self.query,self.cfg).find_expert()
            messages = [
                {"role": "system", "content": self.estimates_prompt()},
                {"role": "user", "content": self.get_estimate_p()}
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
            return response_data["estimates"]
        except json.JSONDecodeError as e:
            print(f"JSON decoding error: {e} - Response received: '{response}'")
            return {}
    
    async def get_objectives(self):
        try:
            if self.agent==None:
                self.agent = await ExpertService(self.query,self.cfg).find_expert()
            messages = [
                {"role": "system", "content": self.objectives_prompt()},
                {"role": "user", "content": self.objectives_p()}
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
            return response_data["Objectives"]
        except json.JSONDecodeError as e:
            print(f"JSON decoding error: {e} - Response received: '{response}'")
            return {}
        
    async def get_phases(self):
        try:
            if self.agent==None:
                self.agent = await ExpertService(self.query,self.cfg).find_expert()
            messages = [
                {"role": "system", "content": self.phases_prompt()},
                {"role": "user", "content": self.phases_p()}
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
            return response_data["Phases"]
        except Exception as e:
            print(f"Error in get_suggestions: {e}")
            return

    def phases_p(self):
        prompt = f"Query : {self.query}\n\n.You are a Expert - {self.agent[0]}.Generate the Phases based on the User Query."
        return prompt
        
    def phases_prompt(self):
        return """
        Your Task is to generate the Phases of the Task based on the User Query. And after getting the answers you can refine it as well.
        examples:
        task : "should I invest in apple stocks?"
        {   
            "Phases" : [{
                name: Name of the phase1;
                description: Provide some Description for the phase1;
            },{
                name: Name of the phase2;
                description: Provide some Description for the phase2;
            },   
        }
        task : "should I invest in apple stocks?"
        {   
            "Phases" : [{
                name: Name of the phase1;
                description: Provide some Description for the phase1;
            },{
            name: Name of the phase2;
                description: Provide some Description for the phase2;
            },   
        }
        """


    def generate_response_prompt(self, query, context):
        context_str = "\n".join(context)
        prompt = f"Query: {query}\n\nContext:\n{context_str}\n\n. You are a Expert - {self.agent[0]}, Provide a detailed response including tasks, objectives, task updates, task types, milestones, and estimates."
        return prompt
    
    def get_objective_p(self):
        prompt = f"Query : {self.query}\n\n.You are a Expert - {self.agent[0]}.Generate the Objective based on the User Query. And after getting the answers you can refine it as well. In the output the clarity is based on user query and answers rate the clarity out of 100."
        return prompt
        
    
    def objectives_p(self):
        prompt = f"Query : {self.query}\n\n.You are a Expert - {self.agent[0]}.Generate the Objective based on the User Query. ( Don't Assume Anything. Generate Only based on User Query and Answers)"
        return prompt
        
    
    def get_estimate_p(self):
        prompt = f"Query : {self.query}\n\n.You are a Expert - {self.agent[0]}. Generate the Estimates based on the User Querys."
        return prompt
    
    
    def summary_prompt(self):
        return f"You are a Expert - {self.agent[0]}. Detailed Research based on the User Conversation - {self.query}"
    
    def auto_questions(self):
        return """
            Your task is to generate questions based on user query to get more details from User
            examples:
            task: "should I invest in apple stocks?"
            response: 
            {
                "QuestionTask": [
                    {
                        "question": "Why do you want to invest in Apple?",
                        "answer": "string",
                        "answer_type_code": "TEXT" # List of types[ INT, FLOAT, TEXT, STRING, BOOLEAN, SINGLE_CHOICE, MULTI_CHOCIE ]
                        "prefix": Answer Prefix if there is anything defaultValue or options list,
                        "suffix": Answer Suffix if there is anything defaultValue or options list,
                        "options": [],
                        "input_text": "Please enter the amount you are planning to invest in Apple.",
                        "validation": "required|min:1"
                    },
                    {
                        "question": "How much are you planning to invest in Apple?",
                        "answer": "number",
                        "answer_type_code": "INT" # List of types[ INT, FLOAT, TEXT, STRING, BOOLEAN, SINGLE_CHOICE, MULTI_CHOCIE ]
                        "prefix": Answer Prefix if there is anything defaultValue or options list,
                        "suffix": Answer Suffix if there is anything defaultValue or options list,
                        "options": [],
                        "input_text": "Please enter the amount you are planning to invest in Apple.",
                        "validation": "required|min:1"
                    },
                    {
                        "question": "What is your investment horizon?",
                        "answer": "string",
                        "answer_type_code": "MULTI_CHOICE" # List of types[ INT, FLOAT, TEXT, STRING, BOOLEAN, SINGLE_CHOICE, MULTI_CHOCIE ]
                        "prefix": Answer Prefix if there is anything defaultValue or options list,
                        "suffix": Answer Suffix if there is anything defaultValue or options list,
                        "options": ["Short-term (less than 1 year)", "Medium-term (1-5 years)", "Long-term (more than 5 years)"],
                        "other": "Please select one of the options that best describes your investment horizon."
                    },
                    {
                        "question": "What is your risk tolerance?",
                        "answer": "string",
                        "answer_type_code": "MULTI_CHOICE" # List of types[ INT, FLOAT, TEXT, STRING, BOOLEAN, SINGLE_CHOICE, MULTI_CHOCIE ]
                        "prefix": Answer Prefix if there is anything defaultValue or options list,
                        "suffix": Answer Suffix if there is anything defaultValue or options list,
                        "options": ["Low", "Moderate", "High"],
                        "other": "Please select your risk tolerance level."
                    }
                ]
            }
                        
            task: "should I buy a house in San Francisco?"
            response: 
            {
                "QuestionTask": [
                    {
                        "question": "Why do you want to buy a house in San Francisco?",
                        "answer": "string",
                        "answer_type_code": "input based",
                        "input_text": "Please provide your reason for wanting to buy a house in San Francisco.",
                        "validation": "required"
                    },
                    {
                        "question": "What is your budget for buying a house?",
                        "answer": "number",
                        "answer_type_code": "input based",
                        "input_text": "Please enter your budget for buying a house in San Francisco.",
                        "validation": "required|min:1"
                    },
                    {
                        "question": "What type of property are you looking for?",
                        "answer": "string",
                        "answer_type_code": "option based",
                        "prefix": Answer Prefix if there is anything defaultValue or options list,
                        "suffix": Answer Suffix if there is anything defaultValue or options list,
                        "options": ["Condo", "Single Family Home", "Townhouse", "Multi-Family Home"],
                        "other": "Please select the type of property you are interested in."
                    },
                    {
                        "question": "What is your timeline for purchasing?",
                        "answer": "string",
                        "answer_type_code": "option based",
                        "prefix": Answer Prefix if there is anything defaultValue or options list,
                        "suffix": Answer Suffix if there is anything defaultValue or options list,
                        "options": ["Immediately", "Within 6 months", "Within 1 year", "More than 1 year"],
                        "other": "Please select your purchasing timeline."
                    }
                    {
                        
                        "question": "What is your timeline for purchasing?",
                        "answer": "BOOLEAN",
                        "answer_type_code": "option based",
                        "prefix": Answer Prefix if there is anything defaultValue or options list,
                        "suffix": Answer Suffix if there is anything defaultValue or options list,
                        "options": ["True","False"],
                        "other": "Please select your purchasing timeline."
                    }
                ]
            }
        """
    
    def objective_prompt(self):
        return """
        Your Task is to generate the Objective based on the User Query. And after getting the answers you can refine it as well.
        In the output the clarity is based on user query and answers rate the clarity out of 100.
        examples:
        task : "should I invest in apple stocks?"
        {   
            "Objective" : {
                "title": "buying apple stocks",
                "description": "To buy Apple stocks, choose a brokerage, create and fund your account, search for 'AAPL', and place a market or limit order for the desired number of shares",
                "clarity": 20
            }   
        }
        task : "Buy a House"
        {
           "Objective" : {
                "title": "Purchasing a House",
                "description": "Description on how to buy House", 
                "clarity": 1
            }   
        }
        """
        
    def estimates_prompt(self):
        return """
        Your Task is to generate the Estimate based on the User Query. And after getting the answers you can update it as well not give multiple estimates dont assume.
        Budget will be given by user so use it.
        examples:
        task : "should I invest 2000 in apple stocks?"
        response from you:
        {
            "estimates" : {
                "days" : 1,
                "budget" : 2000  
            }   
        }
        task : "Buy a House with 200000"
        response from you:
        {
            "estimates" : {
                "days" : 200,
                "budget" : 200000
                
            }   
        }
        """
    
    def objectives_prompt(self):
        return """
        Your task is to generate objectives based on user query to get more details from User.
        task: "Increase Market Share"
        response:
        {
            "Objectives": {
                "title": "Increase Market Share",
                "description": "The primary goal is to increase market share by 20% in the next fiscal year.",
                "collaborators": [2, 3]
            },
            "phases": [
                {
                    "name": "Market Research",
                    "description": "Conduct thorough market research to identify opportunities.",
                    "phase_before": None,
                    "phase_after": None,
                    "duration": 30
                }
            ],
            "steps": [
                {
                    "name": "Initial Research",
                    "description": "Conduct initial market research and gather relevant data.",
                    "assigned_to": 2,
                    "assigned_by": 1,
                    "duration": 7,
                    "order": 1
                }
            ],
            "tasks": [
                {
                    "id": 1,
                    "name": "Research Market Trends",
                    "description": "Research and analyze the latest market trends for better investment strategies.",
                    "duration": 5,
                    "budget": 100.0,
                    "order": 1
                }
            ],
            "activities": [
                {
                    "name": "Compile Market Report",
                    "description": "Compile a detailed market report based on the research conducted.",
                    "assigned_to": 2,
                    "activity_type": "InApp Task",
                    "cost": 50.0,
                    "duration": 3,
                    "assigned_by": 1,
                    "order": 1
                }
            ]
        }

        task: "Improve Customer Satisfaction"
        response:
        {
            "Objectives": {
                "title": "Improve Customer Satisfaction",
                "description": "The primary goal is to improve customer satisfaction by 15% over the next six months.",
                "collaborators": [4, 5]
            },
            "phases": [
                {
                    "name": "Customer Feedback",
                    "description": "Collect and analyze customer feedback to identify pain points.",
                    "phase_before": None,
                    "phase_after": None,
                    "duration": 20
                }
            ],
            "steps": [
                {
                    "name": "Survey Design",
                    "description": "Design surveys to gather customer feedback.",
                    "assigned_to": 4,
                    "assigned_by": 1,
                    "duration": 5,
                    "order": 1
                }
            ],
            "tasks": [
                {
                    "id": 2,
                    "name": "Create Survey Questions",
                    "description": "Create relevant survey questions to understand customer needs.",
                    "duration": 3,
                    "budget": 200.0,
                    "order": 1
                }
            ],
            "activities": [
                {
                    "name": "Analyze Survey Results",
                    "description": "Analyze the results of the customer survey.",
                    "assigned_to": 5,
                    "activity_type": "InApp Task",
                    "cost": 100.0,
                    "duration": 4,
                    "assigned_by": 4,
                    "order": 1
                }
            ]
        }

        task: "Launch New Product Line"
        response:
        {
            "Objectives": {
                "title": "Launch New Product Line",
                "description": "The primary goal is to launch a new product line by Q4 2024.",
                "collaborators": [6, 7]
            },
            "phases": [
                {
                    "name": "Product Development",
                    "description": "Develop new products and prepare for launch.",
                    "phase_before": None,
                    "phase_after": None,
                    "duration": 45
                }
            ],
            "steps": [
                {
                    "name": "Concept Development",
                    "description": "Develop concepts for the new product line.",
                    "assigned_to": 6,
                    "assigned_by": 1,
                    "duration": 10,
                    "order": 1
                }
            ],
            "tasks": [
                {
                    "id": 3,
                    "name": "Prototype Creation",
                    "description": "Create prototypes for the new products.",
                    "duration": 15,
                    "budget": 500.0,
                    "order": 1
                }
            ],
            "activities": [
                {
                    "name": "Market Testing",
                    "description": "Conduct market testing for the new product prototypes.",
                    "assigned_to": 7,
                    "activity_type": "InApp Task",
                    "cost": 300.0,
                    "duration": 20,
                    "assigned_by": 6,
                    "order": 1
                }
            ]
        }
        """


    async def stream_output(self, type, output, websocket=None, logging=True):
        if logging:
            print(output)
        if websocket:
            await websocket.send_json({"type": type, "output": output})
