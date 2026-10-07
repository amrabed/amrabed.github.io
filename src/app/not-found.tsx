import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-extrabold tracking-tight text-primary/20">
        404
      </h1>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-4">
        Page Not Found
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 px-8 py-3 rounded-xl bg-primary text-white font-medium shadow-sm hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}
