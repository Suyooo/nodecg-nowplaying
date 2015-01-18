    var showBtn = $('#musicshow');
    var hideBtn = $('#musichide');
    var updateBtn = $('#musicupdate');

    updateBtn.click(function() { nodecg.variables.musicinfo = prepMusic(); });
    showBtn.click(function() { nodecg.variables.isShowing = true; });
    hideBtn.click(function() { nodecg.variables.isShowing = false; });

    nodecg.declareSyncedVar({
        name: 'isShowing',
        initialValue: false,
        setter: function (isShowing) {
            showBtn.prop('disabled', isShowing);
            hideBtn.prop('disabled', !isShowing);
        }
    });

    nodecg.declareSyncedVar({
        name: 'musicinfo',
        initialValue: {},
        setter: function (info) {
            $('#music-songsource').val(info.lastfm);
            $('#music-message').val(info.msg);
            $('#music-autointerval').val(info.auto);
            $('#music-autoenabled').prop('checked', info.auto !== 0);
        }
    });

    function prepMusic() {
        return {
            lastfm: $('#music-songsource').val(),
            msg: $('#music-message').val(),
            auto: $('#music-autoenabled').is(':checked') ? parseInt($('#music-autointerval').val()) : 0
        };
    }
