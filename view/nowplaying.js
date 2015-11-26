// edit these!
var titletime = nodecg.bundleConfig.titletime;	// how long song title is displayed, in seconds
if (titletime==undefined) titletime = 10;
var msgtime = nodecg.bundleConfig.msgtime;		// how long sub message is displayed, in seconds
if (msgtime==undefined) msgtime = 5;
var update = nodecg.bundleConfig.update;		// how often the title is updated, in seconds
if (update==undefined) update = 1;
var apikey = nodecg.bundleConfig.apikey;		// your last.fm API key (last.fm/api)

var auto = 0;
var showing = 0;
var songsource = "";
var lastsong = "";

var curline = -1;
var toggleto;
var autotoggleto;
var autohideto;

$(document).ready(function () {
	nodecg.Replicant('isShowing')
        .on('change', function(oldVal, newVal) {
            newVal ?
				showMusic() :
				hideMusic();
        });

	nodecg.Replicant('musicinfo')
        .on('change', function(oldVal, newVal) {
            updateMusic(newVal);
        });
        
	function showMusic() {
		updateSong();
		if (showing==0) {
			$('#musiccontainer').transition({
				'left': '0'
			}, 1000, 'ease-out');
			showing=1;
		}
	}
	function hideMusic() {
		if (showing==1) {
			$('#musiccontainer').transition({
				'left': '1280px'
			}, 1000, 'ease-in');
			showing = 0;
		}
	}

	function updateMusic(data) {
		songsource = data.lastfm;

        auto = data.auto;

        var msg = data.msg;
        if(msg) {
			if (curline == -1) {
				curline = 0;
				toggleto=setTimeout(toggleLines,titletime*1000);
			}
			$('#musicmessage').html(msg);
		} else {
			if (curline != -1) {
				if (curline==1) {
					toggleLines();
				}
				clearTimeout(toggleto);
				curline = -1;
			}
		}
    }

	setInterval(updateSong,update*1000);
	function updateSong() {
		if (songsource=="") {
			$.get("nowplaying.txt",function(data,status){
				if (status=="success") {
					updateTitle(data);
				}
			});
		} else {
			$.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user="+songsource+"&api_key="+apikey+"&limit=2&format=json&callback=?", function(data) {
				 updateTitle(data.recenttracks.track[0].artist['#text'] + " - " + data.recenttracks.track[0].name);
			});
		}
    }
	function updateTitle(song) {
		$('#musictitle').text(song);
		if (song != lastsong && auto != 0) {
			if (curline==1) {
				toggleLines();
			}
			showMusic();
			clearTimeout(toggleto);
			clearTimeout(autotoggleto);
			clearTimeout(autohideto);
			autotoggleto = setTimeout(toggleLines,auto*600);
			autohideto = setTimeout(hideMusic,auto*1000);
		}
		lastsong = song;
	}

	function toggleLines() {
		if (curline==0) {
			$('#musictitle').transition({
				'opacity': '0',
				'margin-top': '-4px'
			}, 300, 'ease-out');
			$('#musicmessage').delay(150).transition({
				'opacity': '1',
				'margin-top': '8px'
			}, 300, 'ease-out');
			curline = 1;
			if (auto==0) toggleto=setTimeout(toggleLines,msgtime*1000);
		} else if (curline==1) {
			$('#musictitle').delay(150).transition({
				'opacity': '1',
				'margin-top': '8px'
			}, 300, 'ease-out');
			$('#musicmessage').transition({
				'opacity': '0',
				'margin-top': '20px'
			}, 300, 'ease-out');
			curline = 0;
			if (auto==0) toggleto=setTimeout(toggleLines,titletime*1000);
		}
	}
});
