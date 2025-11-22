import { useServerHealth } from '../api/get-health';
import { Head } from '@/components/Head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle, XCircle } from 'lucide-react';

export const ServerStats = () => {
    const { data, isLoading, isError } = useServerHealth();

    return (
        <>
            <Head title="Server Stats" description="Check the status of the backend server" />
            <div className="flex items-center justify-center min-h-screen bg-muted/20 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Server Status</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mt-4">
                            {isLoading ? (
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    <span>Checking connection...</span>
                                </div>
                            ) : isError ? (
                                <div className="flex items-center space-x-2 text-destructive">
                                    <XCircle className="h-8 w-8" />
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold">Offline</span>
                                        <span className="text-xs text-muted-foreground">Could not connect to server</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2 text-green-600">
                                    <CheckCircle className="h-8 w-8" />
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold">Online</span>
                                        <span className="text-xs text-muted-foreground">System operational</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {data && (
                            <p className="text-xs text-muted-foreground mt-4">
                                Response: {JSON.stringify(data)}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};
