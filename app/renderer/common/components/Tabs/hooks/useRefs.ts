import React, { useRef } from 'react';

export default function useRefs<T>(): [(key: React.Key) => React.RefObject<T> | undefined, (key: React.Key) => void] {
    const cacheRefs = useRef(new Map<React.Key, React.RefObject<T>>());

    function getRef(key: React.Key) {
        if (!cacheRefs.current.has(key)) {
            cacheRefs.current.set(key, React.createRef<T>());
        }
        return cacheRefs.current.get(key);
    }

    function removeRef(key: React.Key) {
        cacheRefs.current.delete(key);
    }

    return [getRef, removeRef];
}
