* **Name: John Nachreiner** 
* **Heroku Deployment URL: https://john-nachreiner-swe432-hw2.herokuapp.com/**

### Documentation of 7 Scenarios

* Retrieve a list of new Cosmetic items in the fortnite marketplace
  * API Endpoint: GET /items/
  * Expected Output (As of 9/29/2021, 6:00am): "[
                        "Floating Island",
                        "Sockets",
                        "Wolfmoon Crest",
                        "Llamabomination",
                        "Siphon Pack",
                        "Geometrik",
                        "Ione",
                        "Skeletara",
                        "Chaos Origins",
                        "Curdle Scream Leader",
                        "Page-Turner",
                        "FNCS 2:8",
                        "Burning Wolf Strike",
                        "Feel My Wrath",
                        "Gridlock",
                        "Combat Cubed",
                        "Cube Theme",
                        "Cube Axe",
                        "Chimeraxes",
                        "Mutagen Mace",
                        "The Axe-Ray",
                        "Might & Malice",
                        "FNCS Spirit",
                        "Soundwave Series - Hamaki",
                        "Cubic Assimilation",
                        "Goo Buddies",
                        "World Dominator",
                        "Plumage"
                    ]"

* Retrieve a list of new Cosmetic items in the fortnite marketplace with more detailed info for each item
  * API Endpoint: GET /items/detailed
  * Expected Output (Only showing one result as the true list is over 300 lines)(As of 9/29/2021, 6:00am):
    {
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
    }

* Retrieve the detailed information of one new Cosmetic item from the fortnite marketplace
  * API Endpoint: GET /items/:itemName
  * Example: GET /items/Wolfmoon%20Crest
  * Expected Output(As of 9/29/2021, 6:00am):
  {
    "name": "Wolfmoon Crest",
    "description": "Beware the wolf moon...",
    "rarity": "rare",
    "type": "backpack",
    "tags": [
        "Cosmetics.Source.ItemShop",
        "Cosmetics.Filter.Season.18",
        "Cosmetics.Set.MoonBark"
    ]
  }

* Creates a new item and adds it to the list of new Cosmetic items in the fortnite marketplace
  * API Endpoint: POST /items/
  * Example: POST /items/
  {
    "name": "My new item",
    "description" : "This is my new item",
    "rarity" : "epic",
    "type" : "backpack",
    "tags" : ["MyNewItem", "Best Item", "The Greatest Item"]
  }
  * Expected Output:

                  Created new Item:

                  Name : My new item

                  Description: This is my new item

                  Type: backpack

                  Rarity: epic

                  Tags: MyNewItem,Best Item,The Greatest Item

* Adds the listed tags to an existing item, note tags must be in an array format
  * API Endpoint: POST /items/tag/:itemName
  * Example: POST /items/tag/Wolfmoon%20Crest
  {
    ["My New Tag", "Best Tag", Excellent Tag]
  }
  * Expected Output(As of 9/29/2021, 6:00am): 
                    {
                      "tags": [
                          "Cosmetics.Source.ItemShop",
                          "Cosmetics.Filter.Season.18",
                          "Cosmetics.Set.MoonBark",
                          "MyNewItem",
                          "Best Item",
                          "The Greatest Item"
                          ]
                    }

* Retrieves a list of the names of items with the specified rarity
  * API Endpoint: GET /items/rarity/:rarity
  * Example: GET /items/rarity/epic
  * Expected Output(As of 9/29/2021, 6:00am): 
                    [
                      "Floating Island",
                      "Siphon Pack",
                      "Geometrik",
                      "Chaos Origins",
                      "Cube Axe",
                      "Mutagen Mace",
                      "My new item"
                    ]

* Retrieves a list of the names of items with the specified type
  * API Endpoint: GET /items/type/:type
  * Example: GET /items/type/outfit
  * Expected Output: 
                  [
                    "Geometrik",
                    "Ione",
                    "Skeletara",
                    "Chaos Origins",
                    "Curdle Scream Leader"
                  ]

* Retrieves a statistical breakdown of the different rarities in a specified item type
  * API Endpoint: GET /items/type/:type/rarity
  * Example: GET /items/outfit/rarity
  * Expected Output: 
                    {
                        "epic": "40%",
                        "rare": "60%"
                    }

## Project Overview

This repo contains a barebones Node.js app using [Express 4](http://expressjs.com/). 