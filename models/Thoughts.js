const {Schema,model,Types} = require('mongoose');
const moment = require('moment');

// reactions schema

const ReactionsSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody:{
            type: String,
            requred: true,
            maxlength:280
        },
        username:{
            type:String,
            requred:true
        },
        createdAt:{
            type: Date,
            default:Date.now,
            get:(createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')

        }

    },
    {

        toJSON:{
            getters:true
        }
    }
);
// thoughts Schema
const ThoughtsSchema = new Schema(
    {
        thoughtText :{
            type:String,
            requred:1,
            maxlength:280
        },
        createdAt:{
            type:Date,
            default:Date.now,
            get:(createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')

        },
        // use reactionsSchema to validate date
        reactions: [ReactionsSchema]
    },
    {
        toJSON:{
            virtuals: true,
            getters:true
        },
        id:false
    }
);

// get total count of reactions

ThoughtsSchema.virtuals('reactionCount').get(function(){
    return this.reactions.length;

});

// create the Thoghts model using the thoughrs schema
const Thoughts = model('Thoughts',ThoughtsSchema);

module.exporys = Thoughts;