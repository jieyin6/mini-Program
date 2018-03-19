//logs.js
const util = require('../../utils/util.js')
var app = getApp()
Page({
  onLoad: function () {
    var Top250Movies = app.globalData.baseUrl +"/v2/movie/top250";
    var comingSoonUrl = app.globalData.baseUrl +"/v2/movie/coming_soon";
    var inThreaterUrl = app.globalData.baseUrl +"/v2/movie/in_theaters";
    this.getMovie(Top250Movies,'top250Movies','Top250')
    this.getMovie(comingSoonUrl,'comingSoonMovies','即将上映')
    this.getMovie(inThreaterUrl,'inThreater','正在上映')
  },
  getMovie(url,name,type){
    var _this = this
    wx.request({
      url:url,
      data: {
        "start": 0,
        "count": 3
      },
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success(res){
        console.log(res.data)
        _this.setMovie(res.data,name,type)
      }
    })
  },
  setMovie(data,name,type){
    let movieArr = data.subjects
    let movieData = {}
    movieData['Type'] = type
    let movies = []
    movieArr.forEach(item => {
        let movieObj = {}
        movieObj['imgUrl'] = item.images.large
        movieObj['title'] = item.title.length > 8 ? item.title.substr(0,8)+'...' :item.title
        movieObj['stars'] = parseInt(item.rating.stars.substr(0,1))
        movies.push(movieObj)
    });
    movieData['movies'] = movies
    console.log(movieData)
    if(name === 'top250Movies'){
      this.setData({
        topData:movieData
      })
    }else if(name === 'comingSoonMovies' ){
      this.setData({
        comingData:movieData
      })
    }else{
      this.setData({
        nowData:movieData
      })
    }
    
  }
})
