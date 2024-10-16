import { useRouter } from "next/router";

export default function Hero() {
  const router = useRouter();

  const handleShopNow = () => {
    router.push("/product-list");
  };

  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          'url("https://usabilitygeek.com/wp-content/uploads/2014/05/ecommerce-sticky-lead.jpg")',
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl font-extrabold text-white animate-fade-in-up">
          Shop the Latest Trends
        </h1>
        <p className="text-lg mt-4 text-gray-300">
          Find the perfect outfit for any occasion
        </p>
        <button
          className="mt-8 px-10 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-500 transition transform hover:scale-110 hover:shadow-2xl animate-bounce-once"
          onClick={handleShopNow}
        >
          Shop Now
        </button>
      </div>

      {/* Background image effect */}
      <div
        className="absolute inset-0 bg-fixed"
        style={{
          backgroundImage: 'url("/hero-pattern.png")',
          mixBlendMode: "overlay",
          animation: "pan 10s infinite linear",
        }}
      ></div>

      <style jsx>{`
        @keyframes pan {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        @keyframes bounce-once {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-bounce-once {
          animation: bounce-once 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
