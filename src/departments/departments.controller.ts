import { Controller, Get } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly service: DepartmentsService) {}

    @Get()
    getDepartments() {
        return this.service.getDepartments();
    }
}
