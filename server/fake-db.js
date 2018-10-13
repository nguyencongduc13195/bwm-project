const Rental = require('./models/rental');
class FakeDB{
  constructor(){
    this.rentals = [
      {
        title: 'Central Apartment 3',
        city: 'Bratislava',
        street: 'Hlavna',
        category: 'apartment',
        image: 'https://via.placeholder.com/320x250',
        description: 'Very nice',
        bedrooms:2,
        dailyRate:334,
        shared: true,
      },
      {
        title: 'Nice view on ocean',
        city: 'San Francisco',
        street: 'Main street',
        category: 'condo',
        image: 'https://via.placeholder.com/320x250',
        description: 'Very nice',
        bedrooms: 4,
        dailyRate: 43,
        shared: true,
      }
    ]
  }
  async cleanDB(){
    await Rental.deleteMany({});
  }
  pushDb(){
    this.rentals.forEach(rental=>{
      const newRental = new Rental(rental);
      newRental.save();
    });
  }
  seedDb(){
    this.cleanDB();
    this.pushDb();
  }
}

module.exports = FakeDB;
