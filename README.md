# SWE-432 HW-2 Starter Application

## Submission Information

### Student Information

*Please fill in this information before submission*

* **Student Name: John Nachreiner** 
* **Student G-Number: G#01116844** 
* **Heroku Deployment URL: https://john-nachreiner-swe432-hw2.herokuapp.com/**

### Documentation of your 7 Scenarios

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

This repo contains a barebones Node.js app using [Express 4](http://expressjs.com/). You will use this as the "base" version of your Microserivce application for HW Assignment #2. You will simply create a copy of this repo through GitHub classroom and then work in that repo. 

## Homework Assignment #2 Detailed Instructions

You can find the deatiled instructions for HW Assignment #2 on the [course webpage](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw2). Please read these carefully before getting started.

## Running this Project Locally

Make sure you have [Node.js](http://nodejs.org/) and (optionally) the [Heroku CLI](https://cli.heroku.com/) installed. You only need the Heroku CLI installed if you plan to deploy the project from the CLI instead of the Heroku web interface. See the [HW Assignment #2 instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw2) for more details.

*Note the following commands assume a Unix-based enviornment. If you are on windows, you may need to use something such as Windows Subsystem for Linux (https://docs.microsoft.com/en-us/windows/wsl/about).*

```sh
$ git clone <repo-name>
$ cd <repo-name>
$ npm install
$ npm start
```

After executing these commands, your app should now be running on [localhost:3000](http://localhost:3000/). You can visit this in your browser to see your 

## Deploying to Heroku

Check out [our instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw2) for deploying your application to Heroku. You can use the button below for quick access to your Heroku account.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Testing with Continuous Integration

Currently, this repo is set up to run the Jest tests in the `app.test.js` file upon each commit to the `main` branch of the repository. If any of the tests fail, the CI process will fail and this will be indicated with red "X" on the main page of your repo, and GitHub will likely also send you a notification email that your automated tests have failed.

Currently, the tests are configured to run by getting deployed to a remote virtual server with an Ubuntu operating system, where the `npm install` and `npm test` commands are executed. We don't anticpate you needing to change this configuration, as it is fine to keep all of your tests in the `app.test.js` for this assignment. 

We expect that all of your (at least) 12 unit tests will have passed via the command line by the time you turn in the assignment.

You can find the [GitHub Actions](https://github.com/features/actions) script for this CI job [here](.github/workflows/ci.yml) if you want to learn more.

## Additional Resources

For more information about using Node.js on Heroku, see these Heroku Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
