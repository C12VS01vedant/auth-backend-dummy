const express = require("express");
const router = express.Router();

router.use("/auth", require("./api/auth"));
router.use("/expenses", require("./api/expenses"));

module.exports = router;
