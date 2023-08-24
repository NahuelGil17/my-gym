import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorMessages, SnackBarHeaders } from '@core/enums/messages.enum';
import { SnackBarService } from '@core/services/snackbar.service';
import { Observable, catchError, throwError } from 'rxjs';

/**
 * Interceptor to handle HTTP errors.
 * @implements HttpInterceptor
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of the ErrorInterceptor class.
   * @param {SnackBarService} snackBar - The snackbar service to use for the interceptor.
   */
  constructor(private snackBar: SnackBarService) {}

  /**
   * Intercepts the HTTP request and handles errors.
   * @param request - The HTTP request.
   * @param next - The HTTP handler.
   * @returns An observable of the HTTP event.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let message = '';

        if (err.error instanceof ProgressEvent) {
          // Client Side
          switch (err.status) {
            case 0:
              message = ErrorMessages.ConnectionError;
              break;
            case 503:
              message = ErrorMessages.ServiceUnavailable;
              break;
            default:
              message = err.statusText;
              break;
          }
        } else {
          // Server Side
          message = err.error.message ? err.error.message : err.statusText;
        }

        this.snackBar.showError(SnackBarHeaders.Error, message);
        return throwError(() => err);
      })
    );
  }
}
