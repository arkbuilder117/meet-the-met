import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { MetApiService } from '../met-api/met-api.service';
import { Department } from '../met-api/interfaces';

@Injectable()
export class DepartmentsService {
    private static ONE_HOUR = 3600000;

    constructor(
        private readonly metApiService: MetApiService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    public async getDepartments(): Promise<Department[]> {
        const cacheKey = 'MET_DEPARTMENTS';

        const cacehValue = await this.cacheManager.get<Department[]>(cacheKey);

        if (cacehValue) {
            return cacehValue;
        }

        const { departments } = await this.metApiService.getDepartments();

        await this.cacheManager.set(
            cacheKey,
            departments,
            DepartmentsService.ONE_HOUR,
        );

        return departments;
    }
}
