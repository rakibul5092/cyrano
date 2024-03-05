import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { HttpUtilService } from '../../services/http-utils.service';
import { BaseModel } from './base.model';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T extends BaseModel> {
  private loading$: Subject<boolean> = new Subject();
  constructor(@Inject('url') private url: string, protected httpUtilService: HttpUtilService) {}

  /**
   * loading observable
   */
  public get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  /**
   * set loading
   */
  public setLoading(loading: boolean = true): void {
    return this.loading$.next(loading);
  }

  public updateLocalEntity(entity: T): void {}

  /**
   * update entity
   *
   * @param entity
   * @param loading
   */
  public update(entity: T, loading: boolean = true): Observable<T> {
    this.loading$.next(loading);
    if (!entity._id) {
      return this.save(entity);
    }
    return this.httpUtilService.putResource(this.url + entity._id, entity).pipe(
      finalize(() => {
        this.loading$.next(false);
      }),
      tap((data) => {
        this.updateLocalEntity(data);
      }),
    );
  }

  /**
   * update entity
   *
   * @param entity
   */
  public save(entity: T): Observable<T> {
    this.loading$.next(true);
    return this.httpUtilService.postRequest(this.url, entity).pipe(
      finalize(() => {
        this.loading$.next(false);
      }),
    );
  }

  /**
   * delete entity
   *
   * @param entity
   */
  public delete(entity: T): Observable<T> {
    this.loading$.next(true);
    return this.httpUtilService.deleteResource(this.url + entity._id).pipe(
      finalize(() => {
        this.loading$.next(false);
      }),
    );
  }
}
