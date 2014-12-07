/**
 * Created by xieyicheng on 2014/11/14.
 */
module.exports  = function(){
    var crypto = require('crypto');
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
        name: { type: String},
        account: { type: String,unique:true},
        password: { type: String },
        email: { type: String},
        phone:{type:String},
        photoUrl:{type:String},
        type:{type:String},
        status:{type:Number}
    });
    var User = mongoose.model('User', UserSchema);

    var register = function(account,password,callback){
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        var user = new User({
            account:account,
            password:shaSum.digest('hex')
        });
        user.save(callback);
    };

    var login = function(data,callback){
        var shaSum = crypto.createHash('sha256');
        shaSum.update(data.password);
        User.findOne({account:data.account,password:shaSum.digest('hex')},{account:1},function(err,doc){
            callback(err,doc);
        });
    };

    var changePassword = function(account, newpassword) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(newpassword);
        var hashedPassword = shaSum.digest('hex');
        User.update({account:account}, {$set: {password:hashedPassword}},{upsert:false},
            function changePasswordCallback(err) {
                console.log('Change password done for account ' + accountId);
            });
    };

    var findByString = function(searchStr, callback) {
        var searchRegex = new RegExp(searchStr, 'i');
        User.find({
            $or: [
                { name: { $regex: searchRegex } },
                { account: { $regex: searchRegex } }
            ]
        },{password:false}, function(err,doc){
            callback(err,doc);
        });
    };
    var modify = function (data,update,callback) {
        var shaSum = crypto.createHash('sha256');
        if(data.password!=null) {
            shaSum.update(data.password);
            User.findOneAndUpdate({
                account: data.account,
                password: shaSum.digest('hex')
            }, update, {}, function (err, doc) {
                callback(err, doc);
            });
        }
        else{
            User.findOneAndUpdate({
                account: data.account
            }, update, {}, function (err, doc) {
                callback(err, doc);
            });
        }
    };

    return {
        findByString:findByString,
        changePassword:changePassword,
        register:register,
        login:login,
        modify:modify,
        User:User
    };
};
