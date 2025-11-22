import { useRoutes } from 'react-router-dom';
import { Landing } from '@/features/landing';
import { ServerStats } from '@/features/server-stats';

export const AppRoutes = () => {
    // const commonRoutes = [{ path: '/', element: <Landing /> }];
    // const element = useRoutes([...commonRoutes]);

    const element = useRoutes([
        {
            path: '/',
            element: <Landing />,
        },
        {
            path: '/health',
            element: <ServerStats />,
        },
        {
            path: '*',
            element: <div>404 Not Found</div>,
        }
    ]);

    return <>{element}</>;
};
