// import * as tudi from 'tudi'
import * as tudi from 'tudi'
import LaserWeapon from './LaserWeapon'
const KEYS = tudi.Keyboard.KEYS
const Vec2 = tudi.Math.Vec2

export default class PlayerController extends tudi.Components.Component {
  name = 'playerController'
  thrust = 48
  friction = 1.1
  scaleSpeed = 1
  turnSpeed = Math.PI
  thrustSprite: tudi.Components.SpriteComponent

  private velocity = new Vec2(0, 0)
  private acceleration = new Vec2(0, 0)
  private actions = {
    thrust: 0,
    rotation: 0,
    shoot: false,
  }

  private soundID: number

  setup (): void {
    this.thrustSprite = <tudi.Components.SpriteComponent>(<tudi.Entity>this.entity.getChild('thrust')).getComponent('sprite')
    this.entity.update$.observe(this.update.bind(this))

    tudi.Keyboard.createInputStream(new Set([KEYS.LEFT, KEYS.RIGHT, KEYS.UP, KEYS.SPACEBAR]))
      .until(this.entity.destroy$)
      .observe(this.processInput.bind(this))
  }

  processInput (keyMap: tudi.Keyboard.KeyMap): void {
    this.actions = { thrust: 0, rotation: 0, shoot: false }
    if (keyMap[KEYS.LEFT]) this.actions.rotation = -1
    if (keyMap[KEYS.RIGHT]) this.actions.rotation = 1
    if (keyMap[KEYS.UP]) this.actions.thrust = 1
    if (keyMap[KEYS.SPACEBAR]) this.actions.shoot = true
  }

  update (dt: number): void {
    const t = this.entity.transform
    const a = <tudi.Components.AudioComponent>this.entity.getComponent('audio')
    const { thrust, rotation, shoot } = this.actions

    // Show the thrust sprite if thrust > 0
    this.thrustSprite.sprite.visible = !!thrust

    t.rotation += rotation * this.turnSpeed * dt
    this.acceleration = Vec2.MULT(t.right, this.thrust * thrust)

    // Makeshift physics calculations
    this.velocity = Vec2.ADD(this.velocity, Vec2.MULT(this.acceleration, dt))
    t.position = Vec2.ADD(t.position, this.velocity)
    this.velocity = Vec2.DIV(this.velocity, this.friction)

    if (shoot) {
      const s = a.sounds['assets/sounds/laser.wav']
      if (!s.playing(this.soundID)) {
        this.soundID = s.play()

        const l = this.entity.getComponent('laserWeapon') as LaserWeapon
        l.fire()
      }
    }
  }
}
