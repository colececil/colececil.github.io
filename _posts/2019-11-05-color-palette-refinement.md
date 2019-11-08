---
layout: post
title: "Bludgeon Update: Color Palette Refinement"
date: 2019-11-05 22:00:00 -0600
---

One of my more recent changes to [Bludgeon](https://meticulousmonster.com/bludgeon/), the game I'm developing, has been to refine the color palette. Up until this point, I haven't really had much of a process for choosing colors. Basically, I just picked out colors I liked whenever I found myself needing more colors. I tried to reuse colors as much as possible to keep the color count down, having read multiple places that having fewer colors is generally better. However, I didn't really have a way that I was organizing the colors in my palette, so I'm pretty sure I ended up with too many colors that were too similar.

<!--more-->

I'd been wanting to figure out a way to refine and keep track of my color palette. I also wanted to do this before creating a whole lot of art for the game, in order to avoid having to spend a lot of time going back and updating colors in my artwork. So I did some research, and I came across [this thread on Pixel Joint](http://pixeljoint.com/forum/forum_posts.asp?TID=10695) that has a lot of interesting insights in it. I also found [this tutorial on Reddit](https://www.reddit.com/r/PixelArt/comments/35v454/tutorial_creating_a_universal_color_ramp/), which is very helpful.

Both of these sources introduced me to the idea of interconnected color ramps. If you're not familiar, a color ramp is basically a set of colors that can be used together to show different light levels - basically, a set of related colors organized from darkest to lightest. What I had previously been doing was creating separate color ramps for different hues. This works, but it doesn't do much to minimize the number of colors used. When the color ramps overlap each other and share colors, this helps reduce the number of colors and make the whole palette more cohesive. Looking at the examples I found in the research I had done, I created this color palette for Bludgeon:

![Bludgeon color palette](/images/color-palette-refinement/palette.png)

In this image, the lines connect the colors that are in the same color ramp. You can see that all of the color ramps merge together at the dark end and the light end of the ramp. Also, some of the color ramps intersect - for example, the purples and blues, the blues and greens, and the browns and oranges.

The way I went about making this was by picking my favorite colors from the Bludgeon art I'd created so far, trying to figure out ways in which they were related, and then filling in the gaps. I mostly did this just by dragging color splotches around in my image editor and comparing them. When I had something I thought looked good, I compared my palette and my existing artwork to see if the palette was missing any colors I needed. I then make a bunch of small tweaks to the color palette and, after much trial and error, got to something I was happy with.

Once I was finished creating my new color palette, I applied it to my existing artwork. In my opinion, it really helped with making the artwork look more cohesive and adding some needed contrast. Here are some images comparing the old versions with the new versions:

![Old title screen compared with title screen](/images/color-palette-refinement/title-screen.png)

![Old dungeon compared with new dungeon](/images/color-palette-refinement/dungeon.png)

![Old world map compared with new world map](/images/color-palette-refinement/world-map.png)

I think I picked a good point in time at which to go through this refinement process. I had enough existing art to be able to figure out what sorts of colors I wanted, but I didn't have so much art done that it would be a ton of work to update the colors using the new palette.