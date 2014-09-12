    $('#musicupdate').click(function() { prepMusic(); });
	$('#musicshow').click(function() { nodecg.sendMessage('musicshow', ""); });
	$('#musichide').click(function() { nodecg.sendMessage('musichide', ""); });
   
    function prepMusic() {    
      var tData = {
        "msg": $('#music-message').val()
      };  
      
      nodecg.sendMessage('musicupdate', JSON.stringify(tData));
    }