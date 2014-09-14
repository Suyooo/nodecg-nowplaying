// edit these!
var titletime = 10;		// how long song title is displayed, in seconds
var msgtime = 5;		// how long sub message is displayed, in seconds
var update = 1;			// how often the title is updated, in seconds
var apikey = "";		// your last.fm API key (last.fm/api)

var curline = -1;
var songsource = "";
var showing = 0;
	
$(document).on('ncgReady', function () {
	nodecg.listenFor('musicupdate', updateMessage);
	nodecg.listenFor('musicshow', showMusic);
	nodecg.listenFor('musichide', hideMusic);
	
	function showMusic(data) {
		updateSong();
		showing = true;
	}
	function hideMusic(data) {
		updateSong();
		$('#musiccontainer').transition({
			'left': '1280px'
		}, 1000, 'ease-in');
		showing = 0;
	}
	
	function updateMessage(data) {
		var msgParsed = JSON.parse(data);
		
		songsource = msgParsed.lastfm;
		
        var msg = msgParsed.msg;
        if(msg) {
			if (curline == -1) {
				curline = 0;
				setTimeout(toggleLines,titletime*1000);
			}
			$('#musicmessage').html(msg);
		} else {
			if (curline != -1) {
				if (curline==1) {
					toggleLines();
				}
				curline = -1;
			}
		}
    }
	
	setInterval(updateSong,update*1000);
	function updateSong() {
		if (showing==0) return;
		if (songsource=="") {
			$.get("nowplaying.txt",function(data,status){
				if (status=="success") {
					$('#musictitle').text(data);
					if (showing==1) {
						$('#musiccontainer').transition({
							'left': '0'
						}, 1000, 'ease-out');
						showing=2;
					}
				}
			});
		} else {
			$.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user="+songsource+"&api_key="+apikey+"&limit=2&format=json&callback=?", function(data) {
				$('#musictitle').text(data.recenttracks.track[0].artist['#text'] + " - " + data.recenttracks.track[0].name);
				if (showing==1) {
					$('#musiccontainer').transition({
						'left': '0'
					}, 1000, 'ease-out');
					showing=2;
				}
			});
		}
    }

	function toggleLines() {
		if (curline==0) {
			$('#musictitle').transition({
				'opacity': '0',
				'margin-top': '0px'
			}, 300, 'ease-out');
			$('#musicmessage').delay(150).transition({
				'opacity': '1',
				'margin-top': '12px'
			}, 300, 'ease-out');
			curline = 1;
			setTimeout(toggleLines,msgtime*1000);
		} else if (curline==1) {
			$('#musictitle').delay(150).transition({
				'opacity': '1',
				'margin-top': '12px'
			}, 300, 'ease-out');
			$('#musicmessage').transition({
				'opacity': '0',
				'margin-top': '24px'
			}, 300, 'ease-out');
			curline = 0;
			setTimeout(toggleLines,titletime*1000);
		}
	}
});