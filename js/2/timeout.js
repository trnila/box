#!/usr/bin/env node

function soucin(a, b) {
  return new Promise((resolve, reject) => {
    let t = setTimeout(() => resolve({'a': a, 'b': b, 'result': a * b}), 1000);

    if(Math.random() < 0.1) {
      clearInterval(t);
      reject('service unavailable')
    }
  });
};


soucin(10, 5)
  .then((res) => console.log(`${res.a} * ${res.b} = ${res.result}`))
  .catch(err => console.log(`Error: ${err}`))
