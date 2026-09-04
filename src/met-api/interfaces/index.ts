interface MetAPIObjectsResult {
    total: number;
    objectIDs: number[];
}

// Todo: Keep consistent with ui/frontend/src/features/api.ts
interface MetAPIObjectResult {
    objectID: number;
    primaryImageSmall: string;
    title: string;
    department: string;
    culture: string;
    period: string;
    artistDisplayName: string;
    creditLine: string;
}

interface MetAPIDepartmentsResult {
    departments: Department[];
}

interface Department {
    departmentId: number;
    displayName: string;
}

export {
    type MetAPIObjectsResult,
    type MetAPIDepartmentsResult,
    type MetAPIObjectResult,
    type Department,
};
