import assert from "node:assert/strict";
import { beforeEach, describe, it, mock } from "node:test";
import axios from "axios";

import { fetchContent, resetContentCache } from "./content.js";

describe("fetchContent", () => {
  beforeEach(() => {
    mock.restoreAll();
    resetContentCache();
  });

  it("maps API payload into the expected content structure", async () => {
    const mockResponse = {
      data: {
        items: [
          { name: "Coastal Sunrise", country: "Spain", duration: "Aug", image: "img-1" },
          { title: "Mountain Air", country: "Nepal", duration: "Oct", image: "img-2" },
          { name: "City Lights", country: "USA", duration: "Sep", image: "img-3" },
          { name: "Cedar Trails", country: "Canada", duration: "May", image: "img-4" }
        ]
      }
    };

    const axiosStub = mock.method(axios, "get", async () => mockResponse);

    const result = await fetchContent();

    assert.equal(axiosStub.mock.callCount(), 1);
    assert.deepEqual(axiosStub.mock.calls[0].arguments, ["/api/destinations"]);

    assert.equal(result.featured.length, 2);
    assert.equal(result.featured[0].title, "Coastal Sunrise");
    assert.equal(result.latest[2].title, "City Lights");
    assert.ok(result.trending.map((item: { category: string }) => item.category).includes("Nepal"));
    assert.deepEqual(result.categories, ["Spain", "Nepal", "USA", "Canada"]);
  });

  it("returns cached payload on subsequent calls without new HTTP requests", async () => {
    const axiosStub = mock.method(axios, "get", async () => ({ data: { items: [] } }));

    const first = await fetchContent();
    const second = await fetchContent();

    assert.equal(axiosStub.mock.callCount(), 1);
    assert.strictEqual(second, first);
    assert.ok(second.categories.length > 0);
  });

  it("falls back to local content when the API request fails", async () => {
    const axiosStub = mock.method(axios, "get", async () => {
      throw new Error("Network down");
    });

    const result = await fetchContent();

    assert.equal(axiosStub.mock.callCount(), 1);
    assert.equal(result.featured.length, 2);
    assert.equal(result.latest.length, 3);
    assert.ok(result.categories.includes("All"));
    assert.ok(result.shop.length > 0);
  });
});
