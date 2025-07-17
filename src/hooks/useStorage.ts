import { useState, useEffect, useCallback } from "react"

type StorageValue<T> = T | (() => T);
type SetStateAction<T> = T | ((prevState: T) => T);
type UseStorageReturnType<T> = [T, (value: SetStateAction<T>) => void, () => void];

function useStorage<T>(
  key: string, 
  defaultValue: StorageValue<T>,
  storageObject: Storage
): UseStorageReturnType<T> {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return (defaultValue as () => T)();
    } else {
      return defaultValue as T;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined as unknown as T);
  }, []);

  return [value, setValue, remove];
}

export function useLocalStorage<T>(key: string, defaultValue: StorageValue<T>): UseStorageReturnType<T> {
  // Check if window is defined (for SSR/SSG)
  const storage = typeof window !== 'undefined' ? window.localStorage : null as unknown as Storage;
  return useStorage(key, defaultValue, storage);
}

export function useSessionStorage<T>(key: string, defaultValue: StorageValue<T>): UseStorageReturnType<T> {
  // Check if window is defined (for SSR/SSG)
  const storage = typeof window !== 'undefined' ? window.sessionStorage : null as unknown as Storage;
  return useStorage(key, defaultValue, storage);
}
