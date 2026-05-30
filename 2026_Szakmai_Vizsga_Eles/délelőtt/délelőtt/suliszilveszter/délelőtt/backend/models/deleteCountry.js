const deleteCountry = require('./models/Country');

async function deleteNonExisting() {
  try 
  {
    const result = await Country.deleteOne({ nev: 'Non existing country' });

    if (result.deletedCount > 0) {
      console.log('A "Non existing country" nevezetű orszaf sikeresen törölve.');
    } 

    else {
      console.log('Nem található ilyen nevű ország.');
    }

  } catch (error) {
    console.error('Sikertelen törlés!:', error);
  }
};

deleteNonExisting();

module.exports = deleteCountry;