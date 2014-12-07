var express = require('express');
var router = express.Router();
var UserModel = require('../Dao/user')();
/**
 * 注册账号
 * 参数account和password
 */
router.get('/register', function(req, res) {
  var account = req.query.account;
  var password = req.query.password;
  UserModel.register(account,password,function(err){
    if(!err){
      res.end(JSON.stringify({status:"success"}));
    }
    else{
      res.end(JSON.stringify({status:"fail"}));
    }
  });
});

router.get('/validate', function (req, res) {
    var user = req.session.user;
    if(user){
      res.end(JSON.stringify(user));
    }
    else{
      res.status(401).end("未登录");
    }

});
router.get('/logout', function (req, res) {
    var user = req.session.user;
    if(user){
        var account = user.account;
        req.session.user = null;
        UserModel.modify({account:account}, {status: 0}, function (err, doc) {
            if (doc != null) {
                res.status(200).end(JSON.stringify(doc));
            }
            else{
                res.end("错误");
            }
        });
    }
    else{
        res.end("错误");
    }

});
/**
 * 登陆
 */
router.post('/login', function(req, res) {
  var account = req.body.account;
  var password = req.body.password;

  UserModel.modify({account:account,password:password},{status:1},function(err,doc){
      if(err!=null){
      res.status(500).end(JSON.stringify(err));
    }
    else{
        if(doc){
          req.session.user = doc;
          res.end(JSON.stringify(doc));
        }
      else{
          res.status(401).end("密码错误");}
      }
  });
});

module.exports = router;
