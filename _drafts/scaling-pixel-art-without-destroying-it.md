---
layout: post
title: "Scaling Pixel Art Without Destroying It"
---

When I started using pixel art in game development, I assumed that it would easily work at any screen resolution, since screen resolutions these days are much higher than the native resolution of a pixel art game. However, I quickly came to realize that this is not the case and that it's actually quite tricky to get pixel art to look correct when scaling it up by an arbitrary amount. It works fine when it's scaled by an integer multiple (2x, 3x, etc.), but the issues come when scaling by a non-integer multiple. This causes problems because your texture pixels (in other words, the pixels in your artwork) get scaled to fractional pixels on the screen. Because screens can't display fractional pixels, it has to either round to the nearest whole pixel, or it has to blend different texture pixels into the same screen pixel. In the end, depending on the selected texture filter mode, this either ends up making some of the pixels in your pixel art bigger than others, or it makes them all blurry. Neither of these options look great, as seen in the example below:

(insert example image here)

This led me to do a lot of googling to try to find a solution to the problem. Most resources I found said that you have to just stick with scaling by integer multiples if you want it to look good, but I was not satisfied with that answer. I knew I'd played plenty of pixel art games that could scale to my screen size and look just fine. So I kept searching, and I finally came across a great solution using a shader at a blog called [A Personal Wonderland](https://csantosbh.wordpress.com/2014/01/25/manual-texture-filtering-for-pixelated-games-in-webgl/). The author does a really nice job of explaining and illustrating the solution in a very mathematical way. It still took me awhile to understand how it works, but I got there, and I was able to implement it in a Unity shader. Since it's so hard to find information about how to solve this problem, I wanted to write a tutorial about it here, explaining it in a way that makes more sense to my brain, and also giving an example of the solution in Unity.

## Standard Scaling Approaches

The pixel art scaling shader is sort of a mix between nearest neighbor filtering and bilinear filtering. Since fully understanding how this works depends on understanding how these two filtering approaches work, I'm going to first spend some time explaining them.

### Nearest Neighbor Filtering

### Bilinear Filtering

## Pixel Art Scaling Shader
