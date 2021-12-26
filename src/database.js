const mongoose = require("mongoose");

//mongoose.connect('mongodb://localhost/finterest', {
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true
})
	.then(db => console.log("DB is connected"))
	.catch(error => console.log(error));
