import { InjectionToken } from '@angular/core';

export default function AutoUnsubscribe(): (constructor: new (...args: any[]) => void) => void {
    return function(constructor: new (...args: any[]) => void): void {
        const orig = constructor.prototype.ngOnDestroy;

        constructor.prototype.ngOnDestroy = function(): void {
            for (const prop in this) {
                if (typeof this[prop].subscribe === 'function') {
                    this[prop].unsubscribe();
                }
            }

            orig.apply();
        };
    };
}
