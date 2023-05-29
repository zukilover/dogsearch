
import { PropsWithChildren, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { server, rest } from "../../helpers/server";
import DogsList from "./index"

function MockApp({ children }: PropsWithChildren): ReactElement {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // Do not retry failed attempts on test
                // Otherwise, react-query will retry failures 3 times and it will likely timeout.
                retry: 0,
            }
        },
        logger: {
            log: () => { },
            warn: () => { },
            error: () => { },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </QueryClientProvider>
    )
}

describe("Dogs list component", () => {
    it("renders dogs list correctly", async () => {
        render(<MockApp><DogsList /></MockApp>)
        const list = await screen.findAllByTestId('dogs-list__item')
        expect(list?.length).toBe(2)
    })
})

describe('Dogs list edge case: empty data', () => {
    it("renders empty list on empty data response", async () => {
        let list = null
        server.use(
            rest.get('/units', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json([]),
                )
            })
        );
        render(<MockApp><DogsList /></MockApp>)
        try {
            list = await screen.findAllByTestId('dogs-list__item')
        } catch {
            expect(list).toBeNull()
        }
    })
})