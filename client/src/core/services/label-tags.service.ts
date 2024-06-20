import { clientAxiosInstance } from '../config';
import { LabelTagsModel } from '../models';
import {
  ServerRequestQueryParams,
  structureQueryWithFixedSortOptions,
} from '../utilities';
import {
  CreateLabelTagSchemaDto,
  UpdateTableConfigurationsSchemaDto,
} from '../validations';

export const getAllLabelTags = async (
  queryOptions: ServerRequestQueryParams
): Promise<LabelTagsModel[]> => {
  const query = structureQueryWithFixedSortOptions(queryOptions);
  const { data } = await clientAxiosInstance.get(`/tags${query}`);
  return data;
};

export const editLabelTag = async (
  editTag: UpdateTableConfigurationsSchemaDto
): Promise<LabelTagsModel> => {
  const { data } = await clientAxiosInstance.patch(`/tags/update`, editTag);
  return data;
};

export const deleteLabelTag = async (tagId: number): Promise<number> => {
  const { data } = await clientAxiosInstance.delete(`/tags/${tagId}`);
  return data;
};

export const createLabelTag = async (
  labelTagSchemaDto: CreateLabelTagSchemaDto
): Promise<any> => {
  const { data } = await clientAxiosInstance.post('/tags', labelTagSchemaDto);
  return data;
};

export const exportSheet = async (download: boolean): Promise<ArrayBuffer> => {
  const { data } = await clientAxiosInstance.get(
    `/tags/create-sheet?download=${download}`,
    {
      responseType: 'arraybuffer',
    }
  );
  return data;
};

export const synchronizeTags = async (): Promise<void> => {
  const { data } = await clientAxiosInstance.get('/tags/sync');
  return data;
};

export const getLastSheetExportTime = async (): Promise<
  { key: string; value: string }[]
> => {
  const { data } = await clientAxiosInstance.get(
    `/configuration/last-export-time`
  );
  return data;
};
