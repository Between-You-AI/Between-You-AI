import asyncio
import time
import json

from common.gpt_researcher.config import Config
from common.gpt_researcher.context.compression import ContextCompressor
from common.gpt_researcher.document import DocumentLoader
from common.gpt_researcher.master.actions import *
from common.gpt_researcher.memory import Memory
from common.gpt_researcher.utils.enum import ReportSource, ReportType
from common.gpt_researcher.master.actions import choose_agent
from models.py_types.expert_type import Expert

agent = ""
description = ""
class ExpertService:
    """
    Expert Service
    """

    def __init__(
        self,
        query: str,
        agent=None,
        role=None,
        parent_query: str = "",
        subtopics: list = [],
        visited_urls: set = set(),
        verbose: bool = True,
        config_path = None,
        context=[]
    ):
        """
        Initialize the GPT Researcher class.
        Args:
            query: str,
            source_urls
            config_path
            websocket
            agent
            role
            parent_query: str
            subtopics: list
            visited_urls: set
        """
        self.query: str = query
        self.agent: str = agent
        self.description: str = None
        self.role: str = role
        self.cfg = Config(config_path)
        self.context = context
        self.visited_urls: set[str] = visited_urls
        self.verbose: bool = verbose

        # Only relevant for DETAILED REPORTS
        # --------------------------------------

        # Stores the main query of the detailed report
        self.parent_query = parent_query

        # Stores all the user provided subtopics
        self.subtopics = subtopics
        
    async def find_expert(self):
        result = await choose_agent(query=self.query, cfg=self.cfg)
        print(result)
        self.agent = result[0]
        self.description = result[1]
        agent = self.agent
        description = self.description 
        return Expert(agent=self.agent,description=self.description)
    
    def get_expert():
        return Expert(agent=agent,description=description)