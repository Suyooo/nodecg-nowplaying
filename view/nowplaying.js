// pass data straight into our function that handles it, preferred for simplicity
nodecg.listenFor('updatemessage', updateMessage);

	var appear = false;
	var curline = -1;
	
	function updateMessage(data) {
        var msgParsed = JSON.parse(data);
        var msg = msgParsed.msg;
        
        if(msg) {
			if (curline == -1) {
				curline = 0;
				setTimeout(toggleLines,10000);
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
	
	setInterval(updateSong,1000);
	function updateSong() {
		$.get("nowplaying.txt",function(data,status){
			if (status=="success") {
				if (!appear) {
					$('#container').transition({
						'left': '0'
					}, 1000, 'ease-out');
					appear = true;
				}
				$('#musictitle').html(data);
			}
		});
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
			setTimeout(toggleLines,5000);
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
			setTimeout(toggleLines,10000);
		}
	}