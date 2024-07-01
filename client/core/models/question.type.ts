export interface QuestionTask<T> {
  question: string
  Answer: Answer<T>
}

export interface Answer<T> {
  AnswerTypeCode: string
  prefix?: AnswerPrefixOrSuffix<T>
  suffix?: AnswerPrefixOrSuffix<T>
  options?: Array<T>
  validation?: string
}

export interface AnswerPrefixOrSuffix<T> {
  defaultValue: T
  options: Array<T>
}

export enum QuestionType {
  INT = 'INT',
  FLOAT = 'FLOAT',
  TEXT = 'TEXT',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTI_CHOICE = 'MULTI_CHOICE'
}

const AnswerTypes = {
  INT: {},
  FLOAT: {},
  TEXT: {},
  STRING: {},
  BOOLEAN: {},
  SINGLE_CHOICE: {},
  MULTI_CHOCIE: {}
}
