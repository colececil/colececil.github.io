---
layout: post
title: "Introducing Bludgeon"
date: 2016-08-31 01:28:00 -0500
---

Earlier this year, the Iowa City Game Dev group that I'm a part of hosted a month-long game jam, with the theme being "sports which could never exist". I participated in the game jam and made a game called Bludgeon. It's a local multiplayer game featuring two knights riding birds while wielding flails. The goal is to knock the other player into the spikes on the edge of the screen. Survival is made more difficult by the fact that you can't control the direction your player is moving while using your weapon. Here's a video (of me vs. the AI player) from the game jam version of the game:

<!--more-->

{% include youtube.html id="NweOQPDtkfE" %}

I really liked the way the initial version of the game turned out (by the way, if you want to try the initial version, you can download it [here](https://ccecil.itch.io/bludgeon-game-jam)). I had previously been working on a metroidvania game, but after some consideration, I decided to pursue Bludgeon right now instead. The reason is because I haven't commercially released a game yet, and I figured it would be better to have my first game be of a more manageable scope. That way, I can get more experience under my belt before taking on a larger project.

## My Experience Working on Bludgeon so Far

I want to take some time here to talk about my experience working on Bludgeon so far: what approaches I've taken, what I've learned, what's been successful, etc.

### The Game Jam

Before the game jam started, there were a few different possibilities for the theme, and I started brainstorming to come up with ideas for them. For the "sports which could never exist" theme that ended up getting chosen, I was trying to think more along the lines of combat sports, since I'm not really into typical sports all that much. I then started thinking about [Joust](https://en.wikipedia.org/wiki/Joust_(video_game)), a fun arcade game I'd played for the first time somewhat recently. I wanted to make a game that took some of the control elements that make playing Joust fun, but make it into a completely different game. I didn't just want to make a rip-off of Joust, but more just something inspired by it. I hope I've succeeded in doing that; I think I have, as I believe the gameplay is totally different (though many people have immediately recognized it as being similar to Joust).

After the game jam started, I opened up [Unity](https://unity3d.com/) (the game engine I'm using to make Bludgeon) and got to work. I'd had the idea to give the players flails as weapons, thinking that might make for some fun controls and combat situations. So my first task was to figure out how to get flail physics working. I won't go into the details too much here, but it involved using Unity's distance joints for each of the chain links and the ball at the end.

Having the basic physics and controls working a couple weeks into the game jam, I decided I'd better start working on some artwork real soon (at this point the player was represented by a red square, and the flail was represented by yellow squares and a big yellow ball). This is where I learned one of my main lessons of the game jam: artwork takes quite a long time, especially if you're not super experienced at it (though I can't say I have the experience of being super experienced at it, so I wouldn't know for sure whether that would make me faster at it). Fortunately, I'd been practicing pixel art via [Pixel Dailies](https://twitter.com/Pixel_Dailies), so I'm at least better at it than I used to be (but I still have quite a ways to go... look at that background). I am pretty happy with the way the characters turned out, though. Anyway, I spent about half of the game jam working on the artwork.

After I got some artwork out, I spent a decent amount of time tweaking stuff and trying to balance the gameplay. This was the other major lesson I learned: balancing gameplay is really hard! It turns out that when you tweak one thing, it ends up affecting lots of other things. So you have to tweak a whole bunch of things at once, and, with a lot of testing, hope that it works out well. One area where I think I was successful here was in taking a risk/reward approach in designing the gameplay. The bigger the reward you want to get, the bigger the risk you have to take. Here are some examples of this in the gameplay:

- While you are using your flail, you can no longer control which direction your character is moving, because the directional controls double as the controls for swinging the flail.
- While you are holding your flail, you are weighed down, and you get less of a boost when your bird flaps its wings.
- If you keep your flail out for long enough, it gets charged up and becomes more powerful (i.e., more knockback).

By the end of the game jam, I was pretty happy with what I'd been able to create in a month (please note, I spent almost all of my free time during that month working on the game). I wasn't 100% sure whether I wanted to continue working on Bludgeon, though; I thought it was kind of fun, but maybe not fun enough.

### Post Game Jam

After the game jam, I decided to take a break for a bit and play Dark Souls 2... and it turned into a very long break. And I still haven't finished Dark Souls 2 (it's so long!). But I did start working on Bludgeon again recently. I decided to try to change the way the controls work, because I thought the game jam version of the game didn't feel tight enough. It seemed that players would spend most of their time flying past each other rather than engaging in meaningful combat, because it was just too hard to control.

Previously, you had to use the controller's d-pad to control the player's movement and to swing the flail. Additionally, when swinging the flail, the direction you pressed would just apply force to the flail in that direction. I decided to work on improving the flail controls. The first thing I did was to switch from using the d-pad to using the analog stick. A friend had pointed out to me that this might work better, given that you are swinging something around in a circle. That did feel better, so I then moved on to making the flail controls more precise. Instead of just applying force in the direction of the input, I changed it so that the flail would reflect the position of the analog stick. For instance, if you hold up on the analog stick, the flail will stay above the player. If you then move the analog stick to the bottom-right, the ball will move to the bottom-right of the player and stay there as long as that's where the analog stick is. This made the flail movement less realistic, but it made the game a lot more fun by providing better controls (my belief is that if you have to sacrifice realism for fun in games, it's pretty much always worth it).

The tighter controls ended up allowing players to spend more time engaging in meaningful combat. The extra precision also allows players to use their flails to block attacks, adding another interesting dimension to the gameplay.

### Indie Game Showcase

Last weekend, the Iowa City Game Dev group had a local video game exhibition for our community. I decided to show Bludgeon there, and I had a blast! My wife Kezia was also there helping me demo the game, because she is that awesome (I didn't even have to ask her to help... she just did).

We had a really good turnout, and I got to see lots of different people play my game. It was really exciting and rewarding to see people having fun playing a game that I made. One of my main goals in making games is to make stuff that is meaningful to people or that brings people together, so it was great to see so many people having fun together playing Bludgeon. They seemed to have more fun with it than I expected, so that was really encouraging. I also got a lot of great feedback and ideas from those who played.

After watching a bunch of people play Bludgeon last weekend, I became more confident that I could make it into a game that's fun enough to feel good about selling. Reflecting on what's happened so far, I think another thing that ended up being successful for me was deciding to work on making the core gameplay more fun before adding more features. I think it's important to start with a good foundation before adding a bunch of stuff onto it.

Thanks to everyone who showed up to last weekend's event and tried Bludgeon! And thanks to the Mill for hosting this event, as well as to [Izzy Neuhaus](http://izzyneuha.us/) for setting it up. By the way, here are links to some of the games demoed by other developers at the event (sorry if I missed anyone):

- [Crystal Control 2](http://store.steampowered.com/app/499580/) by Virtually Competent
- [Ham's Labrynth](http://www.hamslabyrinth.com/) by BaladiDog Games
- [The 13th Doll](http://www.t7g3.com/) by Attic Door Productions
- [bit Dungeon II](http://store.steampowered.com/app/331440/) by KintoGames
- [Thief Princess](https://play.google.com/store/apps/details?id=com.KintoGames.ThiefPrincess&hl=en) by KintoGames
- Super Bogus World 2 by [Hubol Gordon](http://www.hubolhubolhubol.com/)

## Next Steps

Going forward, I plan to keep working on Bludgeon, adding features, and polishing it up. I hope to make it more and more fun and unique as time goes on. I don't have any schedule I'm following for now, but here is some of the stuff I'm hoping/considering to add in the future:

- Allow up to 4 players
- Add different stages with different environmental hazards
- Probably add a health bar as an additional way to win/lose
- A variety of power-ups
- Different costumes or characters
- Fewer bugs :)
