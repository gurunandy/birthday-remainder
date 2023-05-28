const people = require('./peopleSchema')

const addPeople = (req,res) => {
    // console.log("req,body",req.body)
    const obj = {
        name : req.body.name,
        dob : req.body.dob,
        image : req.body.image,
        mobilenumber : req.body.mobile
    };
    const newPeople = new people(obj);
    people.find({ mobilenumber: req.body.mobile }).then((result) => {
        console.log(result, result.length === 0);
      
        if (result.length === 0) {
          console.log("to save");
          newPeople
            .save()
            .then(() => {
              res.status(200).json({ message: "Successfully added" });
            })
            .catch((err) => {
              console.log("error in saving person");
              res.status(500).json({ message: "Internal server error" });
            });
        } else {
          let isAlreadyAdded = false;
          console.log(result);
      
          result.forEach((obj, index) => {
            console.log(obj.name);
      
            if (req.body.name !== obj.name) {
              newPeople
                .save()
                .then(() => {
                  if (index === result.length - 1 && !isAlreadyAdded) {
                    console.log("added successfully");
                    res.status(200).json({ message: "Successfully added" });
                  }
                })
                .catch((err) => {
                  console.log("error in saving person");
                  res.status(500).json({ message: "Internal server error" });
                });
            } else {
              console.log("added already");
              isAlreadyAdded = true;
              if (index === result.length - 1 && isAlreadyAdded) {
                console.log("already added");
                res.json({ message: "Already added" });
              }
            }
          });
        }
      }).catch((error) => {
        console.error(error);
      });
      
    

}

module.exports = {
    addPeople
}