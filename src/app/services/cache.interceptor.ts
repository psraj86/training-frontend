import { tap } from 'rxjs/operators';
import { HttpCacheService } from './http-cache.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // pass along non-cacheable request
    if (req.method !== 'GET') {
      console.log(`Invalidating Cache: ${req.method} ${req.url}`);
      this.cacheService.invalidateCache();
      return next.handle(req)
    }

    // attemt to retrieve a cached response
    const cachedResponse = this.cacheService.get(req.url);

    // return cached response
    if (cachedResponse) {
      console.log(`Returning a cached response: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse)
    }

    // send request to server and add response to cache
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(`Adding Item to cache: ${req.url}`);
            this.cacheService.put(req.url, event)
          }
        })
      )

  }
}
