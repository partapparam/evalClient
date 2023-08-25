import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Radar from "radar-sdk-js"
import { useState, useEffect, useCallback, useRef } from "react"
import { useDebounce } from "../../hooks/useDebounce"
import { useDispatch } from "react-redux"
import { resetResidents } from "../residents/residents.slice"
import { addAddress } from "../addresses/address.slice"

export const Search = () => {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const resultsContainer = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const debouncedRequest = useDebounce(() => {
    Radar.autocomplete(
      {
        query: search,
        limit: 8,
        country: "US",
        layer: "fine",
      },
      function (err, result) {
        if (err) {
          console.log("Error with the Radar API", err)
        }
        // console.log(result)
        setResults(result.addresses)
      }
    )
  })

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1)
    setShowResults(false)
  }, [])

  const handleSelection = (selectedIndex) => {
    const selectedItem = results[selectedIndex]
    if (!selectedItem) return resetSearchComplete()
    setSearch("")
    resetSearchComplete()
    dispatch(resetResidents())
    dispatch(addAddress(selectedItem.formattedAddress))
    if (location.pathname === "/") {
      navigate("address/residents")
    } else {
      navigate("residents")
    }
  }

  useEffect(() => {
    if (results && results.length > 0 && !showResults) setShowResults(true)

    if (results && results.length <= 0) setShowResults(false)
  }, [results])

  useEffect(() => {
    if (!resultsContainer.current) return

    resultsContainer.current.scrollIntoView({
      // block: "center",
    })
  }, [focusedIndex])

  // const handleKeyDown = (e) => {
  //   const { key } = e
  //   let nextIndexCount = 0

  //   // move down
  //   if (key === "ArrowDown")
  //     nextIndexCount = (focusedIndex + 1) % results.length

  //   // move up
  //   if (key === "ArrowUp")
  //     nextIndexCount = (focusedIndex + results.length - 1) % results.length

  //   // hide search results
  //   if (key === "Escape") {
  //     resetSearchComplete()
  //   }

  //   // select the current item
  //   if (key === "Enter") {
  //     e.preventDefault()
  //     handleSelection(focusedIndex)
  //   }

  //   setFocusedIndex(nextIndexCount)
  // }

  const onChange = (e) => {
    const query = e.target.value
    setSearch(query)

    debouncedRequest()
  }

  return (
    <div className=" w-full px-3 md:px-0">
      <div
        tabIndex={1}
        onBlur={resetSearchComplete}
        // onKeyDown={handleKeyDown}
        className="relative"
      >
        <input
          className="w-full !px-6 py-3 rounded-sm border-4 text-md  focus:shadow-sm border-violet-300 focus:border-violet-500 duration-400 transition"
          type="text"
          placeholder="Type in an address to search..."
          value={search}
          onChange={onChange}
        />
        {/* search results container */}
        {showResults && results && results.length !== 0 && (
          <div className="absolute text-md  text-left w-full p-2 bg-white shadow-sm rounded-bl rounded-br max-h-56 overflow-y-auto border-x-2 border-b-2">
            {results &&
              results.map((address, index) => {
                return (
                  <div
                    key={index}
                    onMouseDown={() => handleSelection(index)}
                    ref={index === focusedIndex ? resultsContainer : null}
                    className="cursor-pointer hover:bg-violet-300 p-2"
                    style={{
                      backgroundColor: index === focusedIndex ? "#93c5fd" : "",
                    }}
                  >
                    {address.formattedAddress}
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
