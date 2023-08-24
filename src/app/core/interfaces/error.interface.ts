/**
 * The ApiError interface represents an error returned by an API.
 */
export interface ApiError {
  /**
   * The status code of the error.
   */
  statusCode: number;
  /**
   * The message of the error.
   */
  message: string;
}
