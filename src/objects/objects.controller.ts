import { Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { MetAPIObjectResult } from '../met-api/interfaces';

@Controller('objects')
export class ObjectsController {
    constructor(private readonly service: ObjectsService) {}

    @Get('total')
    getObjectsTotal(
        @Query('departmentId', new ParseIntPipe({ optional: true }))
        departmentId?: number,
        @Query('title') title?: string,
    ): Promise<number> {
        return this.service.getTotalObjects(departmentId, title);
    }

    @Get('page')
    getObjectsPage(
        @Query('skip', new ParseIntPipe()) skip: number,
        @Query('take', new ParseIntPipe()) take: number,
        @Query('departmentId', new ParseIntPipe({ optional: true }))
        departmentId?: number,
        @Query('title') title?: string,
    ): Promise<MetAPIObjectResult[]> {
        return this.service.getObjectsPage(skip, take, departmentId, title);
    }

    @Get(':objectId')
    getObject(
        @Param('objectId', new ParseIntPipe()) objectId: number,
    ): Promise<MetAPIObjectResult | undefined> {
        return this.service.getObject(objectId);
    }
}
