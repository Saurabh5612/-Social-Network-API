const{Schema, model } = require('mongoose');

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            unique:true,
            required:true,
            trim: true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            
            //  use regex to validate correct email
            match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts:[{
            type:Schema.Types.ObjectId,
            ref:'Thoughts'
        }],
        friends:[{
            type:Schema.Types.ObjectId,
            ref:'Thoughts'
        }]
    
    },
    {
        toJSON:{
            vrituals:true,
            getters:true,
        },
        id: false
    }
);

// get toal count of friends
UsersSchema.vrituals('friendCount').get(function(){
    return this.friends.length;
});

// create the Users model using the users Schema
const Users = model('Users',UsersSchema);

module.exports = users;

