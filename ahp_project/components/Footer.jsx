"use client";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center px-8 py-3 border-t bg-blue-500">
      <p className="text-white text-sm">© {new Date().getFullYear()} Stock Decision. All rights reserved.</p>
    </footer>
  );
}
