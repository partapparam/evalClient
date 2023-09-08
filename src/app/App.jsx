import "./App.css"
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../features/home/Home"
import { LoginForm } from "../features/auth/Login"
import { SignupForm } from "../features/auth/Signup"
import { LandingPage } from "../common/LandingPage"
import { AddressResults } from "../features/addresses/AddressResults"
import { ResidentList } from "../features/residents/ResidentList"
import { Profile } from "../features/auth/Profile"
import { ResidentDetail } from "../features/residents/ResidentDetail"
import { ReviewsList } from "../features/reviews/ReviewsList"
import { RequiredAuth } from "../features/auth/RequiredAuth"
import { UserProvider } from "../providers/UserContext"
import { NotificationProvider } from "../providers/NotificationProvider"
import { ResidentForm } from "../features/residents/ResidentForm"
import { ForgotPasswordForm } from "../features/auth/ForgotPasswordForm"
import { ForgotPassword } from "../features/auth/ForgotPassword"
import { ForgotPasswordConfirm } from "../features/auth/ForgotPasswordConfirm"
import { UpdatePasswordForm } from "../features/auth/UpdatePasswordForm"
import { FAQ } from "../features/FAQ/FAQ"
import { AddressDetail } from "../features/addresses/AddressDetail"
import { ReviewForm } from "../features/reviews/ReviewForm"

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <BrowserRouter>
          <div className="h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />}>
                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<SignupForm />} />
                <Route path="forgotPassword" element={<ForgotPassword />}>
                  <Route
                    path="form/success"
                    element={<ForgotPasswordConfirm />}
                  />
                  <Route path="reset" element={<UpdatePasswordForm />} />
                  <Route index element={<ForgotPasswordForm />} />
                </Route>
                <Route path="address/residents" element={<AddressDetail />}>
                  <Route
                    path="add"
                    element={
                      <RequiredAuth>
                        <ResidentForm />
                      </RequiredAuth>
                    }
                  />
                  <Route
                    path="profile"
                    element={
                      <RequiredAuth>
                        <ResidentDetail />
                      </RequiredAuth>
                    }
                  >
                    <Route
                      path="add/review"
                      element={
                        <RequiredAuth>
                          <ReviewForm />
                        </RequiredAuth>
                      }
                    />
                    <Route
                      index
                      element={
                        <RequiredAuth>
                          <ReviewsList />
                        </RequiredAuth>
                      }
                    />
                  </Route>
                  <Route index element={<AddressResults />} />
                </Route>

                <Route
                  path="profile"
                  element={
                    <RequiredAuth>
                      <Profile />
                    </RequiredAuth>
                  }
                />
                <Route path="faq" element={<FAQ />} />

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
