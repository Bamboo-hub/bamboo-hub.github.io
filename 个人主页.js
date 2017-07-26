var log = function () {
    console.log.apply(console, arguments)
}

// 选择元素
var e = function (sel) {
    return document.querySelector(sel)
}
// es 返回一个数组, 包含所有被选中的元素
var es = function (sel) {
    return document.querySelectorAll(sel)
}

// 给多个class绑定事件
var bindAll = function (elements, eventName, callback) {
    for (var i = 0; i < elements.length; i++) {
        var tag = elements[i]
        tag.addEventListener(eventName, callback)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

// 插入子元素到末尾
var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

// 切换一个元素的 class
var toggleClass3 = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

// 默认打开辅助线， “ctrl + m” 开关辅助线
var xkXian = function () {
    var body = document.querySelector('body');
    var style = '<style id="xm" media="screen">* {outline: 1px red dashed!important;} </style>'
    var i = true;
    body.insertAdjacentHTML('afterbegin', style);
    body.addEventListener('keydown', function (event) {
        if (event.keyCode === 77 && event.ctrlKey) {
            if (i) {
                var styletog = document.querySelector('#xm')
                styletog.remove()
                i = false
            } else {
                i = true
                body.insertAdjacentHTML('afterbegin', style);
            }
        }
    })
}
// xkXian()

var bs = es('.fa-clock-o')
bindAll(bs, 'click', function(event){
    log('69')
    var self = event.target
    var block = self.closest('.toggle-block')
    var clock = block.querySelector('.toggle-content')
    toggleClass3(clock, 'active')
})

var bindEventSlide = function() {
    var selector = es('.slide-button')
    bindAll(selector, 'click', function(event){
        // 找到按钮
        var button = event.target
        // 求出下一个 index
        var index = nextIndex(button)
        // 切换到下一张图片和下一个小圆点
        showImage(index)
        // log('show before', index)
        showIndicator(index)
    })
}

var 定时播放 = function(){
    // 组合选择器
    var button = e('.slide-button.right')
    setInterval(function(){
        // 调用 click() 函数来模拟点击
        button.click()
    }, 3000)
}

var nextIndex = function(button) {
    // 找到 slide div
    var slide = button.parentElement
    // 得到图片总数和当前图片下标
    // parseInt 是一个把字符串转为数字的库函数
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)
    // log('click slide', )
    // 求出下一张图片的 id
    var offset = parseInt(button.dataset.next)
    var index = (numberOfImgs + activeIndex + offset) % numberOfImgs
    // 设置父节点的 data-active
    slide.dataset.active = index
    return index
}

var showImage = function(index) {
    // 得到下一张图片的选择器
    var nextSelector = '#id-image-' + String(index)
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'active'
    removeClassAll(className)
    var img = e(nextSelector)
    img.classList.add(className)
}

var showIndicator = function(index) {
    // log('show indi', index)
    // 得到下一个小圆点的选择器
    var nextSelector = '#id-indi-' + String(index)
    // 删除当前小圆点的 class 给下一个小圆点加上 class
    var className = 'white'
    removeClassAll(className)
    var indi = e(nextSelector)
    indi.classList.add(className)
}

var bindEventSlide1 = function() {
    var selector = es('.slide-indi')
    bindAll(selector, 'click', function(event){
        console.log('click 小圆点')
        var button = event.target
        var xwbc = button.dataset.index
        var className = 'active'
        removeClassAll(className)
        var img = '#id-image-' + String(xwbc)
        var img1 = e(img)
        // log(xwbc,className,img,img1,'80')
        img1.classList.add(className)
        showIndicator(xwbc)
    })
}

var bindEventSlide2 = function() {
    var selector = es('.slide-button2')
    bindAll(selector, 'click', function(event){
        // 找到按钮
        var button = event.target
        // 求出下一个 index
        var index = nextIndex2(button)
        // 切换到下一张图片和下一个小圆点
        showImage2(index)
        // log('show before', index)
    })
}

var 定时播放2 = function(){
    // 组合选择器
    var button = e('.slide-button2.fa-angle-right')
    setInterval(function(){
        // 调用 click() 函数来模拟点击
        button.click()
    }, 3000)
}

var nextIndex2 = function(button) {
    // 找到 slide div
    var slide = button.parentElement
    // 得到图片总数和当前图片下标
    // parseInt 是一个把字符串转为数字的库函数
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)
    // log('click slide', )
    // 求出下一张图片的 id
    var offset = parseInt(button.dataset.next)
    var index = (numberOfImgs + activeIndex + offset) % numberOfImgs
    // 设置父节点的 data-active
    slide.dataset.active = index
    return index
}

var showImage2 = function(index) {
    // 得到下一张图片的选择器
    var nextSelector = '#id-image2-' + String(index)
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'active2'
    removeClassAll(className)
    var img = e(nextSelector)
    img.classList.add(className)
}

bindEventSlide()
bindEventSlide1()
bindEventSlide2()
定时播放()
定时播放2()
