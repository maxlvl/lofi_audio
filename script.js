const keys = document.querySelectorAll('.key');
const playingState = {
  masterBeat: {
    isPlaying: false
  }
};

keys.forEach(key => key.addEventListener('click', playSound))
keys.forEach(key => {
    let keyNumber = key.dataset.key
    playingState[keyNumber] = {isPlaying: false} }
)

function startBeat() {
  console.log("STARTING BEAT")
  let audio = document.querySelectorAll('audio');
  audio.forEach(audio => {
    audio.volume = 0
    audio.loop = true
    audio.play()
  })

  playingState.masterBeat.isPlaying = true
}


function playSound(event) {
  let keyEl = event.currentTarget
  let key = event.currentTarget.dataset.key
  let keyAudio = document.querySelector(`audio[data-key="${key}"]`)
  playingState[key].isPlaying = true 

  if (!playingState.masterBeat.isPlaying) {
    startBeat()
  }

  keyAudio.volume = 1

  keyEl.addEventListener('click', stopSound)
  keyEl.removeEventListener('click', playSound)
    
}

function stopSound(event) {
  let keyEl = event.currentTarget
  let key = event.currentTarget.dataset.key
  let audio = document.querySelector(`audio[data-key="${key}"]`)

  audio.volume = 0



  keyEl.addEventListener('click', playSound)
  keyEl.removeEventListener('click', stopSound)
}
