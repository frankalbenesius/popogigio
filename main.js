var tag = document.createElement('script')

tag.src = 'https://www.youtube.com/iframe_api'
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

var player
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'ZhrkOSfbB1U',
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
    loop: true,
  })
}

function onPlayerReady(event) {
  event.target.playVideo()
}

function onPlayerStateChange(event) {
  if (event.data === 0) {
    doAPopo()
    setInterval(doAPopo, 2000)
  }
}

function doAPopo() {
  var state = player.getPlayerState()
  var paused = 2
  if (state !== paused) {
    // otherwise this is real annoying
    player.seekTo(27)
    player.playVideo()
  }
}

if (!!fetch) {
  giphifyBackground({ preload: false })
  setInterval(function() {
    giphifyBackground({ preload: true })
  }, 3000)
  function giphifyBackground(opts) {
    var preload = opts.preload || false
    var route =
      'https://api.giphy.com/v1/gifs/random?api_key=b3mDw3iCr25WnW03sUCESFIq2RnliSP8&tag=santa claus'
    fetch(route)
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        var src = 'url(' + json.data.image_url + ')'
        if (preload) {
          document.getElementById('preload').style.backgroundImage = src
          setTimeout(function() {
            document.body.style.backgroundImage = src
          }, 1000)
        } else {
          document.body.style.backgroundImage = src
        }
      })
  }
}
