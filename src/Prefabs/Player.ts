import * as tudi from 'tudi'
import ScreenWrap from '../Components/ScreenWrap'
import PlayerController from '../Components/PlayerController'
import LaserWeapon from '../Components/LaserWeapon'
const Vec2 = tudi.Math.Vec2

const thrust = new tudi.Entity(
  'thrust',
  {
    position: new Vec2(21, 33),
    pivot: new Vec2(18, 4),
    rotation: -Math.PI / 2,
  },
  [ new tudi.Components.SpriteComponent('assets/thrust.png') ],
  [],
)

export default function player () {
  return new tudi.Entity(
    'player',
    {
      position: new Vec2(window.innerWidth / 2, window.innerHeight / 2),
      pivot: new Vec2(21, 16),
    },
    [
      new tudi.Components.SpriteComponent('assets/ship.png'),
      new tudi.Components.AudioComponent(['assets/sounds/laser.wav']),
      new ScreenWrap(),
      new PlayerController(),
      new LaserWeapon(),
    ],
    [ thrust ],
  )
}
