
const Users = require('../Models/Users');

exports.UserLogin = (req, res) => {

    const { username, password } = req.body;
    let isAuthenticated, message;

    Users.find({ username, password })

        .then(response => {
            if(response.length==0)
            {
                isAuthenticated=false;
                message='User not Authenticated';
            }
            else{
                isAuthenticated=true;
                message='User Authenticated';
            }
            res.status(200).json(
                {
                    isAuthenticated,
                    message,
                    users: response
                    
                })
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })


}
exports.userSignup = (req, res) =>{
    const {username, password, firstname, lastname} = req.body;

    let userObj = new Users({
        username, password, firstname, lastname
    });
    userObj.save()
    .then(response => {
        res.status(200).json(
            {
                message: " USer Signedup Succesfully",
                mealtypes: response

            })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}