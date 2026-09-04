import axios from 'axios';

const getObjectsTotal = async (
    departmentId?: number,
    title?: string,
): Promise<number> => {
    const url = '/api/objects/total';

    const params: Record<string, string | number> = {};

    if (departmentId) {
        params.departmentId = departmentId;
    }
    if (title) {
        params.title = title;
    }

    const response = axios.get<number>(url, { params });
    return (await response).data;
};

interface MetObject {
    objectID: number;
    primaryImageSmall: string;
    title: string;
    department: string;
    culture: string;
    period: string;
    artistDisplayName: string;
    creditLine: string;
}

const getObjectsPage = async (
    skip: number,
    take: number,
    departmentId?: number,
    title?: string,
): Promise<MetObject[]> => {
    const url = '/api/objects/page';

    const params: Record<string, string | number> = { skip, take };

    if (departmentId) {
        params.departmentId = departmentId;
    }
    if (title) {
        params.title = title;
    }

    const response = axios.get<MetObject[]>(url, { params });
    return (await response).data;
};

const getObject = async (objectId: string): Promise<MetObject> => {
    const url = `/api/objects/${Number(objectId)}`;

    const response = axios.get<MetObject>(url);
    return (await response).data;
};

interface Department {
    displayName: string;
    departmentId: number;
}

const getDepartments = async (): Promise<Department[]> => {
    const url = '/api/departments';

    const response = axios.get<Department[]>(url);
    return (await response).data;
};

export {
    getObjectsTotal,
    getObjectsPage,
    getObject,
    getDepartments,
    type MetObject,
};
