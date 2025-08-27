"use client";

import { useEffect, useRef, useState } from "react";

export default function StickyWatcher() {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // kalau elemen keluar dari viewport (karena sticky nempel), ubah state
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: [1] }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div className="space-y-10">
      {/* <div className="h-40 bg-gray-200">Scroll down ⬇️</div> */}
      <div className="transition-transform duration-500 ease-out scale-90 hover:scale-100 border-2 border-red-600">
        Smooth Scale 🚀
      </div>

      {/* sentinel buat deteksi */}
      {/* <div ref={ref}></div>

      <div
        className={`sticky top-4 p-4 rounded  shadow transition ${
          isSticky ? "bg-green-500 text-white" : " text-black"
        }`}
      >
        {isSticky ? "🔒 Lagi Sticky" : "⬇️ Scroll biar sticky"}
      </div>

      <div className="h-[150vh] bg-gray-100"></div> */}
    </div>
  );
}
