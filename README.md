<h1 align="center">sysmon</h1>
<p align="center">An intuitive remotely-accessible system performance monitoring and task management tool for servers and headless Raspberry Pi setups</p>

<p align="center">
    <img src="https://awesome.re/mentioned-badge.svg">
</p>

<p align="center">
    <img src="https://img.shields.io/github/issues/t0xic0der/sysmon?style=flat-square&logo=appveyor&color=teal">
    <img src="https://img.shields.io/github/forks/t0xic0der/sysmon?style=flat-square&logo=appveyor&color=teal">
    <img src="https://img.shields.io/github/stars/t0xic0der/sysmon?style=flat-square&logo=appveyor&color=teal">
    <img src="https://img.shields.io/github/license/t0xic0der/sysmon?style=flat-square&logo=appveyor&color=teal">
    <img src="https://img.shields.io/github/watchers/t0xic0der/sysmon?style=flat-square&color=teal&logo=appveyor">
</p>

## Good news!
WebStation SYSMON was featured in to author's [Reddit article](https://www.reddit.com/r/raspberry_pi/comments/htwe0o/i_have_created_an_intuitive_remotelyaccessible/) - followed by a [news article](https://www.tomshardware.com/news/manage-your-headless-raspberry-pi-remotely-from-a-web-browser) at Tom's Hardware. It is now featured in the [Awesome RPi](https://github.com/thibmaek/awesome-raspberry-pi) list too.

## Use-cases
- For people having home or enterprise servers with lower system specifications and complexity
- For people having headless setup of Raspberry Pi (or any other single board computer of the kind)
- For people looking for a relatively easy-to-understand and user-friendly system management tool
- For people wanting to control devices from mobile phones, chromebooks and smart TVs (with browser)

## Features
- Simplistic implementation of asynchronous periodic AJAX calls to fetch information
- Relatively low overhead from the server during stat (approx. 4MB over Python 3 runtime usage)
- Easy and flexible customization of interface by replacing the assets with your own
- Tweakable refresh times for dynamic information with endpoints powered by **`psutil`**
- Report printing and dynamic refreshing buttons available at disposal
- Hybrid cross-client theming engine built with upto 21 supported theming options
- Complex process management with per-task **`TERMINATE`**, **`KILL`**, **`SUSPEND`** and **`RESUME`** operations

## Table of contents
1. [Home](https://github.com/t0xic0der/sysmon/wiki)
2. [Notice](https://github.com/t0xic0der/sysmon/wiki/Notice)
3. [Installing on Raspberry Pi](https://github.com/t0xic0der/sysmon/wiki/Installing-on-Raspberry-Pi)
4. [Installing on a Generic PC](https://github.com/t0xic0der/sysmon/wiki/Installing-on-a-Generic-PC)
5. [Screenshots](https://github.com/t0xic0der/sysmon/wiki/Screenshots)
6. [Things to do next](https://github.com/t0xic0der/sysmon/wiki/Things-to-do-next)
7. [Bugs](https://github.com/t0xic0der/sysmon/wiki/Bugs)

## Helpful
1. https://stackoverflow.com/questions/15721679/update-and-render-a-value-from-flask-periodically
2. https://stackoverflow.com/questions/32149892/flask-application-built-using-pyinstaller-not-rendering-index-html

## Contribute
You may request for the addition of new features in the [issues](https://github.com/t0xic0der/sysmon/issues) page but as the project is singlehandedly maintained - it might take time to develop on them. Please consider forking the repository and contributing to its development. :heart:
