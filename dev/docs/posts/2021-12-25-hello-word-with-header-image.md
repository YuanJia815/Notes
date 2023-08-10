---
layout: Post
title: Hello Word 2
subtitle: A Test Post with a Header Image
author: Renovamen
date: 2021-12-25
useHeaderImage: true
headerImage: /img/in-post/2021-12-25/header.jpg
headerMask: rgba(40, 57, 101, .4)
tags:
  - test
  - 中文标签
---

Welcome to VuePress theme Gungnir.

<!-- more -->

## Paragraphs

### English

A well-known scientist (some say it was ==Bertrand Russell==) once gave a public lecture on astronomy. He described how the earth orbits around the sun and how the sun, in turn, orbits around the center of a vast collection of stars called our galaxy. At the end of the lecture, a little old lady at the back of the room got up and said: “What you have told us is rubbish. The world is really a flat plate supported on the back of a giant tortoise.” The scientist gave a superior smile before replying, “What is the tortoise standing on.” “You’re very clever, young man, very clever,” said the old lady. “But it’s turtles all the way down!”

Most people would find the picture of our universe as an infinite **tower of tortoises** rather ridiculous, but why do we think we know better? What do we know about the universe, and how do we know it? Where did the universe come from, and where is it going? Did the universe have a beginning, and if so, what happened before then? What is the nature of time? Will it ever come to an end? Can we go back in time? Recent breakthroughs in physics, made possible in part by fantastic new technologies, suggest answers to some of these longstanding questions. Someday these answers may seem as obvious to us as the earth orbiting the sun – or perhaps as ridiculous as a tower of tortoises. Only time (whatever that may be) will tell. [^1]


## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading


## Code

### Code Blocks

Click the green button on the upper-left corner to make the code block full screen.

```python{8}
import food

class Dragon:
  def __init__(self, happiness):
    self.happiness = happiness
  def code(self):
    """ just code """
    self.happiness -= 60
  def eat(self, n)
    # just eat
    self.happiness += n * food.size

me = Dragon(100)

while True:
  me.code()
  me.eat(10)
```


### Code Groups

<CodeGroup>
<CodeGroupItem title="YARN" active>

```bash
yarn add -D vuepress-theme-gungnir@next
```

</CodeGroupItem>

<CodeGroupItem title="NPM">

```bash
npm install -D vuepress-theme-gungnir@next
```

</CodeGroupItem>
</CodeGroup>


### Inline Code

`const a = 1`

## Table

| Name | Info |
|------|------|
| vuepress-theme-gungnir | Gungnir is a blog theme for Vuepress 2. |

## Badges <Badge text="tip" /> <Badge text="warning" type="warning" /> <Badge text="danger" type="danger" /> <Badge text="tip middle" vertical="middle" />


## Charts

### Chart.js

```chart
{
  "type": "bar",
  "data": {
    "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    "datasets": [{
      "label": "# of Votes",
      "data": [12, 19, 3, 5, 2, 3],
      "backgroundColor": [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      "borderColor": [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      "borderWidth": 1
    }]
  },
  "options": {
    "scales": {
      "y": {
        "ticks": {
          "beginAtZero": true,
          "callback": "function(value){ return value + 'k'; }"
        }
      }
    }
  }
}
```

### Mermaid

```mermaidjs
sequenceDiagram
  Alice->John: Hello John, how are you?
  loop Every minute
    John-->Alice: Great!
  end
```


## Images

![Image Example](/img/home-bg/3.gif)


## Maths

Inline math: $E = mc^2$

Display math:

$$
i\hbar\frac{\partial \psi}{\partial t} = \frac{-\hbar^2}{2m} ( \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2} ) \psi + V \psi.
$$

With tags:

$$
\begin{gather}
  A = \text{softmax}(\frac{QK^T}{\sqrt{d_k}}) \\
  F_{\text{out}} = A V
\end{gather}
$$


## Emojis

:smile: :smirk: :racehorse: :wolf:


## Containers

::: link {fa-github-alt} [vuepress-theme-gungnir](https://github.com/Renovamen/vuepress-theme-gungnir)
A blog theme for VuePress 2.
:::

::: link {/img/links/me.png} [My Blog](https://blog.zxh.io)
My links.
:::

::: info
This is an info message.
:::

::: tip
This is a tip message.
:::

::: warning
This is a warning message.
:::

::: danger
This is a dangerous warning message.
:::

::: details Show me the code.
```cpp
cout << "Hello World!" << "\n";
```
:::

::: details Show me the code group.
<CodeGroup>
<CodeGroupItem title="JS" active>

```js
console.log("Hello World!");
```

</CodeGroupItem>

<CodeGroupItem title="PY">

```python
print("Hello World!")
```

</CodeGroupItem>
</CodeGroup>
:::

## References

[^1]: Excerpted from: *A Brief History of Time*, written by Stephen Hawking.

[^2]: 摘自《时间简史》，作者为斯蒂芬·霍金。
