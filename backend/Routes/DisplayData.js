const express = require('express');
const router = express.Router();

router.post('/foodData', (req,res) => {
try {
    res.send([global.food_items,global.food_catogary ]);  // sending data to front end in array from like [0,1] indexing so in front end we access by indexing
} catch (error) {
    console.error(error.message);
    res.send("error in displaydata");
}

})


module.exports = router;