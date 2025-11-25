import assert from "node:assert/strict";
import { AddressInfo } from "node:net";
import test from "node:test";
import { createApp, destinationsQuery } from "./app.js";
import { sampleDestinations, sampleItinerary } from "./sampleData.js";

type MockPool = {
  query: (query: string) => Promise<[unknown[], unknown]>;
};

type TestServer = {
  url: string;
  close: () => Promise<void>;
};

const startServer = (pool: MockPool, ensureConnection: () => Promise<void>) => {
  const app = createApp(pool as any, ensureConnection);
  const server = app.listen(0);

  return new Promise<TestServer>((resolve) => {
    server.once("listening", () => {
      const address = server.address() as AddressInfo;
      resolve({
        url: `http://127.0.0.1:${address.port}`,
        close: async () => {
          await new Promise((done) => server.close(done));
        }
      });
    });
  });
};

test("reports database connectivity status", async () => {
  const pool: MockPool = {
    query: async () => [[], []]
  };

  const connectedServer = await startServer(pool, async () => Promise.resolve());
  const connectedResponse = await fetch(`${connectedServer.url}/api/health`);
  assert.equal(connectedResponse.status, 200);
  assert.deepEqual(await connectedResponse.json(), { status: "ok", db: "connected" });
  await connectedServer.close();

  const offlineServer = await startServer(pool, async () => {
    throw new Error("db offline");
  });
  const offlineResponse = await fetch(`${offlineServer.url}/api/health`);
  assert.equal(offlineResponse.status, 200);
  assert.deepEqual(await offlineResponse.json(), {
    status: "ok",
    db: "offline",
    note: "using sample data"
  });
  await offlineServer.close();
});

test("returns destinations from the database when available", async () => {
  const rows = [
    { id: 1, country: "Japan", name: "Kyoto", summary: "test", rating: 5, duration: "3", price: 100 }
  ];
  let executedQuery = "";
  const pool: MockPool = {
    query: async (query: string) => {
      executedQuery = query;
      return [rows, []];
    }
  };

  const server = await startServer(pool, async () => Promise.resolve());
  const response = await fetch(`${server.url}/api/destinations`);
  assert.equal(executedQuery, destinationsQuery);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { items: rows });
  await server.close();
});

test("falls back to sample destinations on query failure", async () => {
  const pool: MockPool = {
    query: async () => {
      throw new Error("db unavailable");
    }
  };

  const server = await startServer(pool, async () => Promise.resolve());
  const response = await fetch(`${server.url}/api/destinations`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { items: sampleDestinations, source: "sample" });
  await server.close();
});

test("returns the sample itinerary", async () => {
  const pool: MockPool = {
    query: async () => [[], []]
  };

  const server = await startServer(pool, async () => Promise.resolve());
  const response = await fetch(`${server.url}/api/itinerary`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { days: sampleItinerary });
  await server.close();
});

test("drafts a trip from request details", async () => {
  const pool: MockPool = {
    query: async () => [[], []]
  };

  const server = await startServer(pool, async () => Promise.resolve());
  const payload = {
    city: "Kyoto",
    dates: "2024-10-01 to 2024-10-05",
    style: "culture",
    budget: "moderate"
  };

  const response = await fetch(`${server.url}/api/trip`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: "drafted",
    title: "Sketch for Kyoto",
    dates: payload.dates,
    style: payload.style,
    budget: payload.budget,
    highlights: [
      "Boutique stay suggestions",
      "Day-by-day mood-board",
      "Dining map and reservations"
    ]
  });

  await server.close();
});
