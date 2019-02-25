/*定义一个函数*/
function Carousel($ct){
  this.init($ct);
  this.bind()
}

/*设置它的原型对象*/
Carousel.prototype = {
  init: function($ct){
    console.log(this)
    this.$ct = $ct;
    this.$imgCt = this.$ct.find('.img-ct')
    this.$imgLi = this.$ct.find('.img-ct li')
    this.$preBtn = this.$ct.find('.pre');
    this.$nextBtn = this.$ct.find('.next');
    this.$btnLi = this.$ct.find('.btn > li')

    this.$imgCt.prepend(this.$imgLi.last().clone())
    this.$imgCt.append(this.$imgLi.first().clone())
    this.imgCount = this.$imgLi.length
    this.imgWidth = this.$imgLi.width()
    this.$imgCt.width((this.imgCount + 2)*this.imgWidth)
    this.$imgCt.css('left',-this.imgWidth)

    this.index = 0;
  },
  bind: function(){
    var _this=this;
    /*添加前后两张图片*/

    this.$preBtn.on('click',function(){
      _this.playPre(1)
    })
    this.$nextBtn.on('click',function(){
      _this.playNext(1)
    })
    this.$btnLi.on('click',function(){
      index = $(this).index();
      console.log('点击的是第'+index +'个')
      var a = $(this).index()-_this.index
      if(a<0){
        _this.playPre(-a);
      }else{
        _this.playNext(a);
      }
    })
  },
  playPre: function(a){
    var _this = this;
    this.$imgCt.animate({
      left: "+="+ this.imgWidth*a +"px"
    },function(){
      _this.index-=a ;
      if(_this.index < 0){
        _this.$imgCt.css('left',-_this.imgWidth*_this.imgCount)
        _this.index = _this.imgCount-a;
      }
      console.log(_this.index)
      _this.setBullet()
    })
  },
  playNext: function(a){
    var _this = this;
    this.$imgCt.animate({
      left: '-=' + this.imgWidth*a +"px"
    },function(){
      _this.index+=a;
      if(_this.index === _this.imgCount){
        _this.$imgCt.css('left',-_this.imgWidth)
        _this.index = 0;
      }
      console.log(_this.index)
      _this.setBullet()
    })
  },
  setBullet: function(){
    this.$btnLi.eq(this.index).addClass('active').siblings().removeClass('active')

  }
}

new Carousel($('.container').eq(0))
new Carousel($('.container').eq(1))
new Carousel($('.container').eq(2))
