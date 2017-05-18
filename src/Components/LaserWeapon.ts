import * as tudi from 'tudi'
import laser from '../Prefabs/Laser'

export default class LaserWeapon extends tudi.Components.Component {
  name = 'laserWeapon'

  setup (): void {/**/}

  fire (): void {
    this.entity.scene.addEntity(laser(this.entity.transform))
  }
}
