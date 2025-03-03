const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.headers);
  res.json({ message: "test" });
});

module.exports = router;
