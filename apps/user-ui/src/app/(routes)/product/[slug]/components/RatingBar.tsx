import React from "react";

interface RatingBarProps {
  rating: number;
  count: number;
  totalReviews: number;
}

const RatingBar: React.FC<RatingBarProps> = ({
  rating,
  count,
  totalReviews,
}) => {
  const percentage = (count / totalReviews) * 100;

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-700 w-2">{rating}</span>
      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#9F1439] h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-[#444342] underline cursor-pointer">
        {count} Reviews
      </span>
    </div>
  );
};

export default RatingBar;
