const mongoose = require('mongoose');
const db = 'mongodb://ZiJian:123abc@ds027761.mlab.com:27761/zj_assignment';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  my_id: { type: Number },
  name: { type: String },
  gender: { type: String },
  culture: { type: String },
  born: { type: String },
  aliases: { type: String },
  father: { type: String },
  mother: { type: String },
  spouse: { type: String },
  pic_address: { type: String }
});

const Character = mongoose.model('Character', schema, 'All_List');

module.exports = Character;
