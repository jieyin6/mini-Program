//logs.js
const util = require('../../utils/util.js')
var app = getApp()
Page({
  data:{
    inputValue:false,
    focus:false,
    value:''
  },
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
        var title = item.title.length > 8 ? item.title.substr(0,8)+'...' :item.title
        var stars = parseInt(item.rating.stars.substr(0,1))
        let movieObj = {}
        movieObj['imgUrl'] = item.images.large
        movieObj['title'] = title
        movieObj['stars'] = stars
        movieObj['id'] = item.id
        movies.push(movieObj)
    });
    movieData['movies'] = movies
    console.log(movieData)
    if(name === 'top250Movies'){
      movieData['id'] = 1
      this.setData({
        topData:movieData,
      })
    }else if(name === 'comingSoonMovies' ){
      movieData['id'] = 2
      this.setData({
        comingData:movieData,
      })
    }else{
      movieData['id'] = 0
      this.setData({
        nowData:movieData,
        })
    }
    
  },
  showMore(event){
    var id = event.currentTarget.dataset.testid
    wx.navigateTo({
        url:'./more-movie/more-movie?id='+id,
      })
  },
  bindfocus(event){
      this.setData({
        inputValue:true
      })
  },
  bindblur(event){
    if(event.detail.value){
      this.setData({
        inputValue:true,
        focus:false
      })
    }else{
      this.setData({
        inputValue:false,
        focus:false,
        searchResult:[]
      })
    }
  },
  search(event){
    var _this = this
    this.setData({
      inputValue:true
    })
    var url = app.globalData.baseUrl +"/v2/movie/search?q="+event.detail.value
    wx.request({
      url:url,
      method: 'GET',
      header: {
        "Content-Type": ""
      },
      success(res){
        console.log(res.data)
        _this.setResult(res.data)
      }
    })
  },
  setResult(data){
    var dataArr = data.subjects
    let movies = []
    dataArr.forEach(item => {
        var title = item.title.length > 8 ? item.title.substr(0,8)+'...' :item.title
        var stars = parseInt(item.rating.stars.substr(0,1))
        let movieObj = {}
        movieObj['imgUrl'] = item.images.large
        movieObj['title'] = title
        movieObj['stars'] = stars
        movies.push(movieObj)
    });
    this.setData({
      searchResult:movies
    })
  },
  clearValue(){
    this.setData({
      inputValue:false,
      focus:false,
      value:'',
      searchResult:[]
    })
  },
  bindinput(event){
    if(event.detail.value == ''){
      this.setData({
        inputValue:false
      })
    }
  },
  showMovie(event){
    console.log(event.currentTarget.dataset.setid)
    var id = event.currentTarget.dataset.setid
    wx.navigateTo({
      url:'./movie-detail/movie-detail?id='+id,
    })
  }
})
