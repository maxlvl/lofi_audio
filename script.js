//TODO: Refactor this pile of spaghet

const keys = document.querySelectorAll('.key');
const modalButton = document.querySelector('.modalButton');
const modalOuter = document.querySelector('.creditsmodal-outer')
const container = document.querySelector('.container');

modalButton.addEventListener('click', openModal);

modalOuter.addEventListener('click', checkIfCloseModal)

const playingState = {
  masterBeat: {
    isPlaying: false
  }
};

function checkIfCloseModal(event) {
  const outsideClicked = !event.target.closest('.creditsmodal-inner');

  if(outsideClicked) closeModal()
}

function openModal() {
  modalOuter.classList.add('open')
  container.classList.add('is-blurred')
}

function closeModal() {
  modalOuter.classList.remove('open')
  container.classList.remove('is-blurred')
}

window.addEventListener("DOMContentLoaded", event => {
  keys.forEach(key => key.addEventListener('click', playSound))
  keys.forEach(key => {
      let keyNumber = key.dataset.key
      playingState[keyNumber] = {isPlaying: false} }
  )

  window.addEventListener('keyup', playSoundFromKey)
  
  function startBeat() {
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
  
    if (!playingState.masterBeat.isPlaying) {
      startBeat()
    }
  
    keyAudio.volume = 1
  
    keyEl.classList.add('playing')
  
    keyEl.addEventListener('click', stopSound)
    keyEl.removeEventListener('click', playSound)
      
  }
  
  function stopSound(event) {
    let keyEl = event.currentTarget
    let key = event.currentTarget.dataset.key
    let audio = document.querySelector(`audio[data-key="${key}"]`)
  
    audio.volume = 0
  
    keyEl.classList.remove('playing')
  
    keyEl.addEventListener('click', playSound)
    keyEl.removeEventListener('click', stopSound)
  }
  
  
  function playSoundFromKey(event) {
    let key = event.key;
    if (!['1', '2', '3', '4'].includes(key)) {
      return
    }
    let keyEl = document.querySelector(`div[data-key="${key}"]`) 
    let keyAudio = document.querySelector(`audio[data-key="${key}"]`)
    
    if (!playingState.masterBeat.isPlaying) {
      startBeat()
    }
    keyEl.classList.add('playing')
    keyAudio.volume = 1
  
    window.addEventListener('keyup', stopSoundFromKey)
    window.removeEventListener('keyup', playSoundFromKey)
  }
  
  function stopSoundFromKey(event) {
    let key = event.key;
    if (!['1', '2', '3', '4'].includes(key)) {
      return
    }
    let keyEl = document.querySelector(`div[data-key="${key}"]`) 
    let audio = document.querySelector(`audio[data-key="${key}"]`)
  
    audio.volume = 0
  
    keyEl.classList.remove('playing')
    window.addEventListener('keyup', playSoundFromKey)
    window.removeEventListener('keyup', stopSoundFromKey)
  
  }
}) 

