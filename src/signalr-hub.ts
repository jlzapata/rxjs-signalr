import { Observable, Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

export class SignalRHub {
    private _connection: HubConnection;
    private _subjects: { [name: string]: Subject<any> };
    private _primePromise: Promise<void>;

    get connection(): HubConnection {
        return this._connection || (this._connection = this.createConnection());
    }

    get hubName(): string {
        return this._hubName;
    }

    get url(): string  {
        return this._url;
    }

    constructor(private _hubName: string, 
        private _url: string = null) {
        this._subjects = {};
    }

    start() {
        if(!this.hasSubscriptions())
            console.warn('No listeners have been setup. You need to setup a listener before starting the connection or you will not receive data.');
        this._primePromise = this.connection.start();
    }

    on<T>(event: string): Observable<T> {
        const subject =  this.getOrCreateSubject<T>(event);
        this.connection.on(event, (data: T) => subject.next(data))
        return subject.asObservable();
    }

    async send(method: string, ...args: any[]): Promise<any> {
        if (!this._primePromise)
            return Promise.reject('The connection has not been started yet. Please start the connection by invoking the start method befor attempting to send a message to the server.');
        await this._primePromise;
        return this.connection.invoke(method, ...args);
    }

    hasSubscriptions(): boolean {
        for (let key in this._subjects) {
            if (this._subjects.hasOwnProperty(key)) {
                return true;                
            }
        }

        return false;
    }

    private getOrCreateSubject<T>(event: string): Subject<T> {
        return this._subjects[event] || (this._subjects[event] = new Subject<T>());
    }

    private createConnection(): HubConnection {
        const connection = new HubConnectionBuilder()
            .withUrl(this.url)
            .build();

        return connection;
    }
}