
var User = require('../Schema/user');

exports.register = function(req,res){
  
  var user = User({
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "userid":req.body.userid,
    "password":req.body.password,
    "role":req.body.role
  });

  user.save(user, function (err, response){
    if (err) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    } else {
      console.log("Resonse ::: ", JSON.stringify(response));
      res.send({
        "success":"user registered sucessfully"
      });
    }
  });
}

exports.login = function(req,res){
  var userid= req.body.userid;
  User.findOne({userid: userid}, function(error, results){
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    } else {
      if(results.length > 0){
        if(results[0].password == req.body.password){
          if(results[0].role == req.body.role){
            res.send({
              "code":200,
              "success":"login sucessfull"
            })
          }
          else{
            res.send({
              "code":204,
              "success":"You have logged in from wrong user role"
            })
          }
        } else {
          res.send({
               "code":204,
               "success":"Email and password does not match"
          })
        }
      } else {
        res.send({
          "code":204,
          "success":"Email does not exits"
            });
      }
    }
  });
}
