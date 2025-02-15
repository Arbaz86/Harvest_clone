const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { TimeModel } = require("../models/time.model");

const timeController = Router();

timeController.post("/", authentication, async (req, res) => {
  const { week_number, project_name, client_name, work, emp_name } = req.body;
  let payload = req.body;

  let data = await TimeModel.findOne({
    week_number,
    project_name,
    client_name,
    emp_name,
  });

  if (!data) {
    const new_data = new TimeModel(payload);
    await new_data.save();

    res.json({ message: "data posted successfully" });
  } else {
    let newWorK = [];

    for (let i = 0; i < data.work.length; i++) {
      let flag = false;
      for (let j = 0; j < work.length; j++) {
        if (work[j].task == data.work[i].task) {
          flag = true;
          newWorK.push(work[j]);
          break;
        }
      }

      if (flag == false) {
        newWorK.push({
          billable: data.work[i].billable,
          notbillable: data.work[i].notbillable,
          task: data.work[i].task,
          charge: data.work[i].charge,
        });
      }
    }
    for (let i = 0; i < work.length; i++) {
      let flag = false;
      for (let j = 0; j < data.work.length; j++) {
        if (work[i].task == data.work[j].task) {
          flag = true;

          break;
        }
      }

      if (flag == false) {
        newWorK.push(work[i]);
      }
    }

    await TimeModel.updateOne(
      { week_number, project_name, client_name },
      { $set: { work: newWorK } }
    );
    res.json({ message: "data posted successfully" });
  }
});

timeController.get("/", authentication, async (req, res) => {
  let data = await TimeModel.find();
  res.json(data);
});

module.exports = { timeController };
