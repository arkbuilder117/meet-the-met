import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { MetApiModule } from '../met-api/met-api.module';
import { CacheModule } from '@nestjs/cache-manager';
import { DepartmentsController } from './departments.controller';

@Module({
    imports: [CacheModule.register(), MetApiModule],
    providers: [DepartmentsService],
    controllers: [DepartmentsController],
})
export class DepartmentsModule {}
