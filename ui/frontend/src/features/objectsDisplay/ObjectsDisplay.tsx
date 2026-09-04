import { Dialog, Typography } from '@mui/material';
import { type MetObject } from './api/api.js';
import { useState } from 'react';
import ObjectView from './components/ObjectView.js';
import ObjectsTable from './components/objectsTable/index.js';

export default function ObjectsDisplay() {
    const [selectedObject, setSelectedObject] = useState<
        MetObject | undefined
    >();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 30px',
            }}
        >
            <Typography variant="h3" sx={{ marginBottom: 3 }}>
                Meet the Met
            </Typography>
            <ObjectsTable setSelectedObject={setSelectedObject} />
            <Dialog open={selectedObject !== undefined} fullScreen>
                {selectedObject && (
                    <ObjectView
                        selectedObject={selectedObject}
                        closeView={() => setSelectedObject(undefined)}
                    />
                )}
            </Dialog>
        </div>
    );
}
