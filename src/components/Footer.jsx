export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 My E-Commerce. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="hover:text-gray-400">
            Facebook
          </a>
          <a href="#" className="hover:text-gray-400">
            Twitter
          </a>
          <a href="#" className="hover:text-gray-400">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
