const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { protect } = require("../middleware/auth");
const { verify } = require("../middleware/verifyroles");
const {
  hitCacheProductDetail,
  clearCacheProductDetail,
} = require("../middleware/redis");
const upload = require("../middleware/upload");

router.get(
  "/",
  protect,
  verify(["user", "recruiter", "admin"]),
  userController.getAllUser
);
router.get(
  "/:id",
  protect,
  verify(["user", "recruiter", "admin"]),
  hitCacheProductDetail,
  userController.getUser
);
router.put(
  "/:id",
  protect,
  verify(["user", "recruiter"]),
  upload.single("picture"),
  clearCacheProductDetail,
  userController.update
);

module.exports = router;
