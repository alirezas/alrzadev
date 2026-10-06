export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-[1072px] mx-auto px-6 py-16 md:py-32">
        <div className="animate-in" style={{ opacity: 0, animation: "fadeInUp 0.6s ease-out forwards" }}>
          <div className="w-full max-w-[640px] mx-auto">
            <h1 className="mb-7 text-[16px] font-medium leading-7 text-neutral-950 dark:text-neutral-100">
              Alireza Sarabchi
            </h1>
            <p className="mb-7 text-[16px] leading-7 text-neutral-700 dark:text-neutral-200">
              <em className="font-[family-name:var(--font-newsreader)] text-[17px] font-normal italic leading-none text-neutral-950 dark:text-neutral-100">
                I craft digital products
              </em>
              , from the first idea to the last detail.
            </p>
            <p className="text-[16px] leading-7 text-neutral-700 dark:text-neutral-200">
              Since 2007, I’ve been designing and building for the web, moving
              between design, code, research, and business. I like figuring things
              out, getting into the details, and making ideas real.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
