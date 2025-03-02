// const mongoose = require("mongoose");

// const Product = require('../models/Product.model');
// const Collection = require('../models/Collection.model');
// const serviceClass = require('../service');
// const { response } = require('express');
// const { db } = require("../models/Collection.model");
// require('./index');
// const service = new serviceClass();

// service.getAllProducts().then((responseFromAPI) => {
//     console.log('Count of entries from API:', responseFromAPI.data?.length);
//     Product.create(responseFromAPI.data).then(responseFromDB => {
//         console.log('response fromDB:', responseFromDB.length)
//     })
// })

// myCursor = db.inventory.find({})

// Collection.create(myCursor)
//     .then(responseFromDB => {
//         console.log("what is response from db??", responseFromDB);
//         console.log({ "_id": yourObjectId });
//         mongoose.connection.close();
//     })
//     .catch()
