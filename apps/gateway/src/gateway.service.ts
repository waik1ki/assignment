import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable } from 'rxjs';
import { Request } from 'express';
import { AxiosRequestConfig } from 'axios';
import { CacheService } from './cache/cache.service';

@Injectable()
export class GatewayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {}

  async proxy(
    service: string,
    req: Request,
  ): Promise<Observable<AxiosRequestConfig<any>>> {
    const baseUrl = this.configService.get(`${service}_SERVICE_URL`);

    const headers: Record<string, string> = {};
    headers['x-user-id'] = req['user']?.userId;
    headers['x-user-role'] = req['user']?.role;
    headers['content-type'] = req.headers['content-type'] as string;

    if (req.method === 'POST') {
      const ok = await this.cacheService.checkAndSet(
        req['user']?.userId || req.ip || req.host,
        req.path,
      );
      if (!ok) {
        throw new HttpException('Duplicate request', HttpStatus.CONFLICT);
      }
    }

    return this.httpService
      .request({
        headers,
        method: req.method,
        url: baseUrl + req.path,
        data: req.body,
      })
      .pipe(
        map((resp) => resp.data),
        catchError((err) => {
          throw err.response
            ? new HttpException(
                err.response.data as string | Record<string, any>,
                err.response.status as number,
              )
            : err;
        }),
      );
  }
}
