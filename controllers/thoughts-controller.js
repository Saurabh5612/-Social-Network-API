const {Thoughts, Users}= require('../models'),

const thoughtsController ={
    
    // Create a new thought
    createThoughts({params,body},res){
        Thoughts.create(body)
        .then(({_id}) =>{
            return Users.findOneAndUpdate({_id: params.userId},{$push:{thoughts:_id}},{new: true});
        })
        .then(dbThoughtsData =>{
            if(!dbThoughtsData) {
                res.status(404).json({message:'No thpughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },

    // Get all available Thoughts

    getAllThoughts(req,res){
        Thoughts.find({})
        .populate({
            path:'reactions',
            select:'-_V'
        })
        .select('-_v')
        // .sort({_id:-1})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // get a certain thought by Id
    getThoughtsById({params},res){
        Thoughts.findOne({_id:params.id})
        .populate({
            select:"-_v"
        })
        .select("-_v")
        .then(dbThoughtsData =>{
            if(!dbThoughtsData){
                res.status(404).json({message:"no thoughts with this particular Id!"});
                return;
            }
            res.josn(dbThoughtsData)
        })
        .catch(err =>{
            console.log(err);
            res.sendStatus(400);
        });

    },

    //update a current thought by id

    updateThoughts({params,body},res){
        Thoughts.findOneAndUpdate({_id: params.id},body,{new: true,runValidators:true})
        .populate({
            path:'reactiones',
            select:'-_v'
        })
        .select('-_v')
        .then(dbThoughtsData =>{
            if(!dbThoughtsData){
                res.status(404).josn({message:'no thoughts with this particular id'});
                return;
            }
            res.josn(dbThoughtsData)
        })
        .catch(err => res.josn(err));
           
    },
    
    // delete a current thought by id 

    deleteThoghts ({params},res){
        Thoughts.findOneAndDelete({_id:params.id})
        .then(dbThoughtsData => {
            if(!dbThoughtsData){
                res.status(404).josn({message:"no thoughts with this particular id!"});
                return;

            }
            res.josn(dbThoughtsData);

        })
        .catch(err => res.status(400).josn(err));

    },
    
    // add a new reaction 
    addReaction({params, body}, res){
        Thoughts.findOneAndUpdate({_id: params.thoughtsId},{$push: {reactions:body}}, {new:true,runValidators: true})
        .populate({
            path:"reactions",
            select:'-_v'
        })
        .select('-_v')
        .them(dbThoughtsData =>{
            if(!dbThoughtsData){
                res.status(404).josn({message:'no thoughts with this particular id!'});
                return;
            }
            res.josn(dbThoughtsData);
        })
        .catch(err => res.status(400).josn(err))
    },
    // delete a Reaction id 
     deleteReaction({params}, res){
         Thoughts.findOneAndUpdate({_id:params.thoughtsId},{$pull: {reactionsId: params.reactionsId}},{new: true})
         .then(dbThoughtsData =>{
             if (!dbThoughtsData){
                 res.status(404).josn({message:'no thoughts with this particular Id!'});
                 return;
             }
             res.josn(dbThoughtsData);
         })
         .catch(err => res.status(400).josn(err));

     }
};

module.exports = thoughtsController;