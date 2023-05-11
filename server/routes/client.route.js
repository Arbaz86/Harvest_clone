const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { ClientModel } = require("../models/client.mode");
const clientController = Router();

clientController.post("/", authentication, async (req, res) => {
  const payload = req.body;
  const new_data = new ClientModel(payload);
  await new_data.save();

  res.json({ message: "Reached" });
});
clientController.get("/", authentication, async (req, res) => {
  // const { edit_id } = req.params;
  const new_data1 = await ClientModel.find();

  res.json(new_data1);

  // const payload = req.body;
  // const new_data = new ClientModel(payload);
  // await new_data.save()

  // res.json({message:"Reached"})
});

clientController.patch("/edit/:edit_id", authentication, async (req, res) => {
  const { edit_id } = req.params;

  const new_data1 = await ClientModel.updateOne(
    { _id: edit_id },
    { ...req.body }
  );

  res.json(new_data1);

  // const payload = req.body;
  // const new_data = new ClientModel(payload);
  // await new_data.save()

  // res.json({message:"Reached"})
});

clientController.delete(
  "/delete/:delete_id",
  authentication,
  async (req, res) => {
    const { delete_id } = req.params;

    const new_data1 = await ClientModel.deleteOne({ _id: delete_id });

    res.json({ message: "data deleted" });

    // const payload = req.body;
    // const new_data = new ClientModel(payload);
    // await new_data.save()

    // res.json({message:"Reached"})
  }
);

clientController.post("/contact", authentication, async (req, res) => {
  const payload = req.body;
  const new_data = await ClientModel.updateOne(
    { _id: "63380eafd7b98b0b98107a8c" },
    {
      $push: {
        contacts: payload,
      },
    }
  );
  let vin = new_data.contacts;

  res.json({ message: "Reached" });
});

clientController.delete("/contact", authentication, async (req, res) => {
  const payload = req.body;
  const new_data = await ClientModel.updateOne(
    { _id: "63380eafd7b98b0b98107a8c" },
    {
      $pull: {
        contacts: { _id },
      },
    }
  );
  let vin = new_data.contacts;

  res.json({ message: "Reached" });
});

module.exports = { clientController };
