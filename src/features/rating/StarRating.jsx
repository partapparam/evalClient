import React from "react"
import { useState } from "react"

export const StarRating = ({ rate, secondary }) => {
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <span
            key={index}
            className={
              index <= rate && secondary
                ? "text-gray-800 transition-all"
                : index <= rate && !secondary
                ? "text-yellow-500 transition-all"
                : "text-gray-300"
            }
          >
            {!secondary ? (
              <span className="text-2xl px-1">&#9733;</span>
            ) : (
              <span className="text-xl px-1">&#9733;</span>
            )}
          </span>
        )
      })}
    </div>
  )
}
