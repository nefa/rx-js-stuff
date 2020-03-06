import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';


export default class Test {
	constructor() {
		range(1, 25).pipe(
		  filter(x => x % 2 === 1),
		  map(x => x + x)
		).subscribe(
			x => console.log('next', x), 
			err=> console.error('error', err), 
			(/* completed */)=> console.log('completed')
		);
	}
}