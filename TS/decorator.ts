class Somebody {
  speed: number = 10;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  hit(rival: Somebody) {
    const hitDamage: number = 10;
    console.log(`${this.name}对${rival.name}造成一次伤害：${hitDamage}`);
  }
}

function cheating(target: any) {
  target.prototype.hit = function(rival: Somebody) {
    const hitDamage: number = 100;
    console.log(`${this.name}对${rival.name}造成一次伤害: ${hitDamage}`);
  }
}

@cheating
class SBody extends Somebody{

}

const s0 = new Somebody('小红0');
const s1 = new SBody('小红1');
const rival = new Somebody('小明');
s0.hit(rival);
s1.hit(rival);