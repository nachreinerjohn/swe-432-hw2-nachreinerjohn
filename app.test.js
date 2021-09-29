const { TestWatcher } = require("@jest/core");
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");
//const items = require("./routes/items");

// describe("GET / ", () => {
//   test("It should respond with an array of cities", async () => {
//     await new Promise((r) => setTimeout(r, 2000));
//     const response = await request(app).get("/cities");
//     expect(response.body).toEqual(["Fairfax", "Vienna", "Falls Church", "Arlington"]);
//     expect(response.statusCode).toBe(200);
//   });
// });

// describe("Post /", () =>{
//   test("It should create a new item, place it into the dataset, then print a confirmation message"), async ()=>{
//     await new Promise((r) => setTimeout(r, 2000));
//     const response = await request(app).post("/");
//   }
// })

describe("GET /", () => {
  test("It should respond with an array of item names", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/");
    expect(response.statusCode).toBe(200);
  });

  // test("It should respond with Data not ready", async ()=>{
  //   await new Promise((r) => setTimeout(r, 2000));
  //   const response = await request(app).get("/items/");
  //   expect(response.statusCode).toBe(503);
  // });

  test("It should respond with Item not found", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/:not a real item");
    expect(response.statusCode).toBe(404);
  });
});

describe("GET /detailed", () =>{
  test("It should respond with an array of json objects of items and their detailed information", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/detailed/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toContainEqual({
      "name": "Floating Island",
      "description": "Honor The Cube.",
      "rarity": "epic",
      "type": "backpack",
      "tags": [
          "Cosmetics.Source.ItemShop",
          "Cosmetics.UserFacingFlags.Reactive",
          "Cosmetics.Set.RuneParallel",
          "Cosmetics.Filter.Season.18",
          "Cosmetics.UserFacingFlags.HasVariants"
      ]
  })
  })
})

describe("GET /:itemName", () =>{
  test("It should respond with the information of a specific item", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/Sockets/");
    expect(response.statusCode).toBe(200);
  })
})
