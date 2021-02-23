import { Subscription, Observable, of, Subject, AsyncSubject, BehaviorSubject } from 'rxjs';

// of(1,2,3).subscribe((res) => console.log(res));

// var subject = new Subject();
// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });
// subject.next(1);
// subject.next(2);


var subject = new BehaviorSubject(0); // 0是初始值
subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});
// subject.next(3);


// var subject = new AsyncSubject();
// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// subject.next(1);
// subject.complete();
// subject.next(2);
// subject.next(3);
// subject.next(4);
// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });
// subject.next(5);
// console.log('debug1');
// subject.complete();
