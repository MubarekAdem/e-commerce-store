import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa"; // Import star icons from react-icons

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null); // For star hover effect
  const { currentUser } = useAuth();
  const router = useRouter();
  const { productId } = router.query; // Get productId from query parameters

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) return; // Return if productId is not available

      try {
        const response = await axios.get(`/api/products/${productId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You need to log in to submit a review");
      return;
    }

    try {
      const res = await axios.post(`/api/products/${productId}/reviews`, {
        comment,
        rating,
        user: {
          id: currentUser._id, // Ensure you send the user ID
          email: currentUser.email, // Include the user's email
        },
      });
      setReviews((prev) => [...prev, res.data.review]);
      setComment(""); // Clear the comment input
      setRating(0); // Reset the rating
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Product Reviews</h2>

      <form onSubmit={handleReviewSubmit} className="mb-8">
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-lg font-medium text-gray-700"
          >
            Leave a Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Write your thoughts here..."
          />
        </div>

        {/* Star Rating System */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Rating
          </label>
          <div className="flex space-x-2 mt-2">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;

              return (
                <FaStar
                  key={index}
                  size={30}
                  className={`cursor-pointer transition-colors duration-200 ${
                    currentRating <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 mt-4 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit Review
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-4">Submitted Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-600">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <ul className="space-y-6">
          {reviews.map((review) => (
            <li
              key={review._id}
              className="border-b pb-4 mb-4 last:border-none"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  {review.user.email}
                </span>
                <span className="flex">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      size={20}
                      className={`${
                        index < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
