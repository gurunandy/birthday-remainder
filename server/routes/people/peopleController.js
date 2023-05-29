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
          console.log(result);
          people.find({
              $and : [
                {mobilenumber : req.body.mobile},
                {name : req.body.name}
              ]
            }).then(results => {
              // Handle results
              console.log("results",results)
              if(results.length === 0) {
                //add
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
                //already added
                res.json({ message: "Already added" });
              }
            })
            .catch(err => {
              // Handle error
              console.log("error",err)
              res.status(500).json({ message: "Internal server error" });
            });
        }
      }).catch((error) => {
        console.error(error);
      });
}

const getPeople = (req,res) => {
  let response = [];
  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
  
    let age = currentDate.getFullYear() - birthDate.getFullYear();
  
    // Check if the birthday hasn't occurred yet this year
    const hasBirthdayPassed = currentDate.getMonth() > birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate());
  
    if (!hasBirthdayPassed) {
      age--;
    }
  
    return age;
  };
  people.find().then(result => {
    result.map((data) =>{
      if((new Date().getMonth && new Date().getDate()) == (new Date(data.dob).getMonth && new Date(data.dob).getDate())) {
        response.push({
          name : data.name,
          mobilenumber : data.mobilenumber,
          age  : calculateAge(data.dob),
          image : "https://www.smileysapp.com/emojis/birthday-smiley.png"
        })
      }
      
    })
   
    
    console.log("result",result)
    res.send(response)
  }).catch(err => {
    console.log("error",err)
     res.status(500).json({ message: "Internal server error" });
  })
}

module.exports = {
    addPeople,
    getPeople
}