import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { MetAPIObjectResult, MetAPIObjectsResult } from '../met-api/interfaces';
import { MetApiService } from '../met-api/met-api.service';

@Injectable()
export class ObjectsService {
    private static ONE_HOUR = 3600000;

    constructor(
        private readonly metApiService: MetApiService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    public async getTotalObjects(
        departmentId?: number,
        title?: string,
    ): Promise<number> {
        return (await this.getObjectsResult(departmentId, title)).total;
    }

    public async getObjectsPage(
        skip: number,
        take: number,
        departmentId?: number,
        title?: string,
    ): Promise<MetAPIObjectResult[]> {
        const result = this.getObjectsResult(departmentId, title);

            const objectIds = (await result).objectIDs.slice(skip, skip + take);

            const value = objectIds.map(async (objectId) => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                return this.metApiService.getObject(objectId);
            });

            return await Promise.all(value);
    }

    public async getObject(objectId: number): Promise<MetAPIObjectResult| undefined> {
        try {
            return await this.metApiService.getObject(objectId);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    // Caching value to make subsequent searchs for next pages quicker
    private async getObjectsResult(
        departmentId?: number,
        title?: string,
    ): Promise<MetAPIObjectsResult> {
        let cacheKey: string =
            'MET_OBJECTS_' + (departmentId?.toString() ?? 'ALL');

        // Todo: In real life `title` would need to be validated/encoded to prevent an injection attack
        if (title) {
            cacheKey += `SEARCH_${title}`;
        }

        const cachedValue =
            await this.cacheManager.get<MetAPIObjectsResult>(cacheKey);
        if (cachedValue) {
            return cachedValue;
        }

        const result = title
            ? this.metApiService.getObjectsBySearch(title, departmentId)
            : this.metApiService.getObjects(departmentId);

        await this.cacheManager.set(cacheKey, result, ObjectsService.ONE_HOUR);

        return result;
    }
}
