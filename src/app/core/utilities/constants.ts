/**
 * The COA_TEXT constant contains the title and description for the Chart of Accounts upload step.
 */
export const COA_TEXT = {
  title: 'Upload Chart of Accounts',
  description:
    'Organize your financial structure by importing the Chart of Accounts. This will help establish the categories    and classifications for your financial transactions.'
};

/**
 * The GL_TEXT constant contains the title and description for the General Ledger import step.
 */
export const GL_TEXT = {
  title: 'Import General Ledger',
  description:
    'Capture your financial transactions accurately by uploading the General Ledger. This will provide a comprehensive record of all monetary activities within your organization.'
};

/**
 * The TB_TEXT constant contains the title and description for the Trial Balance submission step.
 */
export const TB_TEXT = {
  title: 'Submit Trial Balance',
  description:
    'Validate the accuracy of your financial data by submitting the Trial Balance. This step ensures that your debits and credits are balanced and in line with your financial records.'
};

/**
 * The BUDGET_TEXT constant contains the title and description for the Budget upload step.
 */
export const BUDGET_TEXT = {
  title: 'Upload Budget',
  description:
    'Plan and track your financial goals by importing the Budget. This will enable you to monitor your financial performance and make informed decisions.'
};

/**
 * The SUCCESS_TEXT constant contains the title and description for the successful completion of the onboarding process.
 */
export const SUCCESS_TEXT = {
  title: 'Ready to start!',
  description: `You've successfully completed the onboarding process and uploaded all the necessary files. Let's begin your
  journey!`
};

/**
 * The RESTRICTED_TYPES constant contains a list of file types that are restricted for upload.
 */
export const ALLOWED_FILETYPES = [
  'application/vnd.ms-excel',
  'application/csv',
  'text/csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/pdf'
];

/**
 * The RESTRICTED_TYPES constant contains a list of file types that are restricted for upload.
 */
export const RESTRICTED_TYPES = [
  'application/x-dosexec', // .exe, .dll, .com
  'application/javascript', // .js
  'text/vbscript', // .vbs
  'application/x-msdos-program', //  .bat, .cmd
  'text/plain', // .sh, .csh, .bash, .reg
  'application/x-object', // .o, .so (compilados de C)
  'application/vnd.ms-excel.sheet.macroenabled.12', //  .xlsm
  'application/vnd.ms-word.document.macroenabled.12', //  .docm
  'application/vnd.ms-powerpoint.template.macroenabled.12', //  .pptm
  'application/java-archive', //  .jar
  'text/x-java-source', //  .java
  'application/x-shockwave-flash', //  .swf
  'application/x-msdownload' //  .msi
];
