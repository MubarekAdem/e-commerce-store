// components/EditReview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

const EditReview = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const { currentUser } = useAuth();
  const router = useRouter();
  const { productId, reviewId } = router.query; // Get productId and reviewId from query parameters

  useEffect(() => {
    const fetchReview = async () => {
      if (!reviewId || !productId) return;

      try {
        const response = await axios.get(`/api/products/${productId}/reviews`);
        const review = response.data.find((r) => r._id === reviewId);
        if (review) {
          setComment(review.comment);
          setRating(review.rating);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    fetchReview();
  }, [reviewId, productId]);

  const handleReviewUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/api/products/${productId}/reviews`, {
        reviewId,
        comment,
        rating,
        userId: currentUser._id, // Send the user ID for authorization
      });
      router.push(`/products/${productId}/reviews`); // Redirect after successful update
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Edit Review</h2>

      <form onSubmit={handleReviewUpdate} className="mb-8">
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-lg font-medium text-gray-700"
          >
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Edit your comment here..."
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
                <span
                  key={index}
                  className={`cursor-pointer transition-colors duration-200 ${
                    currentRating <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                >
                  ★
                </span>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 mt-4 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition duration-300"
        >
          Update Review
        </button>
      </form>
    </div>
  );
};

export default EditReview;
