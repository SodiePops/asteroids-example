import * as tudi from 'tudi'
import asteroid from './Asteroid'
const Vec2 = tudi.Math.Vec2

class GameManager extends tudi.Components.Component {
  name = 'gameManager'

  setup (): void {
    this.entity.scene.actions
      .channel<number>('asteroid-count')
      .until(this.entity.destroy$)
      .scan((count, n) => count + n, 0)
      .observe(count => {
        if (count === 0) this.restartGame()
      })
  }

  playTheme (): void {
    const a = <tudi.Components.AudioComponent>this.entity.getComponent('audio')
    const s = a.sounds['assets/sounds/theme.wav']
    s.play()
  }

  restartGame (): void {
    this.playTheme()
    this.entity.scene
      .addEntity(asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)))
    this.entity.scene
      .addEntity(asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)))
    this.entity.scene
      .addEntity(asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)))
  }
}

export default function gameManager (): tudi.Entity {
  return new tudi.Entity(
    'gameManager',
    {},
    [
      new GameManager(),
      new tudi.Components.AudioComponent(['assets/sounds/theme.wav']),
    ],
    [],
  )
}
