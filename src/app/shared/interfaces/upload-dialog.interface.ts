/**
 * @ignore
 */
export interface UploadDialogData {
  title: string;
  caption: string;
  // TODO update type based on document type interface
  documentType: any;
}

/**
 * @ignore
 */
export interface UploadedDocumentObject {
  accountingMethod: any;
  documentType: any;
  file: File;
}
