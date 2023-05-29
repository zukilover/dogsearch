import { rest } from "msw";
import { setupServer } from "msw/node";
import handlers from "./server-handlers";

// Provide reusable mock server resources
const server = setupServer(...handlers)
export { server, rest }
