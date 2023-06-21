import React from "react"
import { Search } from "../search/SearchBar"
import { ClipboardIcon } from "@heroicons/react/24/solid"
import { useNotification } from "../../hooks/useNotification"

export const Home = () => {
  const { addNotification } = useNotification()

  return (
    <div className="h-screen">
      <div
        className="bg-gradient-to-b from-purple-800 via-purple-500 to-orange-300
       h-full grid grid-rows-2 w-full grid-cols-12"
      >
        <div className="rows-span-1 self-end justify-self-center col-span-12">
          <img
            src={process.env.REACT_APP_LOGO_URL}
            className="w-48 h-48"
            alt="logo"
          />
        </div>
        <div className="rows-span-1 min-w-3/4	col-start-1 col-end-13 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10">
          <Search />
        </div>
      </div>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              A better way to choose your clients
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Eval was created by a group with more than 20 years in the home
              service industry. From this experience, Eval was born to help with
              the unknown factors of working with new clients.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <ClipboardIcon className="h-6 w-6 text-blue-800" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-xl leading-6 font-bold text-gray-900">
                    Why use Eval?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    1. Our first mission is to give home service employees a
                    voice. Businesses though out the country are constantly
                    being reviewed on multiple platforms. We hear more and more
                    stories of companies being extorted over online reviews.
                    Eval is here to help you avoid terrible customers and find
                    more customers that fall into the good and great categories
                    <br />
                    <br />
                    2. Our second mission is to help businesses with their most
                    significant unknown factor when bidding on a job; what will
                    it be like to work with this prospect? Home service
                    providers are very good at determining the time and
                    materials a job will require. However, it is impossible to
                    know if the customer will be why the job goes great or
                    horribly.
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <ClipboardIcon className="h-6 w-6 text-blue-800" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-xl leading-6 font-bold text-gray-900">
                    When should you Eval a customer?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    For Eval to work, we need users to review as many customers
                    as possible. We all tend to only post bad experiences;
                    however, for the platform to be helpful positive reviews
                    will be even more important. Imagine a day when your
                    customers ask you for reviews just like you ask them.
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <ClipboardIcon className="h-6 w-6 text-blue-800" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-xl leading-6 font-bold text-gray-900">
                    How will Eval help companies?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    With the widespread adoption of users, companies can get a
                    sense of the customer they are dealing with before they even
                    arrive at the address. Eval will only be able to accomplish
                    this if you, the user, help us spread the word and post as
                    many legitimate reviews as possible.
                  </dd>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <ClipboardIcon className="h-6 w-6 text-blue-800" />
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-xl leading-6 font-bold text-gray-900">
                    Who should I write reviews about?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Anyone that you are requesting work from your company. If
                    you give an estimate to a prospect and your experience with
                    them is good, write them a review. Remember, a prospect
                    choosing not to purchase from you doesn’t necessarily mean
                    they deserve a bad review.
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
