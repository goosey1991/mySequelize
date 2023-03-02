const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Vehicle = require("./vehicleModel");
const seed = require("./seed");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//defining the port number for the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000 or heroku port");
});

seed()
//create a new vehicle
// const myNewCar = Vehicle.create(
//    {make: 'Seat', model:'Ibiza'}
// );
// const myNewCarTwo = Vehicle.create(
//   {make: 'Renault', model:'Clio'}
// );

// const tableCount = async () => {
//   try {
//   const count = await Vehicle.count();
//   console.log(count);
//  if (count === 1) {
// console.log("Table has one record, creating records"); 
// const myNewCar = Vehicle.create(
//    {make: 'Ford', model:'Fiesta'}
// );
// const myNewCarTwo = Vehicle.create(
//   {make: 'Vauxhall', model:'Corsa'}
// )} else {
//   console.log("Table has more than one record, no action required.");
// }
// } 
//   catch (error) {
//     console.log(error);
//   }
// }


//tweaking the response from the db to include a new field in response
// called makeModel

app.get("/", async (req, res) => {
  try {
    const data = await Vehicle.findAll();
    const updatedData = [];
    updatedData.push(
      ...data.map(vehicle => ({
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        makeModel: [vehicle.make, vehicle.model].join("-"),
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt,
      }))
    );
    res.json(updatedData);
  } catch (error) {
    console.log(error);
  }
});
//without async/await
/*app.get("/", (req, res) => {
  const vehicles = Vehicle.findAll().then((data) => {
      // create an empty array
      const updatedData = []

      //adds into the new array the results of the data.map function
    updatedData.push(data.map((vehicle) => ({
      id : vehicle.id,
      make : vehicle.make,
      model : vehicle.model,
      makeModel : [vehicle.make,vehicle.model].join("-"),
      createdAt : vehicle.createdAt,
      updatedAt : vehicle.updatedAt
    }

  )))
    //sends the updated array back to the client
      res.send(updatedData);
  });
});*/

//generic route to get all vehicles from the database

app.get("/all", async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();

    res.json(vehicles);
  } catch (error) {
    console.log(error);
  }
});

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
