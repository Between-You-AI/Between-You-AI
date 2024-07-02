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
            return response_data
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
    
    def get_objective_p(self):
        prompt = f"Query : {self.query}\n\n.You are a Expert - {self.agent[0]}.Generate the Objective based on the User Query. And after getting the answers you can refine it as well. In the output the clarity is based on user query and answers rate the clarity out of 100."
        return prompt

    def generate_response_prompt(self, query, context):
        context_str = "\n".join(context)
        prompt = f"Query: {query}\n\nContext:\n{context_str}\n\n. You are a Expert - {self.agent[0]}, Provide a detailed response including tasks, objectives, task updates, task types, milestones, and estimates."
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
                "description": "complete some matter in description",
                "clarity": 20
            }   
        }
        task : "Buy a House"
        {
           "Objective" : {
                "title": "Purchasing a House",
                "description": "complete some matter in description", 
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
        Your Task is to generate the Objective based on the User Query.
        examples:
        task : "should I invest in apple stocks?"
        {    
            "Main title": "Buy an Apple Stock",
            "description": "A comprehensive guide to purchasing Apple stock.",
            "phases": [
                {
                    "phase_name": "Research Phase",
                    "phase_description": "Gathering necessary information and understanding the market.",
                    "steps": [
                        {
                            "step_name": "Market Analysis",
                            "step_description": "Analyze current market trends and Apple's stock performance.",
                            "tasks": [
                                {
                                    "task_name": "Gather Market Data",
                                    "task_description": "Collect data on market trends and stock performance.",
                                    "activities": [
                                        {
                                            "activity_name": "Read Financial Reports",
                                            "activity_description": "Review Apple's quarterly and annual financial reports.",
                                            "activity_duration": 3,
                                            "activity_cost": 0.0
                                        },
                                        {
                                            "activity_name": "Analyze Market Trends",
                                            "activity_description": "Use financial tools to analyze market trends.",
                                            "activity_duration": 2,
                                            "activity_cost": 0.0
                                        }
                                    ]
                                },
                                {
                                    "task_name": "Evaluate Apple Stock",
                                    "task_description": "Assess the value and performance of Apple stock.",
                                    "activities": [
                                        {
                                            "activity_name": "Check Stock Performance",
                                            "activity_description": "Review historical stock performance.",
                                            "activity_duration": 2,
                                            "activity_cost": 0.0
                                        },
                                        {
                                            "activity_name": "Consult Analysts",
                                            "activity_description": "Read opinions and forecasts from stock market analysts.",
                                            "activity_duration": 1,
                                            "activity_cost": 0.0
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "phase_name": "Purchase Phase",
                    "phase_description": "Executing the purchase of Apple stock.",
                    "steps": [
                        {
                            "step_name": "Select Brokerage",
                            "step_description": "Choose a brokerage platform to purchase the stock.",
                            "tasks": [
                                {
                                    "task_name": "Compare Brokers",
                                    "task_description": "Evaluate different brokerage platforms based on fees and services.",
                                    "activities": [
                                        {
                                            "activity_name": "Read Reviews",
                                            "activity_description": "Review user experiences and ratings for different brokers.",
                                            "activity_duration": 1,
                                            "activity_cost": 0.0
                                        },
                                        {
                                            "activity_name": "Check Fees",
                                            "activity_description": "Compare transaction and account fees.",
                                            "activity_duration": 1,
                                            "activity_cost": 0.0
                                        }
                                    ]
                                },
                                {
                                    "task_name": "Open Account",
                                    "task_description": "Open an account with the selected brokerage.",
                                    "activities": [
                                        {
                                            "activity_name": "Submit Application",
                                            "activity_description": "Fill out and submit the account application form.",
                                            "activity_duration": 1,
                                            "activity_cost": 0.0
                                        },
                                        {
                                            "activity_name": "Verify Identity",
                                            "activity_description": "Provide identification documents for verification.",
                                            "activity_duration": 1,
                                            "activity_cost": 0.0
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "step_name": "Execute Purchase",
                            "step_description": "Buy the desired amount of Apple stock.",
                            "tasks": [
                                {
                                    "task_name": "Fund Account",
                                    "task_description": "Deposit funds into the brokerage account.",
                                    "activities": [
                                        {
                                            "activity_name": "Transfer Funds",
                                            "activity_description": "Transfer money from a bank account to the brokerage account.",
                                            "activity_duration": 1,
                                            "activity_cost": 0.0
                                        }
                                    ]
                                },
                                {
                                    "task_name": "Place Order",
                                    "task_description": "Place a buy order for Apple stock.",
                                    "activities": [
                                        {
                                            "activity_name": "Choose Order Type",
                                            "activity_description": "Select order type (market or limit).",
                                            "activity_duration": 1,
                                            "activity_cost": 0.0
                                        },
                                        {
                                            "activity_name": "Execute Order",
                                            "activity_description": "Confirm and execute the purchase order.",
                                            "activity_duration": 1,
                                            "activity_cost": 0.0
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        """


    async def stream_output(self, type, output, websocket=None, logging=True):
        if logging:
            print(output)
        if websocket:
            await websocket.send_json({"type": type, "output": output})