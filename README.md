nodecg-nowplaying
=================

This <a href="https://github.com/nodecg/nodecg">NodeCG</a> bundle shows the currently playing song, and optionally a message.

<img src="sample.gif?raw=true"/>

To set up, follow the regular process of adding a bundle, but you also need to set up your preferred method:  
* If you run NodeCG locally, tell your music player/script to dump the current song to `bundles/nowplaying/view/nowplaying.txt` (I use <a href="https://github.com/gustafsonk/SFMT">SFMT</a> for this).  
* If you want to get the current song from Last.fm, add your API key in the config gile (see below). You can get it from <a href="http://www.last.fm/api">last.fm/api</a>.

The panel on the dashboard allows you to set:  
* A Last.fm song source. If this field is empty on update, the local file (view/nowplaying.txt) will be used.  
* An optional message. If the message field is empty on update, no second line will be shown and only the song title is displayed.  
* Whether automatic display should be on. If enabled on update, the song display will show for X seconds every time the title changes.

### Configuration File
Create the configuration file in `cfg/nowplaying.json`. Default values are the ones shown below.
```
{
  "titletime": 10,
  "msgtime": 5,
  "update": 1,
  "apikey": null
}
```
* `titletime` is the time in seconds the music title should be displayed before switching the the message, if one is set.  
* `msgtime` is the time in seconds the message is shown before switching back.
* `update` is the interval between checking the file or requesting the current song from the API, in seconds.
* `apikey` is your last.fm API key.

You may also want to edit `view/nowplaying.css` and change the `top` value of `.musiccontainer` so it aligns nicely with your layout.
