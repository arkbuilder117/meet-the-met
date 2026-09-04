import { Module } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { CacheModule } from '@nestjs/cache-manager';
import { MetApiModule } from '../met-api/met-api.module';
import { ObjectsController } from './objects.controller';

@Module({
    imports: [CacheModule.register(), MetApiModule],
    providers: [ObjectsService],
    controllers: [ObjectsController],
})
export class ObjectsModule {}
