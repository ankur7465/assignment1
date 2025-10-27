import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      setError("");
    } catch (err) {
      setError("Failed to fetch products 😢");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        🛍️ Product Explorer
      </h1>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow hover:shadow-lg p-4 transition"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-gray-600 text-sm">💰 ${p.price}</p>
            <p className="text-yellow-600 text-sm">⭐ {p.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
