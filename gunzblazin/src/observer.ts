const subscribers: { [topic: string]: Array<() => void> } = {};

export function subscribe(topic: string, fn: () => void): void {
  if (!subscribers[topic]) {
    subscribers[topic] = [];
  }
  subscribers[topic].push(fn);
}

export function publish(topic: string): void {
  if (subscribers[topic]) {
    subscribers[topic].forEach(fn => fn());
  }
}