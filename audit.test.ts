import request from "supertest";
import app from "../src/app";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("POST /api/audit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should audit a valid URL", async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: `
      <html>
        <head>
          <title>Example Domain</title>
          <meta name="description" content="Example Description"/>
        </head>
      </html>`
    });

    const response = await request(app)
      .post("/api/audit")
      .send({ url: "https://example.com" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Example Domain");
    expect(response.body.data.description).toBe("Example Description");
  });

  it("should reject invalid URL", async () => {
    const response = await request(app)
      .post("/api/audit")
      .send({ url: "invalid-url" });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should handle request timeout", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Request timeout"));

    const response = await request(app)
      .post("/api/audit")
      .send({ url: "https://example.com" });

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });

  it("should return cached result", async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: `<title>Cached Page</title><meta name="description" content="Cache Test"/>`
    });

    await request(app).post("/api/audit").send({ url: "https://cached.com" });
    const response = await request(app).post("/api/audit").send({ url: "https://cached.com" });

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe("Cached Page");
  });
});
