// "use client";

// import React from "react";
// import { Package } from "lucide-react";

// export default function ActionButtons() {
//   return (
//     <div className="flex justify-end gap-4 mt-8">
//       <button className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
//         Save as Draft
//       </button>
//       <button className="flex items-center px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg">
//         <Package className="w-4 h-4 mr-2" />
//         Create Product
//       </button>
//     </div>
//   );
// }

"use client";

import React from "react";
import { Package, Loader2 } from "lucide-react";

interface ActionButtonsProps {
  isLoading?: boolean;
}

export default function ActionButtons({ isLoading }: ActionButtonsProps) {
  return (
    <div className="flex justify-end gap-4 mt-8">
      <button
        type="button"
        className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
        onClick={() => alert("Draft saved (you can wire logic later)")}
      >
        Save as Draft
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Package className="w-4 h-4 mr-2" />
        )}
        {isLoading ? "Creating..." : "Create Product"}
      </button>
    </div>
  );
}
