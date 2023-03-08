const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Vehicle = require("./vehicleModel");
//const seed = require("./seed");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//defining the port number for the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000 or heroku port");
});

//calling the seed function to populate data in the database if its empty
//seed();

//default route to show all vehicles with customised field makeModel
app.get("/", async (req, res) => {
  try {
    const data = await Vehicle.findAll();

    //new code below to create array and populate it in the same line
    const updatedData = data.map((vehicle) => ({
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      makeModel: `${vehicle.make} ${vehicle.model}`,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    }));

    res.json(updatedData);
  } catch (error) {
    console.log(error);
  }
});

//all route to get all vehicles from the database
app.get("/all", async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();

    res.json(vehicles);
  } catch (error) {
    console.log(error);
  }
});

//route to delete a vehicle make by using the route as the variable
app.delete("/:vehicleMake", async (req, res) => {
  const vehicleMake = req.params.vehicleMake;
  try {
    const foundVehicle = await Vehicle.findOne({
      where: { make: vehicleMake },
    });
    console.log(foundVehicle);
    if (foundVehicle) {
      Vehicle.destroy({ where: { make: vehicleMake } });

      res.send("Vehicle Make " + vehicleMake + " deleted from database");
    } else {
      res.send("No Vehicle found with make: " + vehicleMake);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/:vehicleMake", async (req, res) => {
  const vehicleMake = req.params.vehicleMake;
  try {
    const foundVehicle = await Vehicle.findAll({
      where: { make: vehicleMake },
    });
    console.log(foundVehicle);
    if (foundVehicle) {
      res.json(foundVehicle);
    } else {
      res.send("No Vehicle found with make: " + vehicleMake);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/:vehicleMake/:vehicleModel", async (req, res) => {
  const vehicleMake = req.params.vehicleMake;
  const vehicleModel = req.params.vehicleModel;
  try {
    const newVehicle = await Vehicle.create({
      make: vehicleMake,
      model: vehicleModel,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log(newVehicle);
    
      res.send("New Vehicle Added to database. Make: " + vehicleMake + " & Model: " + vehicleModel);
    } 
   catch (error) {
    console.log(error);
    res.send(error);
  }
});
