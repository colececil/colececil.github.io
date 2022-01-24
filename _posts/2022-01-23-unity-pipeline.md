---
layout: post
title: "Creating a Unity CI Pipeline Using GitHub Actions"
date: 2022-01-23 00:00:00 -0600
---

For a long time, I've been wanting to set up a continuous integration (CI) pipeline for my Unity project, [Bludgeon](https://meticulousmonster.com/bludgeon/), in order to automate building the game and deploying it to Steam and Itch. Unfortunately, Unity does not make this easy to figure out - at least not if you want to choose your own CI tools, rather than paying for Unity Cloud Build. However, I was finally able to get this working, after coming across a wonderful open source project called [Game CI](https://game.ci/).

In this article, I'll first go over the reasons for creating a CI pipeline for your project. Then I'll go over why I had difficulty doing this for a Unity project, and how Game CI helps solve this. Finally, I'll walk through the details of my pipeline and how it works.

<!--more-->

## Why create a CI pipeline

There are multiple benefits to having a CI pipeline for your game project:

- For me, one of the most important benefits of having a CI pipeline (especially as a solo game developer) is that it gives you confidence your project can be successfully built on an arbitrary machine, using only what is contained within version control. Without this, you couldn't be sure whether you accidentally left something critical outside of version control, with the only copy of it sitting on your local machine. In this case, if something happened to your hard drive, you could potentially suffer a catastrophic loss to your project. But with a cloud CI pipeline, your project is built on another machine every time you push code, and you are notified if it cannot be built for some reason.
- Another very important benefit of CI is that it automates build and deployment processes that are cumbersome and error-prone when done manually. This is especially helpful for deployment processes, which can be unintuitive and complicated, and easy to forget since they are often performed infrequently.
- When working on a team, it's important to know right away if someone accidentally makes a change to the project that prevents it from building properly. A CI pipeline will inform you of this right away, so you don't make further changes before discovering it, or involve more people than necessary with the issue.
- A CI pipeline can help you automatically update the version number of your game, and also create a tag in version control that points to the commit corresponding with that version number.

## Obstacles to CI with Unity

- Difficulties in setting one up for cheap/free (downsides of Unity Cloud Build, difficulty getting Unity running in a Linux container, etc.).
- Introduce Game CI open source project and GitHub Actions.

## My Unity CI pipeline

- Go through my GitHub Actions workflow.