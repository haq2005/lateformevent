let community = require('../Scehma/community');
const { default: mongoose } = require('mongoose');

exports.getCommunities = async(req,res)=>{
    console.log(req.body.email)
    let communities = await community.find({members:{ $nin: [req.body.email] }})
   
    res.status(200).send(communities)

}

exports.joinCommunity = async(req,res)=>{

    if(!req.body.id){
        res.status(400).send("Community id is improper")
            }else{
                let isThere = await community.findOne({_id:req.body.id,members:req.body.email})
               if(!isThere){
                await community.updateOne({_id:req.body.id},{$push:{members:req.body.email}})
                res.status(200).send("Now you joined in this Community")
               }else{
                res.status(200).send("you already exist in this group")
               }
            }


 
}

exports.getMsgCommunities = async(req,res)=>{
    console.log(req.body.email)
    let communities = await community.find({members:req.body.email})
    console.log(communities)
    res.status(200).send(communities)
}
exports.leaveCommunity = async(req,res)=>{
    if(!req.body.id){
        res.status(400).send("Community id is improper")
            }else{
                let isThere = await community.findOne({_id:req.body.id,members:req.body.email})
               if(!isThere){
                res.status(200).send("you are not in the group") 
               }else{
                await community.updateOne({_id:req.body.id},{$pull:{members:req.body.email}})
                res.status(200).send("Now you leaved in this community")
        
               }
            }
}
exports.isJoinCommunity = async(req,res)=>{
    let isObjectId = mongoose.isValidObjectId(req.body.id)
if(isObjectId){
    let isThere = await community.findOne({_id:req.body.id,members:req.body.email});
    if(!isThere){
        res.status(400).send({
            state:false,
            msg:"Join this community for send message"
        })
    }else{
        res.status(200).send(isThere.messages)
    }
} else{
    res.status(400).send("there is no community on your mention")
}

}