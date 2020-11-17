# RxJS wrapper for ASP.NET SignalR

[![CircleCI](https://circleci.com/gh/bryceklinker/rxjs-signalr.svg?style=svg)](https://circleci.com/gh/bryceklinker/rxjs-signalr)

When consuming SignalR based services I wanted to be able to treat receiving data as an observable stream. This library provides a thin wrapper to allow consumption of SignalR services using RxJS Observables.

## What is RxJS?

Refer to the [RxJS docs for that](https://github.com/ReactiveX/rxjs).

## What is SignalR?

Refer to the [ASP.NET SignalR docs](https://www.asp.net/signalr).

## Getting started

### rxjs and Signalr

This package relies on signalr and rxjs packages.


### Install

Install using npm:

```bash
npm install observable-signalr --save
```

### Creating a hub

Create using factory method:

```javascript
import { createSignalRHub } from 'observable-signalr';

const hub = createSignalRHub('{hubName}');
```

Create using constructor: 

```javascript
import { SignalRHub } from 'observable-signalr';

const hub = new SignalRHub('{hubName}');
```

### Receiving data from SignalR

```javascript
import { createSignalRHub } from 'observable-signalr';

const hub = createSignalRHub('{hubName}');
hub.on('{name of event/method}').subscribe(data => {
    // Perform logic here
});
hub.start();
```

### Sending data to SignalR

```javascript
import { createSignalRHub } from 'observable-signalr';

const hub = createSignalRHub('{hubName}');
hub.start();
hub.send('{name of event/method}', {});
```