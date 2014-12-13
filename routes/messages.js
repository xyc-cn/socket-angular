/**
 * Created by xieyicheng on 2014/12/9.
 */
var express = require('express');
var router = express.Router();
var MessageModel = require('../Dao/message')();
/**
 * 获取更多聊天记录
 */
router.post('/getMessage', function(req, res) {
    var date = req.body.date;
    var belong = req.body.belong;
    if(!date){
        res.end('err');
        return;
    }
    MessageModel.getMessage(date,belong,function(err,doc){
        if(doc!=null){
            res.status(200).end(JSON.stringify(doc));
        }
        else{
            res.end('err');
        }
    })
});

module.exports = router;
