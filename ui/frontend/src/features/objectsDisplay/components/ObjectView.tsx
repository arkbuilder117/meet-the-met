import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
} from '@mui/material';
import type { MetObject } from '../api/api';

interface Props {
    selectedObject: MetObject;
    closeView: () => void;
}

export default function ObjectView({ selectedObject, closeView }: Props) {
    const imageComponent =
        selectedObject.primaryImageSmall === '' ? (
            <Box
                sx={{
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography>No Image</Typography>
            </Box>
        ) : (
            <CardMedia
                sx={{ height: 300, maxHeight: '60vh' }}
                image={selectedObject.primaryImageSmall}
                title={selectedObject.title}
            />
        );

    return (
        <>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <Button
                        autoFocus
                        color="inherit"
                        onClick={() => closeView()}
                    >
                        Close
                    </Button>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" noWrap>
                        {selectedObject.objectID}: {selectedObject.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100vw',
                }}
            >
                <Card sx={{ minWidth: 300, width: '90vw', marginTop: 10 }}>
                    {imageComponent}
                    <CardContent>
                        <Typography>
                            Departmenrt: {selectedObject.department}
                        </Typography>
                        <Typography>
                            Culture: {selectedObject.culture}
                        </Typography>
                        <Typography>Period: {selectedObject.period}</Typography>
                        <Typography>
                            Artist: {selectedObject.artistDisplayName}
                        </Typography>
                        <Typography>
                            Source Credit: {selectedObject.creditLine}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
