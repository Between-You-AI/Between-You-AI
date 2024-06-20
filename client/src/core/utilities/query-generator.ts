import { IdNumberString } from '../types';
import * as _ from 'lodash';
export interface ServerRequestQueryParams {
  filterOptions?: QueryOptionType;
  sortOptions: PaginationQueryOptions;
}

export interface PaginationQueryOptions {
  limit: number;
  page: number;
  total?: number;
}

export interface QueryOptionType {
  [key: string]: IdNumberString;
}

const checkAndGenerateString = (
  existingQuery: string,
  additionInQuery: string
): string =>
  existingQuery.length > 1
    ? `${existingQuery}&${additionInQuery}`
    : `${existingQuery}${additionInQuery}`;

const updateQuery = (
  query: string,
  option: string,
  value: IdNumberString,
  parent?: string
): string => {
  if (option) {
    if (parent) {
      return checkAndGenerateString(query, `${parent}[${option}]=${value}`);
    }
    return checkAndGenerateString(query, `${option}=${value}`);
  }
  return query;
};

const checkAndFormatQueryOptions = (
  option: QueryOptionType,
  key: string,
  query: string
): string => {
  if (option) {
    return _.reduce(
      _.keys(option),
      (resultantQuery: string, currentOption) => {
        return updateQuery(
          resultantQuery,
          currentOption,
          option[currentOption],
          key
        );
      },
      query
    );
  }
  return query;
};

export const structureQueryWithFixedSortOptions = (
  options?: ServerRequestQueryParams
): string => {
  if (options) {
    return _.reduce(
      _.keys(options),
      (resultantQuery: string, current) => {
        return checkAndFormatQueryOptions(
          options[current as unknown as keyof typeof Option],
          current,
          resultantQuery
        );
      },
      '?'
    );
  }
  return '';
};
