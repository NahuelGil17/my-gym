import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

/**
 * A guard that checks if the required query parameters are present before allowing access to a route.
 * @param route The route to check.
 * @returns A boolean indicating whether the required query parameters are present or not.
 */
export const checkRequiredParamsGuard: CanMatchFn = (route) => {
  const router = inject(Router);

  const routeInfo = route.data;
  const routeParams = router.getCurrentNavigation()?.initialUrl.queryParamMap;
  const requiredParams = routeInfo ? routeInfo['params'] : null;

  const hasRequiredParams =
    !!requiredParams && requiredParams.every((params: string) => routeParams && routeParams.has(params));

  if (!hasRequiredParams) {
    const redirectTo = routeInfo ? routeInfo['redirectTo'] : null;
    router.navigate(redirectTo);
  }

  return hasRequiredParams;
};
