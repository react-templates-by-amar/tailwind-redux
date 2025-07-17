import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increment, decrement, reset } from '@/store/slices/counterSlice';

export const Counter = () => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border p-4 shadow-sm">
      <h2 className="text-2xl font-bold">Counter: {count}</h2>
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(increment())}
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
