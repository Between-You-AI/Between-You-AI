# objective_service.py
from pydantic import BaseModel
from common.gpt_researcher.master.agent import GPTResearcher
from datetime import date
import string
from models.py_types.question_type import QuestionTask,Answer
import typing
import uuid


class QuestionsService:
  @staticmethod
  async def create_Questions_plan(task_query: str):
    res = await GPTResearcher(task_query).conduct_research()
    print(res)
    result=[]
    for que in res:
      ques = QuestionsService.question(que)
      result.append(ques)
    return result
  
  def question(que):
    question: str = que.get("question")
    answer_tye_code:str = que.get("answer_type_code")
    prefix=None
    suffix=None
    options=[]
    if (que.get("options")):
      options=que.get("options")
    validations=que.get("validations")
    answers = Answer(AnswerTypeCode=answer_tye_code,prefix=prefix,suffix=suffix,options=options,validation=validations)
    final = QuestionTask(question=question,Answer=answers)
    print(final)
    return final   