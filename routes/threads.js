const express = require("express");
const router = express.Router();
const multer = require("multer");
let threadController = require("../controllers/ThreadController");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString()+file.originalname);
  }
});
const upload = multer({ storage:storage });
router.get("/:id/offset/:offset", threadController.index);
router.get("/:id/", threadController.getThreadById);
router.post("/", upload.array("file"), threadController.store);
router.patch("/approve/:id", threadController.approveThread);
module.exports = router;
