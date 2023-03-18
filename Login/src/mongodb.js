const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/TravelSwift');
  }
  

main().catch(err => console.log(err));
main().then(()=>{
    console.log("Mongodb connected")
})



// this to  create schema ( table in sql )
// their are two fields

const loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,                   
        required: true
    },
    email: {
        type: String,
        unique:true,                
        required: true
        
    },
    phone: {
        type: String,
        unique:true,                  
        required: true
        
    }

})

//create new collection 

const collection = new mongoose.model("Collection1", loginschema)
module.exports = collection