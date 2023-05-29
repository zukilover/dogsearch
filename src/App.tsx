import { ReactElement, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConfigProvider from "antd/lib/config-provider";
import Skeleton from "antd/lib/skeleton";
import Routes from "./routes";

export default function App(): ReactElement {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            }
        }
    })

    return (
        <Suspense fallback={<Skeleton />}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider theme={{
                    token: {
                        fontFamily: '"Poppins", sans-serif',
                    }
                }}>
                    <Router>
                        <Routes />
                    </Router>
                </ConfigProvider>
            </QueryClientProvider>
        </Suspense>
    )
}