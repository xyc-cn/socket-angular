/**
 * Created by xieyicheng on 2014/12/9.
 */
var _ = require('underscore');
module.exports  = function(){
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var MessageSchema = new Schema({
        content: { type: String},
        account: { type: String},
        createAt:{type: Date, default: Date.now}
    });
    var Message = mongoose.model('Message', MessageSchema);

    var create = function(data,callback){
        var message = new Message({
            content:data.content,
            account:data.account
        });
        message.save(callback);
    };
    var getMessage = function(date,callback){
        Message.find({createAt:{$lt:date}},null,{sort:[['createAt', -1]],limit:10},function(err,doc){
            if(doc){
                var sort_doc = _.sortBy(doc, function(item){ return item.createAt; });
                callback(err,sort_doc);
            }
        })
    };
    return {
        Message:Message,
        create:create,
        getMessage:getMessage
    };
};
