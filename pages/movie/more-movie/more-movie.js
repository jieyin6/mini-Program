var app = getApp()
Page({
    data:{
        url:null,
        start:0,
        page:0,
        total:0,
        count:0,
        movies:[]
    },
    onLoad(options){
        var id = options.id
        switch(id){
            case '0' :
            this.setData({
                url : app.globalData.baseUrl +"/v2/movie/in_theaters"
            })
            break
            case '1':
            this.setData({
                url: app.globalData.baseUrl +"/v2/movie/top250"
            })
            break
            default:
            this.setData({
                url: app.globalData.baseUrl +"/v2/movie/coming_soon"
            })
        }
        this.requestData()
    },
    requestData(){
        var _this = this
        wx.request({
            url:_this.data.url,
            data: {
                "start": _this.data.start,
                "count":18
            },
            method: 'GET',
            header: {
                "Content-Type": ""
            },
            success(res){
                console.log(res.data)
                _this.setData({
                    total:res.data.total,
                    count:res.data.count,
                   
                })
                _this.data.page++
                _this.movieObj(res.data)
            }
        })
    },
    movieObj(data){
        var moviearr = data.subjects
        var newarr = []
        moviearr.forEach(item => {
            var title = item.title.length > 8 ? item.title.substr(0,8)+'...' :item.title
            var stars = parseInt(item.rating.stars.substr(0,1))
            var movieobj = {}
            movieobj['imgUrl'] = item.images.large
            movieobj['title'] = title
            movieobj['stars'] = stars
            newarr.push(movieobj)
        });
        var whole = this.data.movies.concat(newarr)
        this.setData({
            movies:whole
        })
        
    },
    update() {
        if(this.data.count + this.data.start == this.data.total){
            return
        }
        this.setData({
            start: this.data.page * 18 + 1
        })
        this.requestData()
    }
    
})