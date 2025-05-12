import "jsdom-global/register";
import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest"; // Added vitest imports
import { server } from "./apps/web/mocks/server"; // Import the node server

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
