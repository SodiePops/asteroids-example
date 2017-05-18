/**
 * Entry point.
 */

import * as tudi from 'tudi'
import mainScene from './Scenes/MainScene'

const game: tudi.Game = new tudi.Game(window.innerWidth, window.innerHeight)
game.start(mainScene)
