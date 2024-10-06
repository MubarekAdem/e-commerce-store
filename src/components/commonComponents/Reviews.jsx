import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [editReviewId, setEditReviewId] = useState(null);
  const [hover, setHover] = useState(null);
  const { currentUser } = useAuth();
  const router = useRouter();
  const { productId } = router.query;

  const fetchReviews = async () => {
    if (!productId) return;

    try {
      const response = await axios.get(`/api/products/${productId}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You need to log in to submit a review");
      return;
    }

    try {
      if (editReviewId) {
        // Update the review
        await axios.put(`/api/products/${productId}/reviews`, {
          reviewId: editReviewId,
          comment,
          rating,
          userId: currentUser._id,
        });
        setEditReviewId(null); // Reset edit mode
      } else {
        // Create a new review
        const res = await axios.post(`/api/products/${productId}/reviews`, {
          comment,
          rating,
          user: {
            id: currentUser._id,
            email: currentUser.email,
          },
        });
        setReviews((prev) => [...prev, res.data.review]);
      }

      setComment("");
      setRating(0);
      fetchReviews(); // Refresh the reviews after submitting
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleEdit = (review) => {
    router.push(`/api/products/${productId}/reviews/${review._id}/edit`);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await axios.delete(`/api/products/${productId}/reviews`, {
        data: {
          reviewId,
          userId: currentUser._id, // Include user ID for authorization
        },
      });
      console.log("Review deleted:", res.data);
      fetchReviews(); // Refresh the reviews after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
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
            {editReviewId ? "Edit Your Review" : "Leave a Comment"}
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
          {editReviewId ? "Update Review" : "Submit Review"}
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
              {currentUser && currentUser._id === review.user.id && (
                <div className="flex space-x-4 mt-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
