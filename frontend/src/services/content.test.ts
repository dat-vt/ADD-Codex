import axios from "axios";
import sinon from "sinon";
import { beforeEach, describe, expect, it, vi } from "vitest";

const loadFetcher = async () => {
  vi.resetModules();
  return import("./content");
};

describe("fetchContent", () => {
  beforeEach(() => {
    vi.resetModules();
    sinon.restore();
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

    const axiosStub = sinon.stub(axios, "get").resolves(mockResponse);
    const { fetchContent } = await loadFetcher();

    const result = await fetchContent();

    sinon.assert.calledOnce(axiosStub);
    sinon.assert.calledWith(axiosStub, "/api/destinations");

    expect(result.featured).toHaveLength(2);
    expect(result.featured[0].title).toBe("Coastal Sunrise");
    expect(result.latest[2].title).toBe("City Lights");
    expect(result.trending.map((item) => item.category)).toContain("Nepal");
    expect(result.categories).toEqual(["Spain", "Nepal", "USA", "Canada"]);
  });

  it("returns cached payload on subsequent calls without new HTTP requests", async () => {
    const axiosStub = sinon.stub(axios, "get").resolves({ data: { items: [] } });
    const { fetchContent } = await loadFetcher();

    const first = await fetchContent();
    const second = await fetchContent();

    sinon.assert.calledOnce(axiosStub);
    expect(second).toBe(first);
    expect(second.categories.length).toBeGreaterThan(0);
  });

  it("falls back to local content when the API request fails", async () => {
    const axiosStub = sinon.stub(axios, "get").rejects(new Error("Network down"));
    const { fetchContent } = await loadFetcher();

    const result = await fetchContent();

    sinon.assert.calledOnce(axiosStub);
    expect(result.featured).toHaveLength(2);
    expect(result.latest).toHaveLength(3);
    expect(result.categories).toContain("All");
    expect(result.shop.length).toBeGreaterThan(0);
  });
});
