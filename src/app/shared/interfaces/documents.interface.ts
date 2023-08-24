import { FileType } from '@core/enums/file-type.enum';

export interface DocumentForm {
  type: FileType;
  file: File[];
  multiple: boolean;
}

export interface RemoveFileEvt {
  files: File[];
  multiple: boolean;
}
