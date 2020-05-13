# Zattoo use-double-click React Hook
React hook for combining double-click function into click event, as well as repeatable double-click.

### Install

```shell
npm install @zattoo/use-double-click
```

Make sure you have at least version 16.8 of `react` and `react-dom` installed, or otherwise hooks won't work for you.

### Usage
```jsx
export const Example = () => {
    const [doubleClickCount, setDoubleClickCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);

    const hybridClick = useDoubleClick(
        () => setDoubleClickCount(doubleClickCount + 1),
        () => setClickCount(clickCount+1),
        300
    );

    return (
        <div>
            <p>You clicked {clickCount} times</p>
            <p>You double-clicked {doubleClickCount} times</p>
            <button onClick={hybridClick}>
                Click me
            </button>
        </div>
    );
}
```

### Call Signature

```typescript
export function useDoubleClick(doubleClick: clickEvent, click?: clickEvent, timeout?: number): clickEvent;
export type clickEvent = (event?: import("react").SyntheticEvent<Element, Event>) => any;
```

### Parameters
- `doubleClick: (event? React.SyntheticEvent) => void`: double-click function to be executed when user double-clicks (single or multiple times) on the bounded component.
- `click?: (event? React.SyntheticEvent) => void`: click function to be executed when user clicks (single time) on the bounded component.
- `timeout?: number`: number of milliseconds to detect double-click event

### Found an issue or have a feature request?

Open up an issue or pull request and participate.

