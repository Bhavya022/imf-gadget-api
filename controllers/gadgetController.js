const Gadget = require("../models/Gadget");
const { generateCodeName, generateConfirmationCode } = require("../utils/generateCode");

// GET /gadgets
const getGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};

    const gadgets = await Gadget.findAll({ where });
    const gadgetsWithProbability = gadgets.map((gadget) => ({
      ...gadget.dataValues,
      missionSuccessProbability: `${Math.floor(Math.random() * 100) + 1}%`,
    }));

    res.status(200).json(gadgetsWithProbability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /gadgets
const addGadget = async (req, res) => {
  try {
    let codename;
    let isUnique = false;
    while (!isUnique) {
      codename = generateCodeName();
      const existingGadget = await Gadget.findOne({ where: { name: codename } });
      if (!existingGadget) {
        isUnique = true; 
      }
    }
    const gadget = await Gadget.create({ name: codename });
    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH /gadgets/:id
const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;

    const [rowsUpdated, [updatedGadget]] = await Gadget.update(req.body, {
      where: { id },
      returning: true, 
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ error: "Gadget not found" });
    }

    res.status(200).json(updatedGadget); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /gadgets/:id
const deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;
    await Gadget.update(
      { status: "Decommissioned", decommissionedAt: new Date() },
      { where: { id } }
    );
    res.status(200).json({ message: "Gadget marked as decommissioned." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /gadgets/:id/self-destruct
const triggerSelfDestruct = async (req, res) => {
  try {
    const { id } = req.params;
    const confirmationCode = generateConfirmationCode();

    res.status(200).json({
      message: `Self-destruct sequence triggered for gadget ${id}.`,
      confirmationCode,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGadgetById = async (req, res) => {
  try {
    const { id } = req.params; 
    const gadget = await Gadget.findByPk(id); 
  if (!gadget) {
      return res.status(404).json({ error: "Gadget not found" });
    }
    res.status(200).json(gadget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getGadgets,
  addGadget,
  updateGadget,
  deleteGadget,
  triggerSelfDestruct, 
  getGadgetById
};
