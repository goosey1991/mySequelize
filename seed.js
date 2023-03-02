const Vehicle = require("./vehicleModel");

const seed = async () => {
    try {
    const sync = await Vehicle.sync();
    const count = await Vehicle.count();
    console.log(count);
   if (count === 0) {
  console.log("Table has 0 records, creating records"); 
  const myNewCar = Vehicle.create(
     {make: 'Ford', model:'Fiesta'}
  );
  const myNewCarTwo = Vehicle.create(
    {make: 'Vauxhall', model:'Corsa'}
  )} else {
    console.log("Table has at least one record, no action required.");
  }
  } 
    catch (error) {
      console.log(error);
    }
  }
  
  module.exports = seed;