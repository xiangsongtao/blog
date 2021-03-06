---
title: 事件模型
author: 烈风裘
date: 2016-10-23T11:06:06.000Z
draft: false
comments: true
star: false
cover: ''
tags: 
  - DOM
---

## DOM 事件流

分为三个阶段：事件捕获阶段、目标阶段、事件冒泡阶段。

事件捕获老版本浏览器（IE<=8）不支持，但是事件冒泡可以放心使用。

![12](http://xiangsongtao.com/uploads/1477529052000.jpeg)

## 事件处理程序

> 一共四类写法，基本都见过，看下写法就知道怎么回事儿了。

### 1. HTML 事件处理程序

```
<input type="button" value="Click me" onclick="ShowMessage()"/>
```

### 2. DOM0 级事件处理程序

```
var btn = document.getElementById("myBtn");
btn.onclick = function(){
	alert("click!");
	alert(this.id);//this指向myBtn，可继续获取myBtn的其余属性
}
```

### 3. DOM2 级事件处理程序

定义事件及删除事件的两个方法：addEventListener、removeEventListener。

```
var btn = document.getElementById("myBtn");
btn.addEventListener("click",function(){
	alert(this.id);
},false);
```

第三个参数：true，表示在捕获阶段触发；false，表示程序在冒泡阶段触发；

removeEventListener()的第二个参数必须传入与 addEventListener()中相同的处理函数(传入相同的函数引用，而不是形同函数！)，否则不会生效。

```
var handler = function handler(){
	alert(this.id);
}
btn.addEventListener("click", handler, false);
btn.removeEventListener("click", handler, false);
```

### 4. IE 事件处理函数

> IE 就是这么另类（IE8 及更早版本）

定义事件及删除事件的两个方法：attachEvent、detachEvent。因为只支持冒泡，故第三个参数没有；且第一个参数需要带上**“on”**！

```
var handler = function handler(){
	alert(this.id);
}
btn.attachEvent("onclick", handler);
btn.detachEvent("onclick", handler);
```

## 事件对象

事件触发会在 handler 中传入事件对象 event。

### 1. DOM 中的事件对象

event 的成员属性及说明如下，以下属性皆为只读：

|         属性/方法          |                          说明                          |                示例                 |
| :------------------------: | :----------------------------------------------------: | :---------------------------------: |
|           bubble           |                    表示事件是否冒泡                    |     event.bubble -> true/false      |
|         cancelable         |               是否可以取消事件的默认行为               |   event.cancelable -> true/false    |
|       currentTarget        | 事件函数正在处理事件的那个元素，比如委托 document 处理 |                                     |
|      defaultPrevented      |       为 true 则表示已经调用了 preventDefault()        |                                     |
|         eventPhase         |      事件处理阶段，1 捕获阶段，2 目标，3 冒泡阶段      |       event.eventPhase === 1        |
|      preventDefault()      |                      取消默认行为                      |      event. preventDefault();       |
|     stopPropagation()      |                 取消进一步冒泡捕获行为                 |      event.stopPropagation();       |
| stopImmediatePropagation() |  取消进一步冒泡捕获行为,并阻止任何事件处理程序被调用   |  event.stopImmediatePropagation();  |
|           target           |                        设计目标                        | event.target === getElementById(id) |
|            type            |                     触发事件的类型                     |       event.type === 'click'        |

### 2. IE 中事件对象

因为 IE 中没有捕获，故简单了些。**注意对比两个表的区别！**

|  属性/方法   |          说明          |                    示例                    |
| :----------: | :--------------------: | :----------------------------------------: |
| returnValue  |      取消默认行为      | event. returnValue = false; //取消默认行为 |
| cancelBubble | 取消进一步冒泡捕获行为 |    event.cancelBubble = true;//取消冒泡    |
|  srcElement  |        设计目标        |  event.srcElement === getElementById(id)   |
|     type     |     触发事件的类型     |           event.type === 'click'           |

### 3. 跨浏览器兼容方案

为了保证大多数浏览器的兼容，故只需要考虑冒泡阶段的实现。上面说的很清楚了，这里直接上代码。

```
var EventUtil = {
    // 绑定事件
    addHandler: function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    // 解绑事件
    removeHandler: function removeHandler(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    // 获取事件对象event
    getEvent: function getEvent(event) {
        return event || window.event;
    },
    // 获取触发目标
    getTarget: function getTarget(event) {
        return event.target || event.srcElement;
    },
    // 阻止默认行为
    preventDefault: function preventDefault(event) {
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false;
        }
    },
    // 取消冒泡
    stopPropagation: function stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true;
        }
    }
}
```

## 事件的代理/委托的原理以及优缺点

这是靠事件的冒泡机制来实现的，优点是

> 1、可以大量节省内存占用，减少事件注册，比如在 table 上代理所有 td 的 click 事件就非常棒
> 2、可以实现当新增子对象时无需再次对其绑定事件，对于动态内容部分尤为合适

## 手写原生 js【实现事件代理】，并要求兼容浏览器

考核对事件对象 event 的了解程度，以及在 IE 下对应的属性名。其实此时如果你说就是用`target/currentTarget`，以及 IE 下的`srcElement/this`，基本就可以略过了

绑到按钮上：

```
var btn = document.getElementById("myBtn");
btn.addEventListener("click",function(){
	console.log(event.currentTarget === this);//true
	console.log(event.target === this);//true
},false);
```

绑到 document 上：

```
var btn = document.getElementById("myBtn");
document.body.onclick = function(){
	console.log(event.currentTarget === this );//true
	console.log(document.body === this );//true
	console.log(event.target === btn);//true
}
```

## 实现事件模型

一个 bind 一个 trigger，分别实现绑定事件和触发事件，核心需求就是可以对某一个事件名称绑定多个事件响应函数，然后触发这个事件名称时，依次按绑定顺序触发相应的响应函数。

大致实现思路就是创建一个类或是匿名函数，在 bind 和 trigger 函数外层作用域创建一个字典对象，用于存储注册的事件及响应函数列表，bind 时，如果字典没有则创建一个，key 是事件名称，value 是数组，里面放着当前注册的响应函数，如果字段中有，那么就直接 push 到数组即可。trigger 时调出来依次触发事件响应函数即可。

## 事件如何派发也就是事件广播（dispatchEvent）

这个是自定义事件及事件触发的应用（createEvent/dispatchEvent, createEventObject/fireEvent）

一般我们在元素上绑定事件后，是靠用户在这些元素上的鼠标行为来捕获或者触发事件的，或者自带的浏览器行为事件，比如 click，mouseover，load 等等，有些时候我们需要自定义事件或者在特定的情况下需要触发这些事件。这个时候我们可以使用 IE 下 fireEvent 方法，高级浏览器（chrome,firefox 等）有 dispatchEvent 方法。

## 小结

1.  有必要限制一个页面中事件处理程序的数量，因为太多会占用大量内存，导致卡顿
2.  建立在事件冒泡机制上的事件委托技术，可以有效减少事件的处理程序的数量
3.  建议再浏览器写在页面之前移除页面的所有事件处理程序

## 参考

- [事件模型及事件代理/委托](http://www.w3cmark.com/2016/439.html)
