import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectsModule } from './objects/objects.module';
import { DepartmentsModule } from './departments/departments.module';
import { MetApiModule } from './met-api/met-api.module';

@Module({
    imports: [ObjectsModule, DepartmentsModule, MetApiModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
