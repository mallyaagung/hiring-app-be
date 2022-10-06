const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { protect } = require("../middleware/auth");

router.post("/registrasi", authController.registrasi);
router.post("/login", authController.login);
router.post("/refreshtoken", authController.refreshToken);
router.get("/profile", protect, authController.profile);

module.exports = router;
