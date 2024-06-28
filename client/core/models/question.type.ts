interface QuestionTask<T> {
  question: string;
  Answer: Answer<T>;
}

interface Answer<T> {
  AnswerTypeCode: typeof AnswerTypes;
  prefix?: AnswerPrefixOrSuffix<T>;
  suffix?: AnswerPrefixOrSuffix<T>;
  options?: Array<T>;
  validation?: string;
}

interface AnswerPrefixOrSuffix<T> {
  defaultValue: T;
  options: Array<T>;
}

const AnswerTypes = {
  INT: {},
  FLOAT: {},
  TEXT: {},
  STRING: {},
  BOOLEAN: {},
  SINGLE_CHOICE: {},
  MULTI_CHOCIE: {},
};
