import { expect } from "chai";
import server from "../server";
import superTest from "supertest";

describe("server set up", () => {
  it(" should send all request routes through the Api route", done => {
    superTest(server)
      .get("/api/v1/")
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it("should catch routes that are not found", done => {
    superTest(server)
      .get("/api/v1/unexistent_route")
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        done();
      });
  });
});
