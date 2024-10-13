export default function ProductFeatures() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Product 1", "Product 2", "Product 3"].map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">{product}</h3>
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
