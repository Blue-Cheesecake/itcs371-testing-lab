// Requires Node V18 in order to use `fetch` function
async function callStudentWS(url, method, sentData = {}) {
  let data;
  if (method == "selectall") {
    let response = await fetch(url, {
      method: "GET",
    });
    data = await response.json();
  } else if (method == "select") {
    let response = await fetch(url, {
      method: "GET",
    });
    data = await response.json();
  } else if (method == "insert" || method == "update" || method == "delete") {
    let aMethod;
    if (method == "insert") {
      aMethod = "POST";
    } else if (method == "update") {
      aMethod = "PUT";
    } else if (method == "delete") {
      aMethod = "DELETE";
    }
    let response = await fetch(url, {
      method: aMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sentData),
    });
    data = await response.json();
  }

  return data;
}

describe("Test: Unit Testing", () => {
  test("Test: Calling student web service by selecting student ID: 5", async () => {
    const res = await callStudentWS(
      "http://localhost:3000/student/5",
      "select"
    );

    const expectedResult = {
      error: false,
      data: {
        STU_ID: 5,
        STU_FNAME: "Christopher",
        STU_LNAME: "Ellison",
        STU_AGE: 25,
      },
      message: "Student retrieved",
    };

    expect(res).toEqual(expectedResult);
  });

  test("Test: Call student web service by selecting all students", async () => {
    const res = await callStudentWS(
      "http://localhost:3000/students",
      "selectall"
    );
    const expectedResult = {
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
    expect(res).toEqual(expectedResult);
  });
});
