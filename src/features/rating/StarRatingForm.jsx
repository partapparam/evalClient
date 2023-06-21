import React from "react"
import { useState } from "react"

/**
 *
 * Secondary parameter defines if this less important rating input. Main rating system for customer will be Gold, all others are black.
 */
export const StarRatingForm = ({ value, onChange, secondary }) => {
  const [hover, setHover] = useState(0)

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type="button"
            key={index}
            className={
              index <= ((value && hover) || hover) && secondary
                ? "text-gray-800 transition-all"
                : index <= ((value && hover) || hover)
                ? "text-yellow-500 transition-all"
                : "text-gray-300"
            }
            onClick={() => onChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(value)}
          >
            {!secondary ? (
              <span className="text-2xl px-1">&#9733;</span>
            ) : (
              <span className="text-xl px-1">&#9733;</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
