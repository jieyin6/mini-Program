//index.js
//获取应用实例

var postData = require("../../data/posts-data")
Page({
    data:{
        postList:[]
    },
    onLoad:function(){
        this.setData({
            postList:postData.postList
        })
    },
    openArticle:function(event){
        var postId = event.currentTarget.dataset.postid
        console.log(postId)
        wx.navigateTo({
            url:"./article_detail/article_detail?id="+postId,
            fail:function(err){
                console.log(err)
            }
        })
    },
    moveToArticle:function(event){
        var postId = event.target.dataset.postid
        wx.navigateTo({
            url:"./article_detail/article_detail?id="+postId,
            fail:function(err){
                console.log(err)
            }
        })
    }
})