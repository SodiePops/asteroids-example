import * as tudi from 'tudi'
import ScreenWrap from '../Components/ScreenWrap'
const Vec2 = tudi.Math.Vec2

class Laser extends tudi.Components.Component {
  name = 'laser'
  speed = 20
  lifespan = 0.5 // seconds
  private time = 0

  setup (): void {
    this.entity.update$.observe(this.update.bind(this))
  }

  update (dt: number): void {
    this.time += dt
    if (this.time > this.lifespan) {
      this.entity.destroy()
    }

    this.entity.transform.position
      .add(Vec2.MULT(this.entity.transform.forward, this.speed))
  }
}

/**
 * Laser prefab
 */
export default function laser (shooterTransform: tudi.Components.Transform) {
  return new tudi.Entity(
    'laser',
    {
      position: shooterTransform.position.clone(),
      rotation: shooterTransform.rotation - Math.PI / 2,
      pivot: new Vec2(3, 5),
    },
    [
      new tudi.Components.SpriteComponent('assets/laser.png'),
      new ScreenWrap(),
      new Laser(),
    ],
    [],
  )
}
