// components/Footer.tsx
export default function Footer() {
  return (
    <>
      {/* Animated Stronger Wave */}
      <div className="w-full overflow-hidden leading-none relative">
        <svg
          viewBox="0 0 1440 320"
          className="block"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footerGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          <path fill="url(#footerGradient)">
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,160 C360,280 1080,40 1440,160 L1440,320 L0,320 Z;
                M0,200 C400,40 1040,280 1440,120 L1440,320 L0,320 Z;
                M0,160 C360,280 1080,40 1440,160 L1440,320 L0,320 Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Footer Content */}
      <footer className="text-center py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white mt-[-1px]">
        <p className="text-sm tracking-wide">
          <a
            href="https://github.com/GENDHUT/Portofolio-Next"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built with 💖 by <span className="font-semibold">GENDHUT 2025</span>
          </a>
        </p>
      </footer>
    </>
  );
}
