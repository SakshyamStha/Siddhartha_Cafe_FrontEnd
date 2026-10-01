import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const unwrapInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    map(event => {
      if (
        event instanceof HttpResponse &&
        req.url.includes('cms.siddharthacafe.com') &&
        event.body &&
        typeof event.body === 'object' &&
        'status' in (event.body as any) &&
        'data' in (event.body as any)
      ) {
        return event.clone({ body: (event.body as any).data });
      }
      return event;
    })
  );
