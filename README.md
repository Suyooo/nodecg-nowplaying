nodecg-nowplaying
=================

This NodeCG bundle shows the currently playing song, and optionally a message.
Get NodeCG here: https://github.com/nodecg/nodecg

<img src="sample.gif?raw=true"/>

To set up, follow the regular process of adding a bundle, but also, tell your music player/script to dump the current song to NodeCG/bundles/nowplaying/view/nowplaying.txt (I usually use SFMT: https://github.com/gustafsonk/SFMT )  
You may want to edit:  
-- view/nowplaying.css: change the top value of .musiccontainer so it aligns nicely with your layout.  
-- view/nowplaying.js: you can edit display times and update intervals in the first few lines.

The panel on the dashboard allows you to add a sub message. If you remove any text in the field and update, the bundle will not display any message and stay on the song title.
