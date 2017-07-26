/*
1.点击加号出现输入框，输入内容后按确定或回车发送内容给后端，后端再返回模块到前端。
2.需要找一个好看的输入框，不太清楚需要图片还是代码。
4.调整好两条事项之间的行距，使其刚好在背景的格子里。√
5.限制一条事项的文字长度，防止文字出框。
  如果文字超过长度，弹出提示。
6.在事项左边添加勾选 api，如果不勾选就显示图片a，勾选就显示图片b，事件功能是勾选
  则将对应文字变成灰色。默认不勾选。需要复习todo课。√
7.鼠标移上事项会出现删除按钮，点击后可删除对应事项。√
8.翻页没有思路还需要想一想，可以改成多了之后页面就变长，但那样需要实现图片div，
  可以参考之前的css作业。
  创建五个 container 元素，设为不同的 id，在有新 todo 添加时，先判断分类 1 的长
  度，如果小于六就添加，如果大于六就判断下一个。
  给上一页、下一页按钮分别绑上事件，点击时将 show 移到下一个 container 元素上，
  container 默认为 none。√
*/
var log = function() {
    console.log.apply(console, arguments)
}

var findALL = function(element, selector) {
    return element.querySelectorAll(selector)
}

var findContainer = function() {
    for (var i = 1; i < 5; i++) {
        var c = '#id-div-container-'
        var container = e(c + i)
        var cl = findALL(container, '*').length
        if (cl < 30) {
            log('container', container)
            return container
        } else if (cl >= 30) {
            continue
        }
    }
}

var insertTodo = function(todo) {
    // 添加到 container 中
    var todoContainer = findContainer()
    var t = templateTodo(todo)
    // 这个方法用来添加元素
    // 第一个参数 'beforeend' 意思是放在最后
    todoContainer.insertAdjacentHTML('beforeend', t)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var es = function (sel) {
    return document.querySelectorAll(sel)
}

var toggleClass1 = function(class1, element1, element2) {
    // 事件已完成与未完成状态互换
    if (element1.classList.contains(class1)) {
        element1.classList.remove(class1)
        element2.classList.add(class1)
    } else {
        element2.classList.remove(class1)
        element1.classList.add(class1)
    }
}

// 创建一个 todos 数组用来保存所有的 todo
var todos = []

// 载入页面的时候  把已经有的 todo 加载到页面中
var loadTodos = function() {
    log('loadTodos 反序列化之前', todos)
    todos = JSON.parse(localStorage.simpletodos)
    log('loadTodos 反序列化之后', todos)
    for (var i = 0; i < todos.length; i++) {
        var t = todos[i]
        insertTodo(t)
    }
}

// 给 add button 绑定添加 todo 事件
var addButton = e('#id-button-add')
addButton.addEventListener('click', function(event){
    // 获得 input.value
    var todoInput = e('.form-control')
    var todo = todoInput.value
    // 把新添加的 todo 加入 todos 并且写入到 localStorage
    todos.push(todo)
    localStorage.simpletodos = JSON.stringify(todos)
    // 删除页面中所有的 todo 并重新把 所有的 todo
    // 添加到 container 中
    insertTodo(todo)
})

var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <img class='todo-state todo-undone show' src="todo/事件未完成.png">
            <img class='todo-state todo-done' src="todo/事件已完成.png">
            <span class='todo-content' >${todo}</span>
            <img class='todo-delete' src="todo/删除.png">
        </div>
    `
    return t
}

var todoContainer = e('body')

todoContainer.addEventListener('click', function(event){
    var target = event.target
    if(target.classList.contains('todo-state')) {
        log('done')
        // 给 todo div 开关一个状态 class
        var todoDiv = target.parentElement
        var undone = todoDiv.querySelector('.todo-undone')
        var done = todoDiv.querySelector('.todo-done')
        // toggleClass(todoDiv, 'done')
        toggleClass1('show', undone, done)
    } else if (target.classList.contains('todo-delete')) {
        log('delete')
        // 从 todos 数组中删掉这个元素并保存到 localStorage
        // 得到当前按钮的父元素 todo-cell 在
        // id-div-container 中的下标
        var button = event.target
        var cell = button.parentElement
        var cells = cell.parentElement.children
        log('delete', cell, cells)
        var index = 0
        for (var i = 0; i < cells.length; i++) {
            var c = cells[i]
            if (c == cell) {
                index = i
                break
            }
        }
        log('点击的 todo 下标', index)
        // 在 todos 数组中删除这个下标的元素
        // 并且写入到 localStorage
        // splice 函数可以删除数组特定下标的元素
        // splice 的第二个参数表示删除几个
        todos.splice(index, 1)
        localStorage.simpletodos = JSON.stringify(todos)
        // 删除 todo-cell
        var todoDiv = target.parentElement
        todoDiv.remove()
    }
})

var prev = e('.todo-prev')
prev.addEventListener('click', function(event){
    log('上一页')
    for (var i = 1; i < 6; i++) {
        var c = '#id-div-container-'
        var container = e(c + i)
        var index = i - 1
        if (container.classList.contains('show')) {
            container.classList.remove('show')
            if (index == 0){
                index = 1
            }
            var prevContainer = e(c + index)
            prevContainer.classList.add('show')
            break
        } else {
            continue
        }
    }
})

var next = e('.todo-next')
next.addEventListener('click', function(event){
    log('下一页')
    for (var i = 1; i < 6; i++) {
        var c = '#id-div-container-'
        var container = e(c + i)
        var n = i + 1
        if (container.classList.contains('show')) {
            container.classList.remove('show')
            if (n == 6){
                n = 5
            }
            var nextContainer = e(c + n)
            nextContainer.classList.add('show')
            break
        } else {
            continue
        }
    }
})

loadTodos()
