---
title: 正则简单总结
author: 烈风裘
date: 2016-10-20T14:11:42.000Z
draft: false
comments: true
star: false
cover: ''
tags: 
  - 正则
  - JavaScript
---

记得很早之前就对正则进行了简单的学习，我自己在下面也总结了很多次，但是一到用的时候就懵逼了。看来还是实践较少的结果。今天特此花时间在总结下，并且附上常用的正则示例。

## 思维导图：

![正则](http://xiangsongtao.com/uploads/1474687442000.png "正则")

## 常用示例：

### 去除首位空格（单独去除左右空格类似）：

```
"   ac f    ".replace(/(^\s*)|(\s*$)/g,'')
```

### "v-err-src"转化为驼峰名字"vErrSrc"：

```
'v-err-src'.replace(/-(\w)/ig,function(x){
   return x.slice(1).toUpperCase()
})
```

### xxx-xxxx-xxxxx, 前三位数字开头，中间四位字母开头数字结尾，后 5 位随意：

```
/^\d\w{2}-[a-zA-Z]\d{3}-.{5}$/.test('1as-a234-wwwww')
```

### 邮箱验证：

```
/^\w+@[1-9a-z]+(\.[a-z]+){1,3}$/.test("xxxx@16.cn.net")
```

### 中文范围：

```
匹配中文：[\u4e00-\u9fa5] //中文ACALL码的范围
```

以上就差不多这些了！
