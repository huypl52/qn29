import { EProcessStatus } from './ocr';
import { ETaskType, ITaskHistory, ITaskHistoryDetail } from './task';
import { DLang } from './vocab';
import _ from 'lodash';

export interface ISearchParam {
  from_date?: string;
  to_date?: string;
  file_name?: string;
  ocr_text?: string;
  source_text?: string;
  dest_text?: string;
}

export interface ISearchResult {
  taskid: string;
  created_time: string;
  type: ETaskType;
  type_name: string;
  ocrid?: string;
  detected_text?: string;
  file_name?: string;
  translateid?: string;
  source_text?: string;
  dest_text?: string;
}

export function convertSearchResultsToTaskHistories(
  searchResults: ISearchResult[]
): ITaskHistory[] {
  // Group search results by taskid
  const groupedResults = _.groupBy(searchResults, 'taskid');

  // Map each group of search results to a single ITaskHistory
  const taskHistories: ITaskHistory[] = Object.entries(groupedResults).map(
    ([taskid, results]) => {
      // Take the created_time and type from the first item in each group
      const { created_time, type, type_name } = results[0];

      // Map each ISearchResult in the group to an ITaskHistoryDetail
      const details: ITaskHistoryDetail[] = results.map((result) => ({
        status: EProcessStatus.success, // Example status, set to your logic
        detected_language: null, // Example language, set as per your needs
        detected_text: result.detected_text || '',
        fileid: '',
        file_name: result.file_name || '',
        dest_language: DLang.vi, // Example destination language, set as per logic
        dest_text: result.dest_text || '',
      }));

      // Create the ITaskHistory object for this group
      return {
        id: taskid,
        created_time,
        type,
        type_name,
        details,
      };
    }
  );

  return taskHistories;
}
