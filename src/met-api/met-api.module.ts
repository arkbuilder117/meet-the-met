import { Module } from '@nestjs/common';
import { MetApiService } from './met-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [MetApiService],
    exports: [MetApiService],
})
export class MetApiModule {}
