const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { ProjectModel } = require("../models/project.model");

const projectController = Router();

projectController.post("/", authentication, async (req, res) => {
  const payload = req.body;
  const new_data = new ProjectModel(payload);

  await new_data.save();

  res.json({ message: "Reached to the project add data section" });
});

projectController.get("/", authentication, async (req, res) => {
  const payload = req.body;
  const new_data = await ProjectModel.find();

  res.json(new_data);
});
projectController.get("/", authentication, async (req, res) => {
  const payload = req.body;
  const new_data = await ProjectModel.find();
  res.json(new_data);
});

module.exports = { projectController };
