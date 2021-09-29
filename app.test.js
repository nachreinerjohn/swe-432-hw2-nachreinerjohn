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
  });
});

describe("GET /:itemName", () =>{
  test("It should respond with the information of a specific item", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/Sockets/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      "name": "Sockets",
      "description": "I don't know why he's on fire. I've never asked.",
      "rarity": "rare",
      "type": "backpack",
      "tags": [
          "Cosmetics.Source.ItemShop",
          "Cosmetics.Filter.Season.18",
          "Cosmetics.Set.MarrowCheck"
      ]
  })
  });

  test("It should respond with Item not found", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/notARealItem");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({message : "Item not found"})
  });
});

describe("GET /rarity/:rarity", () =>{
  test("It should respond with a list of the items with the specified rarity", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/rarity/epic");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      "Floating Island",
      "Siphon Pack",
      "Geometrik",
      "Chaos Origins",
      "Cube Axe",
      "Mutagen Mace"
  ])
  });

  test("It should respond with an empty list", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/rarity/notARealRarity");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("GET /type/:type", ()=>{
  test("It should respond with a list of the items with the specified type", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/type/backpack");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      "Floating Island",
      "Sockets",
      "Wolfmoon Crest",
      "Llamabomination",
      "Siphon Pack"
  ])
  });

  test("It should respond with an empty list", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/type/notARealType");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([])
  });
});

describe("GET /type/:type/rarity", ()=>{
  test("It should respond with a percentage breakdown of the rarities for the specified item type", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/type/backpack/rarity");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      "epic": "40%",
      "rare": "60%"
  })
})

  test("It should respond with an empty list", async ()=>{
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/items/type/notARealType/rarity");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  })
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
    // .field('name', 'My new item')
    // .field('description', 'This is my new item')
    // .field('rarity', 'epic')
    // .field('type', 'backpack')
    // .field('tags', ['MyNewItem', 'Best Item', 'The Greatest Item'])
    expect(response.statusCode).toBe(201);
  })
})

describe("POST /tag/:itemName", ()=>{
  test("It should add the list of tags to the specified item", async ()=>{
    const response = await request(app).post("/items/tag/Sockets")
    .send({
      tags : ["MyNewTag", "Best Tag", "The Greatest Tag"]
    })
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      tags : [
        "Cosmetics.Source.ItemShop",
        "Cosmetics.Filter.Season.18",
        "Cosmetics.Set.MarrowCheck",
        "MyNewTag",
        "Best Tag",
        "The Greatest Tag"
    ]
    })
  })
})
