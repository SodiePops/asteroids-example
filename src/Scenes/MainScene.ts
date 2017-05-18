import * as tudi from 'tudi'
import gameManager from '../Prefabs/GameManager'
import player from '../Prefabs/Player'

const mainScene: tudi.Scene = new tudi.Scene(
  {
    images: ['assets/ship.png', 'assets/laser.png', 'assets/thrust.png',
      'assets/asteroid-sm.png', 'assets/asteroid-md.png', 'assets/asteroid-lg.png', 'assets/asteroid-xl.png'],
    sounds: ['assets/sounds/hit.wav', 'assets/sounds/laser.wav', 'assets/sounds/theme.wav'],
  },
  [
    gameManager(),
    player(),
  ],
)

export default mainScene
