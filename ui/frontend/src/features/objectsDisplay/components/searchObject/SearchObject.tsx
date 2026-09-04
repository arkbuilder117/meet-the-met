import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
} from '@mui/material';
import { getObject, type MetObject } from '../../api/api';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface Props {
    setSelectedObject: React.Dispatch<React.SetStateAction<MetObject>>;
}

export default function ObjectSearch({ setSelectedObject }: Props) {
    const [objectId, setObjectId] = useState<string | undefined>();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const { refetch: fetchObject } = useQuery({
        queryKey: ['object', { objectId }],
        queryFn: () => getObject(objectId),
        enabled: false,
    });

    const onSearch = () => {
        fetchObject().then((response) => {
            if (response.error) {
                return;
            }
            setSelectedObject(response.data);
        });
    };

    const form = 'search-form';

    return (
        <>
            <Button variant="text" onClick={() => setIsSearchOpen(true)}>
                Search
            </Button>
            <Dialog open={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
                <DialogTitle>Search</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Search for a Met Object by it's ID
                    </DialogContentText>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setIsSearchOpen(false);
                            onSearch();
                        }}
                        id={form}
                    >
                        <Input
                            type="number"
                            name="Object ID"
                            placeholder="Object ID"
                            value={objectId}
                            onChange={(e) => setObjectId(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsSearchOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" form={form}>
                        Search
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
