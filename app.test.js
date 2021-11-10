const { TestWatcher } = require("@jest/core");
const request = require("supertest");
const app = require("./app");

describe("GET /", () => {
  test("It should respond with an array of item names", async ()=>{
    await new Promise((r) => setTimeout(r, 3000));
    const response = await request(app).get("/items/");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /detailed", () =>{
  test("It should respond with an array of json objects of items and their detailed information", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/detailed/");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /:itemName", () =>{
  test("It should respond with Item not found", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/notARealItem");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({message : "Item not found"})
  });
});

describe("GET /rarity/:rarity", () =>{
  test("It should respond with an empty list", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/rarity/notARealRarity");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("GET /type/:type", ()=>{
  test("It should respond with an empty list", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/type/notARealType");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([])
  });
});

describe("POST /", ()=>{
  test("It should create a new item and print a confirmation to the screen", async ()=>{
    const response = await request(app).post("/items/")
    .send({
      name : 'My new item',
      description : 'This is my new item',
      rarity : 'epic',
      type : 'backpack',
      tags : ['MyNewItem', 'Best Item', 'The Greatest Item']
    })
    expect(response.statusCode).toBe(201);
  })
})
