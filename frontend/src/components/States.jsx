export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-500">
      <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-brand-600 animate-spin" />
      <p className="mt-4 text-sm">{label}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="grid place-items-center h-14 w-14 rounded-full bg-red-50 text-red-500 text-2xl">
        !
      </div>
      <p className="mt-4 font-semibold text-slate-800">Something went wrong</p>
      <p className="mt-1 text-sm text-slate-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}
