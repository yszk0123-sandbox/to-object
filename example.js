const { toObject } = require('.');

class Foo {
  constructor() {
    this.a = 1;
    this.b = [2, 3];
    this.bar = new Bar2();
  }

  get c() {
    return 4;
  }
}
class Bar {
  constructor() {
    this.A = 'a';
    this.B = 'b';
  }

  get C() {
    return 'c';
  }
}
class Bar2 extends Bar {
  get D() {
    return 'd';
  }
}

const result = toObject([new Foo()]);
console.log(JSON.stringify(result, null, 2));
/*=>
{
  "a": 1,
  "b": 2,
  "bar": {
    "A": "a",
    "B": "b",
    "C": "c",
    "D": "d"
  },
  "c": 3
}
*/
