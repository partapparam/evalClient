import "./App.css"
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../features/home/Home"
import { LoginForm } from "../features/auth/Login"
import { SignupForm } from "../features/auth/Signup"
import { LandingPage } from "../common/LandingPage"
import { AddressSearch } from "../features/addresses/AddressResults"
import { ResidentList } from "../features/residents/ResidentList"
import { Profile } from "../features/auth/Profile"
import { ResidentDetail } from "../features/residents/ResidentDetail"
import { ReviewsList } from "../features/reviews/ReviewsList"
import { RequiredAuth } from "../features/auth/RequiredAuth"
import { UserProvider } from "../providers/UserContext"
import { NotificationProvider } from "../providers/NotificationProvider"
import { Notification } from "../common/components/Notification"
import { ResidentForm } from "../features/residents/ResidentForm"

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <BrowserRouter>
          <div className="App">
            <Notification />
            <Routes>
              <Route path="/" element={<LandingPage />}>
                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<SignupForm />} />
                {/* <RequiredAuth> */}
                <Route path="address" element={<AddressSearch />}>
                  <Route path="residents" element={<ResidentList />} />
                  <Route path="resident/new" element={<ResidentForm />} />
                </Route>
                <Route
                  path="address/residents/:residentId"
                  element={
                    <RequiredAuth>
                      <ResidentDetail />
                    </RequiredAuth>
                  }
                >
                  <Route
                    index
                    element={
                      <RequiredAuth>
                        <ReviewsList />
                      </RequiredAuth>
                    }
                  />
                </Route>
                <Route
                  path="profile"
                  element={
                    <RequiredAuth>
                      <Profile />
                    </RequiredAuth>
                  }
                />

                <Route index element={<Home />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NotificationProvider>
    </UserProvider>
  )
}

export default App
