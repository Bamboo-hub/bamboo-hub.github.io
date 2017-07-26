/*
目标是三天写完这个项目，所以每天至少完成三项，并且后面的难度会更大一些。
1.用es选择全部radio-music，得到长度并赋值给变量。√
2.上一首，a.src-1，如果src等于一则返回最后一首。√
3.下一首，a.src+1，如果src等于最后一首则返回1。√
4.将播放按钮的功能转为如果播放则暂停，如果暂停则播放。可以用if和之前写过的开始
  暂停函数实现。还需要更换不同的css。
  参考第九课板书例子4的toggleClass函数。√
5.实现进度条动画，用两个叠加的圆角div。√
6.还缺少的素材：暂停、单曲循环、顺序播放。√
7.按钮位置等css杂项。√
8.音量可以试试audio.volume。使用git库实现滚动条控制音量。√
9.循环播放，随机播放，单曲循环只启用一种。√
10.歌曲名与歌手名实时变化（可放弃）
*/
var log = function () {
    console.log.apply(console, arguments)
}

var e = function (sel) {
    return document.querySelector(sel)
}

var es = function (sel) {
    return document.querySelectorAll(sel)
}

var bindAll = function (elements, eventName, callback) {
    for (var i = 0; i < elements.length; i++) {
        var tag = elements[i]
        tag.addEventListener(eventName, callback)
    }
}

var toggleClass = function(class1, element1, element2) {
    // 播放与暂停的 class 切换
    if (element1.classList.contains(class1)) {
        element1.classList.remove(class1)
        element2.classList.add(class1)
    } else {
        element2.classList.remove(class1)
        element1.classList.add(class1)
    }
}

var toggleClass2 = function(class1, element1, element2, element3) {
    // 播放模式的 class 切换
    if (element1.classList.contains(class1)) {
        element1.classList.remove(class1)
        element2.classList.add(class1)
    } else if (element2.classList.contains(class1)) {
        element2.classList.remove(class1)
        element3.classList.add(class1)
    } else {
        element3.classList.remove(class1)
        element1.classList.add(class1)
    }
}

var a = e('#id-audio-player')
var m = [
    'music/1.mp3',
    'music/2.mp3',
    'music/3.mp3',
    'music/4.mp3',
    'music/5.mp3',
    'music/6.mp3',
]
var play = function() {
    var b = e('.play')
    b.addEventListener('click', function(event){
        log('click 播放')
        a.play()
    })
}

var pause = function() {
    var b = e('.pause')
    b.addEventListener('click', function(event){
        log('click 暂停')
        a.pause()
    })
}

var ps = es('.button')

bindAll(ps, 'click', function(event){
    var play = e('.play')
    var pause = e('.pause')
    toggleClass('show', play, pause)
})

var last = function() {
    var b = e('.last')
    b.addEventListener('click', function(event){
        log('click 上一首')
        if(a.dataset.path == 1){
            a.src = `music/${m.length}.mp3`
            a.dataset.path = s
        } else {
            var number = parseInt(a.dataset.path)
            a.src = `music/${number - 1}.mp3`
            a.dataset.path = number - 1
        }
        a.play()
    })
}

var next = function() {
    var b = e('.next')
    b.addEventListener('click', function(event){
        log('click 下一首')
        if(a.dataset.path == m.length){
            a.src = 'music/1.mp3'
            a.dataset.path = 1
            log('click 下一首2', m)
        } else {
            var number = parseInt(a.dataset.path)
            a.src = `music/${number + 1}.mp3`
            a.dataset.path = number + 1
            log('click 下一首3', m)
        }
        a.play()
    })
}

var replace = function() {

    var name = [
        'The Last Srting',
        '榣山遗韵',
        '没什么大不了（なんでもないや）（女声翻唱remix）',
        '时光笔墨',
        'Peace Of Mind',
        '鳥の詩 (short version)',
    ]
    var singer = [
        'Jacoo',
        '骆集益',
        'Maxone/夏璃夜',
        '张碧晨',
        'Jacoo',
        'Lia',
    ]

    var n = e('.music-name')
    var s = e('.singer')
    // 设置一个监听 每秒监测正在播放的歌曲是哪一首
    setInterval(function(){
        var index = a.dataset.path - 1
        n.innerHTML = name[index]
        s.innerHTML = singer[index]
    }, 1000)
}

var currentTime1 = function() {
    var b = e('.currentTime')
    // 将 b 的宽度设置为数字 0
    b.style.width = parseInt(0)
    a.addEventListener('canplay', function(event){
        setInterval(function(){
            // 比值相等
            var p = Math.round(a.currentTime * 100 / a.duration)
            // log('进度条动画', a.duration, a.currentTime, p)
            b.style.width = parseInt(p) + "%"
        }, 1000)
    })
}

var cycleOne = function() {
    log('单曲循环')
    a.currentTime = 0
}

var cycleMusic = function(i) {
    // 这段调用时有个问题导致一直不成功，暂时还没想明白所以没有使用这个函数。
    log('循环播放', m)
    a.currentTime = 0
    a.src = m[i]
    i = (i + 1) % m.length
    log(i, m, (i + 1) % m.length)
}

var shuffle = function(array) {
    // 随机返回数组中的一个元素
    i = Math.floor(Math.random() * m.length)
    return i
}

var randomMusic = function() {
    log('随机播放')
    a.currentTime = 0
    var j = shuffle()
    log(j)
    a.src = m[j]
}

var dafault = function() {
    // 默认播放模式
    var randomMusic1 = e('.randomMusic')
    a.addEventListener('ended', function(event){
        if(randomMusic1.classList.contains('show')) {
            randomMusic()
        }
        a.addEventListener('canplay', function(event){
            a.play()
        })
    })
}

var ps1 = es('.pattern')

bindAll(ps1, 'click', function(event){
    // 绑定切换 class 的事件
    var randomMusic1 = e('.randomMusic')
    var cycleMusic1 = e('.cycleMusic')
    var cycleOne1 = e('.cycleOne')
    var show = e('.show')
    toggleClass2('show', randomMusic1, cycleMusic1, cycleOne1)
})

bindAll(ps1, 'click', function(event){
    // 实现切换播放模式的功能
    var randomMusic1 = e('.randomMusic')
    var cycleMusic1 = e('.cycleMusic')
    var cycleOne1 = e('.cycleOne')
    var i = 1
    a.addEventListener('ended', function(event){
        if(randomMusic1.classList.contains('show')) {
            randomMusic()
        } else if(cycleMusic1.classList.contains('show')) {
            // 这段使用 cycleMusic 函数有点小问题，所以直接将函数内容粘贴在了这里，
            // 不影响播放器功能。
            log('循环播放', m)
            a.currentTime = 0
            a.src = m[i]
            i = (i + 1) % m.length
            log(i, m, (i + 1) % m.length)
        } else if(cycleOne1.classList.contains('show')) {
            cycleOne()
        }
    })
    a.addEventListener('canplay', function(event){
        a.play()
    })
})

var __main = function() {
    play()
    pause()
    last()
    next()
    currentTime1()
    dafault()
    replace()
}
__main()
