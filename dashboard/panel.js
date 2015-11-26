    var showBtn = $('#musicshow');
    var hideBtn = $('#musichide');
    var updateBtn = $('#musicupdate');

    updateBtn.click(function() { Rmusicinfo.value = prepMusic(); });
    showBtn.click(function() { RisShowing.value = true; });
    hideBtn.click(function() { RisShowing.value = false; });

    var RisShowing = nodecg.Replicant('isShowing')
        .on('change', function(oldVal, newVal) {
            showBtn.prop('disabled', newVal);
            hideBtn.prop('disabled', !newVal);
        });

    var Rmusicinfo = nodecg.Replicant('musicinfo')
        .on('change', function(oldVal, newVal) {
            $('#music-songsource').val(newVal.lastfm);
            $('#music-message').val(newVal.msg);
            $('#music-autointerval').val(newVal.auto);
            $('#music-autoenabled').prop('checked', newVal.auto !== 0);
        });

    function prepMusic() {
        return {
            lastfm: $('#music-songsource').val(),
            msg: $('#music-message').val(),
            auto: $('#music-autoenabled').is(':checked') ? parseInt($('#music-autointerval').val()) : 0
        };
    }
