
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MPromise {

    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];
    _status = PENDING;
    constructor(fn) {
        this.status = pending;
        this.value = null;
        this.reason = null;

        try {
            fn(this.resolve.bind(this), this.rejected.bind(this));
        } catch (e) {
            this.rejected(e);
        }
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        this._status = newStatus;
        switch (newStatus) {
            case FULFILLED:
                this.FULFILLED_CALLBACK_LIST.forEach(callback => {
                    callback(this.value);
                });
                break;
            case REJECTED:
                this.REJECTED_CALLBACK_LIST.forEach(callback => {
                    callback(this.reason);
                })
                break;
        }
    }

    resolve(value) {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
        }
    }

    rejected(reason) {
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
        }
    }
    
    isFunction(param) {
        return typeof param === 'function';
    }

    then(onFulfilled, onRejected) {
        const realonFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
            return value;
        }
        const realonRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
            return reason;
        }

        const promise2 = new MPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                try {
                    const x = realonFulfilled(this.value);
                    this.resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            };

            const rejectedMicrotask = () => {
                try {
                    const x = realonRejected(this.reason);
                    this.resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }


            switch (this.status) {
                case FULFILLED:
                    fulfilledMicrotask();
                    break;
                case REJECTED:
                    rejectedMicrotask();
                    break;
                case PENDING:
                    this.FULFILLED_CALLBACK_LIST.push(realonFulfilled);
                    this.REJECTED_CALLBACK_LIST.push(realonRejected);
            }
        })

        return promise2;
    }

    resolvePromise(promise2, x, resolve, reject) {
        
    }
}