export default function Hero() {
  return (
    <section
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: 'url("/hero-image.jpg")' }}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-grey animate-bounce">
          Shop the Latest Trends
        </h1>
        <p className="text-lg text-gray mt-4">
          Find the perfect outfit for any occasion
        </p>
        <button className="mt-6 px-8 py-3 bg-blue-600 text-grey font-semibold rounded-full hover:bg-blue-500 transition transform hover:scale-110">
          Shop Now
        </button>
      </div>
    </section>
  );
}
