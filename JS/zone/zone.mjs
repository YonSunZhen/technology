import 'zone.js';
import expect from 'expect';

// const rootZone = Zone.current;
// const zoneA = rootZone.fork({name: 'A'});

// expect(Zone.current).toBe(rootZone);

// setTimeout(function timeCb1() {
//   console.log('这里是调试1');
//   expect(Zone.current).toEqual(rootZone);
// }, 2000);

// zoneA.run(function run1() {
//   expect(Zone.current).toEqual(zoneA);

//   setTimeout(function timeoutCb2() {
//     console.log('这里是调试2');
//     expect(Zone.current).toEqual(zoneA);
//   }, 1000);
// });

// expect(Zone.current).toBe(rootZone);

let logZone = Zone.current.fork({ 
  name: 'logZone',
  onInvoke: function(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
    console.log(targetZone.name, 'enter');
    parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source)
    console.log(targetZone.name, 'leave'); 
  }
});

logZone.run(function myApp() {
    console.log(Zone.current.name, 'queue promise');
    Promise.resolve('OK').then((value) => {console.log(Zone.current.name, 'Promise', value)
  });
});