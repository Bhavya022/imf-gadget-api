const express = require("express");
const {
  getGadgets,
  addGadget,
  updateGadget,
  deleteGadget,
  triggerSelfDestruct,
  getGadgetById
} = require("../controllers/gadgetController");
const router = express.Router();

router.get("/", getGadgets);
router.get("/:id", getGadgetById);
router.post("/", addGadget);
router.patch("/:id", updateGadget);
router.delete("/:id", deleteGadget);
router.post("/:id/self-destruct", triggerSelfDestruct);

module.exports = router;
