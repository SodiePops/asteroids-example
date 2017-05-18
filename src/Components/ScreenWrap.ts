import * as tudi from 'tudi'

export default class ScreenWrap extends tudi.Components.Component {
  name = 'screen-wrap'
  width: number
  height: number

  setup (): void {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.entity.update$.observe(this.update.bind(this))
  }

  update (): void {
    const t = this.entity.transform
    if (t.position.x < 0) t.position.x = this.width
    if (t.position.x > this.width) t.position.x = 0

    if (t.position.y < 0) t.position.y = this.height
    if (t.position.y > this.height) t.position.y = 0
  }
}
