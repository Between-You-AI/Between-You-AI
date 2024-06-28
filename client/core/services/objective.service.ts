import {APIService} from "core/base/base-api.service";
import {Objective} from "core/models/objective.type";

const API_URI = "objectives";
export const fetchObjectives = async (): Promise<Objective[]> => {
  const response = await APIService.get(`/${API_URI}`);
  return response.data;
};

export const getObjectiveById = async (id: string): Promise<Objective> => {
  const response = await APIService.get(`/${API_URI}/${id}`);
  return response.data;
};
