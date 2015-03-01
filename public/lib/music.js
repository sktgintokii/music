var playlist;

function preparePlaylist(){
    $.ajax({
        type: "GET",
        url: "./getList",
        success: function(data){
            console.log(data.playlist);

            playlist = data.playlist;
            appendPlaylist(playlist);
        }
    });
}

function appendPlaylist(playlist){
    for (var i = 0; i < playlist.length; i++){
        var item = playlist[i];
        var html = '<li><a href="#" data-src="' + item.path + '">' + item.name + '</a></li>';
        $('#playlist').append(html);
    }
}

function playNext(){
    var next = $('li.playing').next();
    if (!next.length) next = $('ol li').first();
    next.click();
}

function playPrev(){
    var prev = $('li.playing').prev();
    if (!prev.length) prev = $('ol li').last();
    prev.click();
}

function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function shufflePlaylist(){
    var content = shuffle($("#playlist li"));
    console.log(content);
    $("#playlist").html(content);
}


function main(){
    // Setup the player to autoplay the next track
    var a = audiojs.createAll({
        trackEnded: function() {
            var next = $('ol li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
        }
    });

    // Load in the first track
    var audio = a[0];
    first = $('ol a').attr('data-src');
    $('ol li').first().addClass('playing');
    audio.load(first);

    // Load in a track on click
    $('ol li').click(function(e) {
        e.preventDefault();
        $(this).addClass('playing').siblings().removeClass('playing');
        audio.load($('a', this).attr('data-src'));
        audio.play();
    });

        
    $('#control-bar #next').click(function(e) {
        e.preventDefault();
        playNext();
    });

    $('#control-bar #prev').click(function(e) {
        e.preventDefault();
        playPrev();
    });

    $('#control-bar #shuffle').click(function(e) {
        e.preventDefault();
        shufflePlaylist();
    });     

    // Keyboard shortcuts
    $(document).keydown(function(e) {
        var unicode = e.charCode ? e.charCode : e.keyCode;
    // right arrow
    if (unicode == 39) {
        playNext();
    // back arrow
    } else if (unicode == 37) {
        playPrev();
    // spacebar
    } else if (unicode == 32) {
        audio.playPause();
    }
    })
}

$(function() { 
    preparePlaylist();
    $(document).ajaxStop(function() {
        main();
    });
    
});
