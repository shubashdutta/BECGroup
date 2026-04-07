/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { type FC } from "react";
import { FaTimes } from "react-icons/fa";

interface ImageItem {
  id: number;
  path: string;
  [key: string]: any;
}

interface ImagePath {
  path: ImageItem[];
  onRemoveImage?: (id: number) => void;
}

const ImagePreviewRemove: FC<ImagePath> = ({ path, onRemoveImage }) => {
  return (
    <div className="flex items-center justify-start my-2  gap-3 flex-wrap">
      {path?.map((item, index) => {
        const { id, path: src } = item;

        return (
          <div className=" flex items-center justify-center">
            <div key={id} className="relative   w-full h-20  rounded  mb-2">
              <img
                src={src}
                alt={`Preview ${index}`}
                loading="lazy"
                className="w-full h-full object-cover rounded"
              />
              {onRemoveImage && (
                <button
                  type="button"
                  onClick={() => onRemoveImage(id)}
                  style={{ borderRadius: "50%" }}
                  className="absolute cursor-pointer -top-1 -right-1 w-5 h-5 bg-red-600 text-white flex items-center justify-center"
                  title="Remove image"
                >
                  <FaTimes className="text-sm" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImagePreviewRemove;
