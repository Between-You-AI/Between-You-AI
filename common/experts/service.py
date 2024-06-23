import asyncio
import time
import json

from gpt_researcher.config import Config
from gpt_researcher.context.compression import ContextCompressor
from gpt_researcher.document import DocumentLoader
from gpt_researcher.master.actions import *
from gpt_researcher.memory import Memory
from gpt_researcher.utils.enum import ReportSource, ReportType
from gpt_researcher.master.actions import choose_agent

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
        #print(result)
        return result

    # async def conduct_research(self):
    #     """
    #     Runs the GPT Researcher to conduct research
    #     """
    #     if self.verbose:
    #         await stream_output("logs", f"🔎 Starting the research task for '{self.query}'...", self.websocket)
        
    #     # Generate Agent
    #     if not (self.agent and self.role):
    #         self.agent, self.role = await choose_agent(query=self.query, cfg=self.cfg,
    #                                                    parent_query=self.parent_query, cost_callback=self.add_costs)

    #     if self.verbose:
    #         await stream_output("logs", self.agent, self.websocket)

    #     # If specified, the researcher will use the given urls as the context for the research.
    #     if self.source_urls:
    #         self.context = await self.__get_context_by_urls(self.source_urls)
            
    #     elif self.report_source == ReportSource.Local.value:
    #         document_data = await DocumentLoader(self.cfg.doc_path).load()
    #         self.context = await self.__get_context_by_search(self.query, document_data)
    #     # Default web based research
    #     else:
    #         self.context = await self.__get_context_by_search(self.query)
        
    #     time.sleep(2)
    #     if self.verbose:
    #         await stream_output("logs", f"Finalized research step.\n💸 Total Research Costs: ${self.get_costs()}", self.websocket)

    #     return self.context

    # # async def write_report(self, existing_headers: list = []):
    #     """
    #     Writes the report based on research conducted

    #     Returns:
    #         str: The report
    #     """
    #     report = ""

    #     if self.verbose:
    #         await stream_output("logs", f"✍️ Writing summary for research task: {self.query}...", self.websocket)
            
    #     if self.report_type == "custom_report":
    #         self.role = self.cfg.agent_role if self.cfg.agent_role else self.role
    #         report = await generate_report(
    #             query=self.query,
    #             context=self.context,
    #             agent_role_prompt=self.role,
    #             report_type=self.report_type,
    #             report_source=self.report_source,
    #             websocket=self.websocket,
    #             cfg=self.cfg
    #         )
    #     elif self.report_type == "subtopic_report":
    #         report = await generate_report(
    #             query=self.query,
    #             context=self.context,
    #             agent_role_prompt=self.role,
    #             report_type=self.report_type,
    #             report_source=self.report_source,
    #             websocket=self.websocket,
    #             cfg=self.cfg,
    #             main_topic=self.parent_query,
    #             existing_headers=existing_headers,
    #             cost_callback=self.add_costs
    #         )
    #     else:
    #         report = await generate_report(
    #             query=self.query,
    #             context=self.context,
    #             agent_role_prompt=self.role,
    #             report_type=self.report_type,
    #             report_source=self.report_source,
    #             websocket=self.websocket,
    #             cfg=self.cfg,
    #             cost_callback=self.add_costs
    #         )

    #     return report