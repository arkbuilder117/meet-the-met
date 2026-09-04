import { QueryClientProvider } from '@tanstack/react-query';
import client from './api/client';
import ObjectsDisplay from '../features/objectsDisplay/ObjectsDisplay';

export default function App() {
    return (
        <QueryClientProvider client={client}>
            <ObjectsDisplay />
        </QueryClientProvider>
    );
}
