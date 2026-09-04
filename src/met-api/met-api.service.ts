import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
    MetAPIDepartmentsResult,
    MetAPIObjectResult,
    MetAPIObjectsResult,
} from './interfaces';

@Injectable()
export class MetApiService {
    private static BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';

    constructor(private readonly httpService: HttpService) {}

    public async getObjects(
        departmentId?: number,
    ): Promise<MetAPIObjectsResult> {
        let url = MetApiService.BASE_URL + 'objects';

        if (departmentId) {
            url += `?departmentIds=${departmentId}`;
        }

        const observable = this.httpService.get<MetAPIObjectsResult>(url);

        try {
            return (await firstValueFrom(observable)).data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getObjectsBySearch(
        title: string,
        departmentId?: number,
    ): Promise<MetAPIObjectsResult> {
        let url = `${MetApiService.BASE_URL}search?q=${title}&title`;

        if (departmentId) {
            url += `&departmentId=${departmentId}`;
        }

        const observable = this.httpService.get<MetAPIObjectsResult>(url);

        try {
            return (await firstValueFrom(observable)).data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getObject(objectId: number): Promise<MetAPIObjectResult> {
        const url = `${MetApiService.BASE_URL}objects/${objectId}`;

        const observable = this.httpService.get<MetAPIObjectResult>(url);

        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return (await firstValueFrom(observable)).data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getDepartments(): Promise<MetAPIDepartmentsResult> {
        const url = MetApiService.BASE_URL + 'departments';

        const observable = this.httpService.get<MetAPIDepartmentsResult>(url);

        return (await firstValueFrom(observable)).data;
    }
}
