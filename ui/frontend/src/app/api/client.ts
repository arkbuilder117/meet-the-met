import { QueryClient } from '@tanstack/react-query';
import { FIVE_MINUTES } from '../../lib/constants';

const client = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: FIVE_MINUTES,
        },
    },
});

export default client;
