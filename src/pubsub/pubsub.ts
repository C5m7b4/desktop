// export type eventTypes = "maximize" | "clear";
export enum eventTypes {
  maximize,
  clear,
  moved,
}

export type eventActionType = (e: string) => void;

export const SubEvent = {
  list: new Map(),
  on(eventType: eventTypes, eventAction: eventActionType) {
    this.list.has(eventType) || this.list.set(eventType, []);
    const listLength = this.list.get(eventType).length;
    if (listLength === 0) {
      this.list.get(eventType).push(eventAction);
    }
    return this;
  },
  emit(eventType: eventTypes, args: string) {
    console.log(`emit triggered`);
    this.list.get(eventType) &&
      this.list.get(eventType).forEach((cb: eventActionType) => {
        console.log(`emitting event ${eventType}`);
        cb(args);
      });
  },
};

export const publisher = {
  publish: (eventType: eventTypes, content: string) => {
    SubEvent.emit(eventType, content);
  },
  clear: () => {
    SubEvent.emit(eventTypes.clear, "");
  },
};
