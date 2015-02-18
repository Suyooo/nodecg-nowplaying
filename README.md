nodecg-nowplaying
=================

This <a href="https://github.com/nodecg/nodecg">NodeCG</a> bundle shows the currently playing song, and optionally a message.

<img src="sample.gif?raw=true"/>

To set up, follow the regular process of adding a bundle, but you also need to set up your preferred method:  
-- If you run NodeCG locally, tell your music player/script to dump the current song to `NodeCG/bundles/nowplaying/view/nowplaying.txt` (I use <a href="https://github.com/gustafsonk/SFMT">SFMT</a> for this)  
-- If you want to get the current song from Last.fm, edit view/nowplaying.js to add your API key. You can get it from <a href="http://www.last.fm/api">last.fm/api</a>.

You may want to edit:  
-- view/nowplaying.css: change the top value of .musiccontainer so it aligns nicely with your layout.  
-- view/nowplaying.js: you can edit display times and update intervals in the first few lines.

The panel on the dashboard allows you to set:  
-- A Last.fm song source. If this field is empty on update, the local file (view/nowplaying.txt) will be used.  
-- An optional message. If the message field is empty on update, no second line will be shown and only the song title is displayed.  
-- Whether automatic display should be on. If enabled on update, the song display will show for X seconds every time the title changes.
