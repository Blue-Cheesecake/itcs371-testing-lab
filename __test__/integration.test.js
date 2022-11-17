// 6388004, 6388073
const express = require("express");
let app = express();
const router = require("../routes/studentServiceRoutes");
const request = require("supertest");

app.use("/", router);

describe("Test: Ingration Testing. Getting student information by All or ID", () => {
  test("Test: Test: Get all students list", async () => {
    const expected = {
      error: false,
      data: [
        {
          STU_ID: 1,
          STU_FNAME: "Andrew",
          STU_LNAME: "Black",
          STU_AGE: 25,
        },
        {
          STU_ID: 2,
          STU_FNAME: "Alexandra",
          STU_LNAME: "Brown",
          STU_AGE: 25,
        },
        {
          STU_ID: 3,
          STU_FNAME: "Amanda",
          STU_LNAME: "Davidson",
          STU_AGE: 25,
        },
        // 6388004, 6388073
        {
          STU_ID: 4,
          STU_FNAME: "Benjamin",
          STU_LNAME: "Duncan",
          STU_AGE: 25,
        },
        {
          STU_ID: 5,
          STU_FNAME: "Christopher",
          STU_LNAME: "Ellison",
          STU_AGE: 25,
        },
      ],
      message: "Student list.",
    };
    const res = await request(app).get("/students");
    expect(res.body).toEqual(expected);
  });

  test("Test: Get student by ID 1 (FOUND)", async () => {
    const res = await request(app).get("/student/1");
    const expectedResponse = {
      error: false,
      data: { STU_ID: 1, STU_FNAME: "Andrew", STU_LNAME: "Black", STU_AGE: 25 },
      message: "Student retrieved",
    };
    expect(res.body).toEqual(expectedResponse);
  });

  test("Test: Get student by ID: 999 (NOT FOUND)", async () => {
    const res = await request(app).get("/student/999");
    const expectedResponse = { error: false, message: "Student retrieved" };
    expect(res.body).toEqual(expectedResponse);
  });
});
