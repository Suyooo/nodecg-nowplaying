    $('#musicbutton').click(function() { prepMusic(); });
   
    function prepMusic() {    
      var tData = {
        "msg": $('#music-message').val()
      };  
      
      nodecg.sendMessage('updatemessage', JSON.stringify(tData));
    }