
import Hero from './views/game/core/hero'
import Monster from './views/game/core/monster'
// import Scene from './views/game/core/scene'
// import Attack from './views/game/core/attack'
// import Skill from '@/views/game/core/skill'

const hero = new Hero({ lv: 1, name: 'hero', exp: 0, id: 1 })

const monster = new Monster()

// const scene = new Scene(7, '碎石旷野', 'lv30 ~ lv34')
//
// scene.setHero(hero)
hero.on('underAttack', (damage: number) => {
  console.log(`${hero.name}underAttack`, damage, '剩余hp', hero.hp)
})
monster.on('underAttack', (damage: number) => {
  console.log(`${monster.name}underAttack`, damage, '剩余hp', monster.hp)
})
// scene.run()

hero.setTarget(monster)
monster.setTarget(hero)

// 战斗
hero.fight()
hero.fight()
hero.fight()
hero.fight()
hero.fight()

// monster.underAttack(hero.fight())
