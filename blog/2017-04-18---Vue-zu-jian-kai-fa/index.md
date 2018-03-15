---
title: Vue组件开发
author: 烈风裘
date: 2017-04-18T01:50:54.000Z
draft: false
comments: false
star: false
cover: http://upload-images.jianshu.io/upload_images/2036128-5338101e95178cce.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
tags: 
  - Vue
---

软件编程界有一个**面相对象**的思想, 或者用另一句话就是**为实例写模板**, 初始化的时候调用模板(类)生成实例, 进行抽象化开发. 因此, 组件的开发和类的设计有着异曲同工之处.

类的设计原则有以下几种, 分别是:

1. 单一职责原则
2. 接口隔离原则
3. 开放封闭原则
4. 依赖倒置原则

关于这方面的资料网上介绍比较多, 这里我对此概念进行迁移, 用于解释Vue组件开发中需要考虑的原则. 

## 关于设计原则

### 1. 单一职责

这个比较好理解, 比如[Alert](https://github.com/DTFE/Vimo/tree/master/raw/components/alert)/[Toast](https://github.com/DTFE/Vimo/tree/master/raw/components/toast)/[Actionsheet](https://github.com/DTFE/Vimo/tree/master/raw/components/action-sheet)/[Loading](https://github.com/DTFE/Vimo/tree/master/raw/components/loading)等组件, 通过名字就能知道他们都是与用户交互的弹出层, 用于提示用户操作结果的.

另外, 在Alert/Actionsheet/Loading中, 又有背景变黑的开关, 因此为了保证单一职责原则, 背景变黑这样的公共特性需要封装为独立的组件([Backdrop](https://github.com/DTFE/Vimo/tree/master/raw/components/backdrop)). 


同样的例子在[Input组件](https://github.com/DTFE/Vimo/tree/master/raw/components/input)编写时也有体现. Input和Textarea组件两者有大部分的逻辑是共用的, 所以将共用的部分进行抽离放到[mixin](https://github.com/DTFE/Vimo/blob/master/raw/components/input/mixin.vue)中.

> 所以, 我认为**区分组件的原子性是根据组件是否共用为参考的.** 此外, 不建议过度的原子性. 因此, 正确的时机因该是当代码有重复可合并的情况下进行抽离. 

### 2. 接口隔离

Vue在设计组件的时候这方面就考虑的很周全. 目前(Vue2.x), **Vue组件对外只有三个API:**

- **Prps:**  外部传递组件数据
- **Events:** 组件向外发送事件(可传递数据)
- **Slots:** 外部逻辑整合到组件中(插槽)

引入这张**组件通讯**图还是很必要的: ![组件通讯](http://cn.vuejs.org/images/props-events.png)



这张图中并没有Slot, 是因为Slot中的内容组件是无法直接感知到. 关于组件使用的详细信息参考官网的[组件开发教程](http://cn.vuejs.org/v2/guide/components.html#什么是组件？).

> 因此, **如果你在使用组件**, 在向组件内传递数据, 或者监听组件的状态使用*Props*和*Events*就可以, 不建议通过this找$parent/$children等方法获取组件的直接操作. **另外, 如果是在编写开发组件, 那就随意了!**

### 3. 开放封闭

#### 拓展开放

这部分也是Vue在设计组件的时候内置的功能: [Mixins](http://cn.vuejs.org/v2/api/#mixins)和[Extends](http://cn.vuejs.org/v2/api/#extends).




两个属性的功能类似, 简单的说就是将组件初始化的对象进行合并: 

- **对于属性(包括data/props/watch/methods/computed等):** 数据会进行合并替换, 原始组件的优先级最高; 

- **对于钩子函数(created/mounted):** Mixins/Extends中定义的钩子不影响原始组件的钩子, 但是会优先执行Mixins/Extends中的定义.

##### 区别

- 传参: 
	- Mixins 需要传入数组
	- Extends 传入对象即可

- 两者混用优先级:
	- 对于钩子函数:  Extends > Mixins > Source
	- 对于属性:  Source  > Mixins  > Extends

> 这部分也是单一原则的实现方式

####  修改封闭

正常情况下, 不会涉及到使用组件内部的方法, **组件对外全靠事件进行**. 但是, 也有些情况在事件触发时传递组件的this, 让业务能够执行组件内部方法改变组件状态, 比如[Refresher组件](https://github.com/DTFE/Vimo/tree/master/raw/components/refresher): 对外可调用内部两个方法: 

- **complete():** 异步数据请求成功后, 调用这个方法; refresher将会关闭, 状态由`refreshing` -> `completing`.
- **cancel():** 取消 refresher, 其状态由`refreshing` -> `cancelling`

因此, 保证这部分不会在组件更迭发生变化也是很重要的!



### 3. 依赖倒置

这部分讲的是**降低组件和业务之间的耦合度**, 组件只要明确了使用调用的文档, 业务按照文档进行组件使用即可. 组件发生任何更新迭代优化等升级只要不改变定义的文档即可. 

>  **组件面相抽象开发, 不依赖具体实现.** 组件开发就是为了降低耦合度而进行的.



## 写组件之前的建议

到这里我想到了**"为人名服务"**这句话, 也就是说开发组件前需要站在使用者角度考虑如何去使用这个组件. 所以我的做法如下: 


1. 先写DEMO实例, 将所有数据交互及操作交互等内容涵盖到里面
2. 根据实例写文档, 规范API, 这部分可以和有经验的同时交流
3. 准备实现具体逻辑


## Vue组件的几种类型

这部分简单介绍[Vimo框架](https://github.com/DTFE/Vimo)中使用到的几种组件类型的实现思路

### 1. 弹出层组件

关于弹出层组件之前是参考mint-ui来写的, 但是vue和js文件杂糅的方式导致职责不清, 比如[message-box组件](https://github.com/ElemeFE/mint-ui/tree/master/packages/message-box/src),  关键部分代码流程如下:

```js
// 1. 获取message-box.vue文件并extend
import msgboxVue from './message-box.vue';
var MessageBoxConstructor = Vue.extend(msgboxVue);

// 2. 根据MessageBoxConstructor生成实例instance, 使用div包裹
var initInstance = function() {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  });
  instance.callback = defaultCallback;
};

// 3. 根据传入参数修改instance的属性, 然后挂到body上显示
var showNextMsg = function() {
  if (!instance) {
    initInstance();
  }
  if (!instance.value || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();
      var options = currentMsg.options;
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      document.body.appendChild(instance.$el);
      Vue.nextTick(() => {
        instance.value = true;
      });
    }
  }
};
```

这么做不好的地方如下:

1. vue并没有存在的意义, 直接写成html模板即可
2. 组件没有初始化的生命周期过程, 即created/mounted等钩子都不起作用
3. js部分包含了vue中的实现逻辑, vue只是作为了模板存在
4. message-box.vue中定义的prop并没有发挥功能
5. 使用setTimeout判断组件的开闭动画是否完毕, 正常应该监听transitionend事件

这部分也曾改写过很多次, 最终官网的一个API[`propsData`](http://cn.vuejs.org/v2/api/#propsData)开启了一个新思路.

1. 先写普通组件一样先写弹出层组件, 
2. 之后用`propsData`传递数据
3. 给`el`传递位置
4. 组件的开闭有组件vue自己控制, 外部的js文件只是做以上步骤, 例如这样: [Alert组件](https://github.com/DTFE/Vimo/tree/master/raw/components/alert)
5. 组件具有完整的生命周期, 且props能够正常工作

关键代码如下: 

```
var Comp = Vue.extend({
  props: ['msg'],
  template: '<div>{{ msg }}</div>'
})
var vm = new Comp({
  el: document.getElementById(position),
  propsData: {
    msg: 'hello'
  }
})
```


#### 另外

关于监听组件动画结束返回Promise的解决办法:

1. 使用`transition`的js钩子, [这里是说明.](http://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子)
2. 开启关闭的函数返回Promise, 但是`resolve`方法在钩子中执行

```js
// 1. 开启返回Promise
present () {
     const _this = this;
     _this.isActive = true;
     return new Promise((resolve) => {this.presentCallback = resolve})
},

// 2. transition中定义钩子
       <transition name="alert"
                    v-on:before-enter="_beforeEnter"
                    v-on:after-enter="_afterEnter"
                    v-on:before-leave="_beforeLeave"
                    v-on:after-leave="_afterLeave">
         .....
       </transition>
       
//3. 在钩子中执行presentCallback
_afterEnter (el) {
     this.enabled = true;
     // 执行开启的promise
     this.presentCallback(el);
},                 
```


### 2. 父子组合组件

这种组件组合方式类似于HTML中常用的`<select>`和`<option>`. 在Vimo中类似的组件有:[Radio](https://github.com/DTFE/Vimo/tree/master/raw/components/radio)/[Segment](https://github.com/DTFE/Vimo/tree/master/raw/components/segment)等, 大致的结构如下: 

```html
<ParentComponent v-model="value">
	<ChildrenComponent value="value1"> value1 </ChildrenComponent>
	<ChildrenComponent value="value2"> value2 </ChildrenComponent>
</ParentComponent>
```

前面说到, 组件使用需要遵循Vue定制的规范, 但是组件开发就没那么多限制, `ParentComponent`和`ChildrenComponent`是联动的关系, 因此需要定下他们之间的**数据交互规则**:

1. 初始化时, `ChildrenComponent `组件将自己的this传递给`ParentComponent `, 父组件记录下来
2. `ChildrenComponent`点击操作时, 调用`ParentComponent`组件的onChildrenChange函数, 传递自己的value
3. `ParentComponent`组件得到value触发input更新v-modal值, 之后遍历子组件, 触发子组件的refresh方法, 传递value
4. 子组件根据最新value更新自己的状态
5. 以上过程设置相应的对外事件
6. 父子组件组合需要设置assert, 如果assert失败需要给出使用提示, 比如"两个组件需要组合使用..."
7. 子组件需要支持异步`v-for`填入, 
8. `v-model`默认值能正确反映到子组件

基本上按照以上的步骤就能搞定类似的组件啦, 不太明白的可以参考[Radio组件](https://github.com/DTFE/Vimo/tree/master/raw/components/radio)的写法.



### 3. 其余

剩余的组件都比较好写了, 定好props和event就好, 比如: 

- 需要Slot部分

```HTML
<Header>
     <Navbar>
          <Title>Alert</Title>
     </Navbar>
</Header>
```

- 不需要Slot部分

```HTML
<Toggle color="dark" v-model="displayData.dark" @onChange="onChangeHandler"></Toggle>
```


## 总结

写组件需要对Vue的API语法有深入的了解, 写起来才会的心入手. 此外, 对于组件我持有的态度是, 能从Github中找到且不难的组件都不自己写, 快速看看源码没致命错误就好. 如果是业务定制性的组件, 先写在业务中, 如果共用, 则提取出来(比较懒, 😑)


