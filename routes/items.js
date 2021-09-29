const express = require('express');
const fetch = require('node-fetch');
const router = express.Router()

var Cosmetics = [];
var dataIsReady = false;

class CosmeticItem{
    constructor(name, description, rarity, type, tags){
        this.name = name;
        this.description = description;
        this.rarity = rarity;
        this.type = type;
        this.tags = tags
    }
    display(){
        return JSON.stringify(this);
    }
    addTag(tags){
        for(let tag of tags){
            this.tags.push(tag)
        }
    }
}

const getCosmetics = async ()=>{
    const cosmeticBody = await fetch("https://fortnite-api.com/v2/cosmetics/br/new");

    const cosmeticTemp = await cosmeticBody.json()

    for(let item of cosmeticTemp.data.items){
        Cosmetics.push(new CosmeticItem(item.name, item.description, item.rarity.value, item.type.value, item.gameplayTags));
    }
};

getCosmetics().then(() =>{
    dataIsReady = true;
}).catch(err =>{
    console.log(err);
})


//getting all items
router.get('/', (req, res)=>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }
    let items = []
    for(let item of Cosmetics){
        items.push(item.name);
    }
    res.send(items)
  })

//getting a detailed list of all items and their values
router.get('/detailed', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    res.json(Cosmetics);
})
//getting one item
router.get('/:itemName', (req, res) => {
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    const itemName = req.params.itemName;

    if(itemName){
        var found = false;
        for(let item of Cosmetics){
            if(item.name == itemName){
                found = true;
                res.json(item);
            }
        }
        if(!found){
            res.status(404);
            res.json({message : "Item not found"})
        }
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"})
    }
  })

//creating an item
router.post('/', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    const {name, description, rarity, type, tags} = req.body

    if(name && description && rarity && type, tags){
        Cosmetics.push(new CosmeticItem(name, description, rarity, type, tags));

        res.status(201);
        res.send(`Created new Item:\n
        Name : ${Cosmetics[Cosmetics.length-1].name}\n
        Description: ${Cosmetics[Cosmetics.length-1].description}\n
        Type: ${Cosmetics[Cosmetics.length-1].type}\n
        Rarity: ${Cosmetics[Cosmetics.length-1].rarity}\n
        Tags: ${Cosmetics[Cosmetics.length-1].tags}\n`)
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"});
    }
})

//add tags to an item
router.post('/tag/:itemName', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }
    
    const itemName = req.params.itemName;
    const tags = req.body.tags

    if(itemName && tags && Array.isArray(tags)){
        var found = false;
        for(let item of Cosmetics){
            if(item.name == itemName){
                found = true;
                item.addTag(tags);
                res.status(201);
                res.json({tags : item.tags});
            }
        }
        if(!found){
            res.status(404)
            res.json({message : "Item not found"})
        }
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"});
    }
})

//getting items with the specified rarity
router.get('/rarity/:rarity', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    let items = []

    const itemRarity = req.params.rarity;

    if(itemRarity){
        for(let item of Cosmetics){
            if(item.rarity == itemRarity){
                items.push(item.name);
            }
        }
        res.json(items);
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"});
    }
})

//getting the items with the specified type
router.get('/type/:type', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    let items = []

    const itemType = req.params.type;

    if(itemType){ 
        for(let item of Cosmetics){
            if(item.type == itemType){
                items.push(item.name)
            }
        }
        res.json(items);
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"});
    }
})

//getting the rarity breakdown of items of a specific type
router.get('/type/:type/rarity', (req, res) =>{
    if(!dataIsReady){
        res.status(503)
        return res.json({error : "Data not ready"});
    }

    const itemType = req.params.type;

    if(itemType){
        const breakdown = new Map();

        for(let item of Cosmetics){
            if(item.type == itemType){
                if(breakdown.has(item.rarity)){
                    breakdown.set(item.rarity, breakdown.get(item.rarity) + 1);
                }
                else{
                    breakdown.set(item.rarity, 1);
                }
            }
        }
        let total = 0;
        for(const value of breakdown.values()){
            total += value;
        }
        for(const key of breakdown.keys()){
            breakdown.set(key, (breakdown.get(key)/total)*100 + "%")
        }
        const ret = Object.fromEntries(breakdown);
        res.json(ret);
    }
    else{
        res.status(400);
        res.json({error : "Invalid Input"});
    }
})
module.exports = router;