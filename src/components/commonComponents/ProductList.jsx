import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useRouter } from "next/router";
import axios from "axios";
import { Card, Button, Modal, notification } from "antd";

const ProductList = () => {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    if (!currentUser) {
      router.push("/login");
    } else {
      fetchProducts();
    }
  }, [currentUser, router]);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(
        products.filter((product) => product._id.toString() !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      await axios.post(
        "/api/cart",
        { productId: product._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      notification.success({
        message: "Success",
        description: `${product.name} has been added to your cart.`,
        placement: "topRight",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to add product to cart. Please try again.",
        placement: "topRight",
      });
    }
  };

  const handleViewReviews = (productId) => {
    router.push({
      pathname: "/reviews",
      query: { productId },
    });
  };

  const showImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedImage("");
  };

  return (
    <div
      className="p-6 bg-gray-100"
      style={{
        marginTop: "64px",
        overflowY: "auto",
        height: "calc(100vh - 64px)",
      }}
    >
      <style jsx>{`
        @media (min-width: 1024px) {
          .product-list-container {
            margin-left: 235px; /* Space for the sidebar in desktop mode */
            width: calc(100% - 200px); /* Adjust width to account for sidebar */
          }
        }

        @media (max-width: 1023px) {
          .product-list-container {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>
      <div className="product-list-container">
        {products.length === 0 ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Card
                key={product._id}
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.imageUrl}
                    onClick={() => showImage(product.imageUrl)}
                    className="object-cover h-48 w-full"
                  />
                }
                className="bg-white"
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <div>
                      <p>{product.description}</p>
                      <div className="text-green-600 font-semibold text-lg">
                        ${product.price}
                      </div>
                      {Array.isArray(product.variants) &&
                        product.variants.length > 0 && (
                          <div className="mt-3">
                            <h4 className="font-semibold text-gray-700">
                              Variants:
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {product.variants.map((variant, index) => (
                                <div
                                  key={index}
                                  className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md"
                                >
                                  <p>Size: {variant.size}</p>
                                  <p>Color: {variant.color}</p>
                                  <p>Stock: {variant.stock}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  }
                />
                <div className="mt-4 flex justify-between">
                  {currentUser.role === "admin" ? (
                    <>
                      <Button
                        type="primary"
                        onClick={() =>
                          router.push(`/edit-product/${product._id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        type="default"
                        onClick={() => handleViewReviews(product._id)}
                      >
                        View Reviews
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal visible={visible} footer={null} onCancel={handleCancel} centered>
        <img alt="Full Size" src={selectedImage} style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};

export default ProductList;
