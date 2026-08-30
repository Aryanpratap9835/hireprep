import Image from "next/image";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold">
        HirePrep
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Your AI-powered interview preparation coach.
      </p>
      <a
        href="/interview"
        className="mt-8 rounded-lg bg-black px-6 py-3 text-white ">
        Start Prep
      </a>
    </main>
  );
}