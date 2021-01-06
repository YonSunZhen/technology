import 'zone.js';


let zone = Zone.current.fork({
  // onInvoke: function(parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
  //   console.log('执行onInvoke');
  //   // 执行回调 没有此语句将不会执行回调
  //   parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
  //   console.log('离开onInvoke');
  // }

  // onInvokeTask(parentZoneDelegate, currentZone, targetZone, task) {
  //   console.log('执行onInvokeTask');
  //   // 执行异步任务中的回调 没有此语句将不会执行
  //   parentZoneDelegate.invokeTask(targetZone, task);
  // }

  // onHasTask(parentZoneDelegate, currentZone, targetZone, hasTaskState) {
  //   console.log('执行onHasTask');
  //   if(!hasTaskState.macroTask) {
  //     console.log('异步函数执行结束');
  //   }
  // }

  // onScheduleTask(parentZoneDelegate, currentZone, targetZone, task) {
  //   console.log('这里是调试2');
  //   parentZoneDelegate.scheduleTask(targetZone, task);
  // },

  // onHandleError(parentZoneDelegate, currentZone, targetZone, error) {
  //   console.log('这里是调试2');
  // }
});

zone.run(async);

function async() {
  console.log('执行回调');
  console.log('这里是调试3');
  setTimeout(() => {
    console.log('这里是调试1');
  }, 3000)
  setTimeout(() => {
    console.log('这里是调试2');
  }, 6000)
  console.log('这里是调试4');
}