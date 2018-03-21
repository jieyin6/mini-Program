var app = getApp()
Page({
    data:{
        objMovie:{}
    },
    onLoad(options){
        var _this = this
        var movieId = parseInt(options.id)
        var url = app.globalData.baseUrl+"/v2/movie/subject/" + movieId;
        wx.request({
            url:url,
            method: 'GET',
            header: {
              "Content-Type": ""
            },
            success(res){
              console.log(res.data)
              _this.setMovie(res.data)
            }
        })
    },
    setMovie(data){
        var typeArr = data.genres
        var type =  typeArr.reduce(function(pre,cur){
            return pre+'/'+cur
        });
        var castArr = []
        data.casts.forEach(element => {
            castArr.push(element.name)
        });
        
        var actor = castArr.reduce(function(pre,cur){
            return pre + '、'+cur
        })
        var directorArr = []
        data.directors.forEach(item =>{
            directorArr.push(item.name)
        })
        var director = directorArr.reduce(function(pre,cur){
            return pre + '、' +cur
        })
        var star = parseInt(data.rating.stars.substr(0,1))
        var movieObj = {}
        movieObj['title'] = data.title
        movieObj['countries'] = data.countries
        movieObj['year'] = data.year
        movieObj['images'] = data.images.large
        movieObj['genres'] = type
        movieObj['commentsCount'] = data.comments_count
        movieObj['casts'] = data.casts
        movieObj['average'] = data.rating.average
        movieObj['actor'] = actor
        movieObj['director'] = director
        movieObj['summary'] = data.summary
        movieObj['wishCount'] = data.wish_count
        this.setData({
            objMovie:movieObj,
            stars:star
        })
    }
})