export const Banner = () => (
  <div className="fixed left-0 right-0 top-0 z-[999] flex h-[40px] w-full flex-col items-center justify-center py-2 text-sm bg-[#1e7748] sm:flex-row sm:py-0 sm:text-lg">
    <div className="mr-1 hidden text-white sm:block">Free Palestine 🇵🇸</div>
    <a
      href="https://freepalestine.dev"
      target="_blank"
      rel="noopener"
      className="text-link ms-0 text-white hover:underline sm:ms-1"
    >
      <div className="mr-1 inline text-white sm:hidden">🇵🇸</div>
      Help Spread Awareness for Palestine
    </a>
  </div>
);
