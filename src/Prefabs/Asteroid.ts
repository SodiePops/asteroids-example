import * as tudi from 'tudi'
import ScreenWrap from '../Components/ScreenWrap'
const Vec2 = tudi.Math.Vec2

export type AsteroidSize = 'xl'| 'lg' | 'md' | 'sm'

class Asteroid extends tudi.Components.Component {
  name = 'asteroid'
  direction: tudi.Math.Vec2
  radius: number
  speed = 6

  constructor (public size: AsteroidSize) {
    super()
    this.radius = {'xl': 256, 'lg': 128, 'md': 64, 'sm': 32}[this.size]
  }

  setup (): void {
    this.entity.transform.pivot = new Vec2(this.radius, this.radius)
    const randAngle = Math.random() * Math.PI * 2
    this.direction = new Vec2(Math.cos(randAngle), Math.sin(randAngle))

    this.entity.update$.observe(this.update.bind(this))
    this.entity.destroy$.observe(this.destroy.bind(this))

    this.entity.scene.actions.push({ type: 'asteroid-count', payload: 1 })
  }

  update (): void {
    this.entity.transform.position
      .add(Vec2.MULT(this.direction, this.speed))

    for (const e of Object.values(this.entity.scene.entities)) {
      if (e.name === 'laser') {
        const lp = e.transform.position
        const ap = this.entity.transform.position
        if (Vec2.SUB(lp, ap).mag() < this.radius) {
          this.entity.destroy()
          e.destroy()
          return
        }
      }
    }
  }

  destroy (): void {
    switch (this.size) {
      case 'xl':
        this.entity.scene.addEntity(asteroid('lg', this.entity.transform.position))
        this.entity.scene.addEntity(asteroid('lg', this.entity.transform.position))
        break
      case 'lg':
        this.entity.scene.addEntity(asteroid('md', this.entity.transform.position))
        this.entity.scene.addEntity(asteroid('md', this.entity.transform.position))
        this.entity.scene.addEntity(asteroid('md', this.entity.transform.position))
        break
      case 'md':
        this.entity.scene.addEntity(asteroid('sm', this.entity.transform.position))
        this.entity.scene.addEntity(asteroid('sm', this.entity.transform.position))
        this.entity.scene.addEntity(asteroid('sm', this.entity.transform.position))
        this.entity.scene.addEntity(asteroid('sm', this.entity.transform.position))
        break
      case 'sm':
        break
    }

    this.entity.scene.actions.push({ type: 'asteroid-count', payload: -1 })
  }
}

/**
 * Asteroid prefab
 */
export default function asteroid (size: AsteroidSize, position: tudi.Math.Vec2) {
  return new tudi.Entity(
    'asteroid',
    {
      position: position.clone(),
      rotation: Math.random() * Math.PI * 2,
    },
    [
      new tudi.Components.SpriteComponent(`assets/asteroid-${size}.png`),
      new Asteroid(size),
      new ScreenWrap(),
    ],
    [],
  )
}
