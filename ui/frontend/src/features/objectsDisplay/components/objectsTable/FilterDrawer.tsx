import {
    Button,
    Grid,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    type SelectChangeEvent,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '../../api/api.js';
import { useState } from 'react';

interface Props {
    departmentId: number | undefined;
    searchTerm: string | undefined;
    onFilter: (departmentId?: number, searchTerm?: string) => void;
}

export default function FilterDrawer({
    departmentId,
    searchTerm,
    onFilter,
}: Props) {
    const [selectedDepartmentId, setSelectedDepartmentId] =
        useState(departmentId);
    const [currentSearchTerm, setCurentSearchTerm] = useState(searchTerm);

    const { data = [], isLoading } = useQuery({
        queryKey: ['departments'],
        queryFn: () => {
            return getDepartments();
        },
    });

    const onDepartmentIdChangeChange = (event: SelectChangeEvent) => {
        const value = event.target.value;

        if (value === '') {
            setSelectedDepartmentId(undefined);
            return;
        }

        setSelectedDepartmentId(Number(value));
    };

    const onClear = () => {
        setSelectedDepartmentId(undefined);
        setCurentSearchTerm(undefined);
    };

    return (
        <Stack spacing={3} sx={{ alignItems: 'center', margin: 1 }}>
            <Typography variant="h4">Filter</Typography>
            <Select
                disabled={isLoading}
                value={selectedDepartmentId?.toString() ?? ''}
                onChange={onDepartmentIdChangeChange}
                fullWidth
                sx={{ maxWidth: '195px' }}
            >
                <MenuItem value={undefined}></MenuItem>
                {data.map((item) => (
                    <MenuItem value={item.departmentId}>
                        {item.displayName}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                value={currentSearchTerm}
                label="Filter by Title"
                onChange={(event) => setCurentSearchTerm(event.target.value)}
            />
            <Grid container spacing={1}>
                <Button
                    variant="contained"
                    onClick={() =>
                        onFilter(selectedDepartmentId, currentSearchTerm)
                    }
                >
                    Submit
                </Button>
                <Button variant="outlined" onClick={() => onClear()}>
                    Clear
                </Button>
            </Grid>
        </Stack>
    );
}
