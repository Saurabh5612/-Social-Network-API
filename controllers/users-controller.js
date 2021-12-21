// require users model
const {users} = require('../models');

// set up users controller
const usersController = {
    
    // create a new user
    createUsers({body},res){
        users.create(body)
          .then(dbUserData => res.json(dbUsersData))
          .catch(err => res.status(400).json(err));
    
    },

    //get all users
    getAllUsers(req,res) {
        users.find({})
        // populate user friends
        .populate({
            path:'friends',
            select:'-_v'
        })
        .select('-_v')
        // .sort({_id:-1})
        .then(dbUsersData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // get single user by id
    getUserById({params},res){
        users.findOne({_id:params.id})
              .populate({
                  path:'thoughts',
                  select:'-_v'
              })
              .populate({
                  path:'friends',
                  select:'-_v'

              })
              .select('-_v')

              // return if no user is found
              .then(dbUserData =>{
                  if(!dbUserData){
                      res.status(404).json({message:'no user with this particular ID!'})
                      return;
                  }
                  res.json(dbUserData)
              })
              .catch(err => {
                  console.log(err);
                  res.status(400).json(err)
              })

              
    },

    // update a current user by Id 

    updateUsers({params,body},res){
        users.findOneAndUpdate({_id:params.id},body,{new: true, runValidators:true})
           .then(dbUserData =>{
               if(!dbUserData){
                   res.status(404).json({message:'No User with this particular Id!'});
                   return;
               }
               res.json(dbUserData);
           })
           .catch(err => res.json(err));
    },

    // delete a current friend 
    deleteFriend({params},res){
        users.findOneAndUpdate({_id:params.id},{$pull: {friends: params.friendsId}},{new: true})
        .populate({
            path:'friends',
            select:'-_v'
        })
        .select('-_v')
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({message:'No user with this particular ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = usersController;