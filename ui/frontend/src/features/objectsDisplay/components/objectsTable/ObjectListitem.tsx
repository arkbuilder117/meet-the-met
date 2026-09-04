import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';

interface Props {
    objectID: number;
    title: string;
    department: string;
    onSelect: () => void;
}

export default function ObjectListItem({
    objectID,
    title,
    department,
    onSelect,
}: Props) {
    return (
        <Card
            sx={{ minWidth: 350, width: '100%', maxWidth: '90vw' }}
            key={objectID}
        >
            <CardContent>
                <Grid container rowSpacing={1} columnSpacing={0} wrap="wrap">
                    <Grid container size={{ xs: 12, sm: 6 }} rowSpacing={0}>
                        <Grid size={12}>
                            <Typography sx={{ fontWeight: 'fontWeightBold' }}>
                                Met Object:
                            </Typography>
                        </Grid>
                        <Typography>
                            ({objectID}) {title}
                        </Typography>
                    </Grid>
                    <Grid container size={{ xs: 12, sm: 6 }}>
                        <Grid size={12}>
                            <Typography sx={{ fontWeight: 'fontWeightBold' }}>
                                Department:
                            </Typography>
                        </Grid>
                        <Typography>{department}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onSelect()}>
                    View
                </Button>
            </CardActions>
        </Card>
    );
}
