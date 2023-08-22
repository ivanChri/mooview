import{ Routes,Route,useLocation} from "react-router-dom"
import { AnimatePresence } from 'framer-motion'
import { lazy,Suspense } from 'react'
import Fallback from "./componentAsset/fallback/fallback"
const Home =  lazy(()=>import('./pages/home/home'))
const Detail = lazy(()=>import('./pages/detail/detailPage'))
const ResultPage = lazy(()=>import("./pages/resultPage/searchResultPage/searchResultPage"))
const DiscoverPage = lazy(()=>import('./pages/discover/discover').then(module=>{
  return {default:module.DiscoverPage}
}))
const RegisterPage = lazy(() => import('./pages/register/register'))  
const LoginPage = lazy(() => import('./pages/login/login'))
const ForgetPasswordPage = lazy(() => import('./pages/forgetPassword/forgetPasswordForm'))
const Profile = lazy(() => import('./pages/profile/profile'))
const Dashboard = lazy(() => import('./pages/dashboard/dashboard'))
const EditProfile = lazy(() => import('./pages/dashboard/editProfile/editProfile'))
const EditFavorite = lazy(() => import('./pages/dashboard/editFavorite/editFavorite'))
const EditReview = lazy(() => import('./pages/dashboard/editReview/editReview'))
const History = lazy(() => import('./pages/dashboard/history/history'))
const EditCredential = lazy(() => import('./pages/dashboard/editCredential/editCredential'))
const Logout = lazy(() => import('./pages/dashboard/logout/logout'))
export default function AnimatedRoute(){
  const location = useLocation()
  return(
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Suspense fallback={<Fallback />}><Home /></Suspense>}></Route>
        <Route path='/detail/:media/:id' element={<Suspense fallback={<Fallback />}><Detail /></Suspense>}></Route>
        <Route path='/search/:query' element={<Suspense Fallback={<Fallback />}><ResultPage /></Suspense>}></Route>
        <Route path='/discover/:media' element={<Suspense fallback={<Fallback />}><DiscoverPage /></Suspense>}></Route>
        <Route path='/login' element={<Suspense fallback={<Fallback />}><LoginPage /></Suspense>}></Route>
        <Route path='/register' element={<Suspense fallback={<Fallback />}><RegisterPage /></Suspense>}></Route>
        <Route path='/forget-password' element={<Suspense fallback={<Fallback />}><ForgetPasswordPage /></Suspense>}></Route>
        <Route path='/profile/:sub' element={<Suspense fallback={<Fallback />}><Profile /></Suspense>}></Route>
        <Route path='/dashboard'>
          <Route index element={<Suspense fallback={<Fallback />}><Dashboard /></Suspense>}></Route>
          <Route path='edit-profile' element={<Suspense fallback={<Fallback />}><EditProfile /></Suspense>}></Route>
          <Route path='favorite/:media' element={<Suspense fallback={<Fallback />}><EditFavorite /></Suspense>}></Route>
          <Route path='edit-review' element={<Suspense fallback={<Fallback />}><EditReview /></Suspense>}></Route>
          <Route path='history' element={<Suspense fallback={<Fallback />}><History /></Suspense>}></Route>
          <Route path='edit-credential/:name' element={<Suspense fallback={<Fallback />}><EditCredential /></Suspense>}></Route>
          <Route path='logout' element={<Suspense fallback={<Fallback />}><Logout /></Suspense>}></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  )
}