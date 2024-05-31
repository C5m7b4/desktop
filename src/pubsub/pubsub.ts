// export type eventTypes = "maximize" | "clear";
export enum eventTypes {
  maximize,
  clear,
}

type eventActionType = (e: string) => void;

export const SubEvent = {
  list: new Map(),
  on(eventType: eventTypes, eventAction: eventActionType) {
    this.list.has(eventType) || this.list.set(eventType, []);
    if (this.list.get(eventType)) {
      this.list.get(eventType).push(eventAction);
    }
    return this;
  },
  emit(eventType: eventTypes, args: string) {
    this.list.get(eventType) &&
      this.list.get(eventType).forEach((cb: eventActionType) => {
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
