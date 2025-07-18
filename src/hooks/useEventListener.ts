import { useEffect, useRef } from 'react';

type EventListener = (event: Event) => void;

export default function useEventListener(
  eventType: string,
  callback: EventListener,
  element: Window | Document | HTMLElement = window
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    
    const handler = (e: Event) => callbackRef.current(e);
    
    element.addEventListener(eventType, handler);
    
    return () => {
      element.removeEventListener(eventType, handler);
    };
  }, [eventType, element]);
}
