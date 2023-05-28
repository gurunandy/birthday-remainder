const mongoose = require("mongoose");

const mongoose_connection = () => {
    const mongoURL = "mongodb://127.0.0.1:27017/mydb";
    mongoose.connect(mongoURL);
mongoose.connection.on('connected', function () {
    console.log('mongoose is now connected to ', mongoURL);


    mongoose.connection.on('error', function (err) {
      console.error('error in mongoose connection: ', err);
    });

    mongoose.connection.on('disconnected', function () {
      console.log('mongoose is now disconnected.');
    });

    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        console.log(
          'mongoose disconnected on process termination'
          );
        process.exit(0);
      });
    });
  });

}

module.exports =  mongoose_connection;