
class Attack {
  damage: number;
  constructor () {
    this.damage = Math.floor(Math.random() * 10 + 5)
  }
}

export default Attack
