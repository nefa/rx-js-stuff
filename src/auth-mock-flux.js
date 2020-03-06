import { interval, from } from 'rxjs';
import { tap, mergeMap, switchMap, takeWhile } from 'rxjs/operators';


const mock = [...Array(20).keys()];
const POLING_INTERVAL = 2500;

export default class Auth {
	constructor() {

		this.flow$ = interval(POLING_INTERVAL)
			.pipe(
				tap(console.log),
				mergeMap(val => this.pushNotifications$(val).pipe(
					tap(code => this.code = code+3),
					tap(code => console.log('za-', code)),
				)),
				
				takeWhile(code => code < 6),
				switchMap(code => this.pushNotifications$(mock.length-1)),
				tap(console.log('this.code', this.code)),
			)
			.subscribe(
				next => console.log('next ::', next),
				err=> console.error('error', err), 
				(/* completed */)=> console.log('completed'),
			);
	}

	pushNotifications$(idx) {
		return from(new Promise(resolve => {
			setTimeout(() => resolve(mock[idx]), 2000);
		}))
	}
}