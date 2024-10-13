export default function Testimonials() {
  return (
    <section className="py-12 bg-blue-600 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
        <div className="flex flex-wrap justify-center space-x-8">
          {["John Doe", "Jane Smith", "Michael Lee"].map((name, index) => (
            <div
              key={index}
              className="w-64 p-4 bg-white text-gray-900 rounded-lg shadow-lg transform transition hover:scale-105"
            >
              <p className="mb-4">"Amazing service and top-notch quality!"</p>
              <h4 className="font-semibold">{name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
