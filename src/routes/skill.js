const express = require("express");
const router = express.Router();
const skillController = require("../controller/skill");
const { protect } = require("../middleware/auth");
const { verify } = require("../middleware/verifyroles");

router.get(
  "/",
  protect,
  verify(["seller", "customer", "admin"]),
  skillController.getAllSkill
);
router.get(
  "/:id",
  protect,
  verify(["seller", "customer", "admin"]),
  skillController.getSkill
);
router.post("/", protect, verify(["admin"]), skillController.insert);
router.put("/:id", protect, verify(["admin"]), skillController.update);
router.delete("/:id", protect, verify(["admin"]), skillController.delete);

module.exports = router;
