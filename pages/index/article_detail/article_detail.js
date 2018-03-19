var postData = require("../../../data/posts-data")
Page({
    data:{
        postList:null,
        isplay:false,
        
    },
    onLoad:function(options){
        console.log(options)
        var pageid = options.id
        this.setData({
            postList:postData.postList[pageid]
        })
        this.setData({
            id:pageid
        })
        
        var coll = wx.getStorageSync('collection')
        console.log(coll)
        if(coll){
            if(coll[pageid]){
                var collections = coll[pageid]
            }else{
                coll[pageid] = false
                var collections = coll[pageid]
                wx.setStorageSync('collection',coll)
            }
            this.setData({
                collection:collections
            })
            
        }else{
            let collections = {}
            collections[pageid] = false
            wx.setStorageSync('collection',collections)
        }
        
    },
    collect:function(event){
        var collection = wx.getStorageSync('collection')
        var coll = !collection[this.data.id]
        if(collection){
           collection[this.data.id] = coll
        }
        this.openMode(collection,coll)
    },
    openMode:function(collection,coll){
        var _this = this
        wx.showModal({
            title:'收藏',
            content:coll?'确认收藏？':'取消收藏？',
            showCancel:true,
            cancelText:'取消',
            confirmText:'确认',
            cancelColor:'#eee',
            success(res){
                if(res.confirm){
                    wx.setStorageSync('collection',collection)
                    _this.openToast(coll)
                    _this.setData({
                      collection:coll
                  })
                }
            },
            
        })
    },
    openToast:function(coll){
        wx.showToast({
            title:coll?'收藏成功':'取消收藏成功',
            icon:'success'
        })
    },
    share:function(){
        wx.showActionSheet({
            itemList:['分享给朋友','分享到朋友圈','分享到微博'],
            itemColor:'#405f89',
            success(res){
                console.log(res.tapIndex)
            }
        })
    },
    playMusic:function(){
        if(this.data.isplay){
            wx.pauseBackgroundAudio()
            this.setData({
                isplay:false
            })
        }else{
            wx.playBackgroundAudio({
                dataUrl: this.data.postList.music.url,
                title: this.data.postList.music.title,
                coverImgUrl:this.data.postList.music.coverImg
            })
            this.setData({
                isplay:true
            })
            var _this = this
            wx.onBackgroundAudioPause(function(){
                _this.setData({
                    isplay:false
                })
            })
            wx.onBackgroundAudioStop(function(){
                _this.setData({
                    isplay:false
                })
            })
            wx.onBackgroundAudioPlay(function(){
                _this.setData({
                    isplay:true
                })
            })
        }
    },
    onUnload:function(){
        wx.stopBackgroundAudio()
    }
})