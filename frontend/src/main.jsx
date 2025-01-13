import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter ,createBrowserRouter , RouterProvider  } from "react-router-dom";
import LandingPage from './components/LandingPage.jsx';
import RegisterManager from './components/HospitalAuth/RegisterHosiptalManager.jsx';
import LoginManager from "./components/HospitalAuth/LoginHospitalManager.jsx"
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import LoginPantry from './components/PantryAuth/LoginPantry.jsx';
import RegisterPantry from './components/PantryAuth/RegisterPantry.jsx';
import RegisterDeliveryPerson from './components/DeliveryManAuth/RegisterDeliveryMan.jsx';
import LoginDeliveryPerson from './components/DeliveryManAuth/LoginDeliveryMan.jsx';
import PantryDashBoard from './components/PantryDashBoard.jsx';
import PantryInfo from './components/PantryDashBoard/PantryInfo.jsx';
import MealDeliveriesList from './components/PantryDashBoard/MealDelivery.jsx';
import OrderList from './components/PantryDashBoard/OrderList.jsx';
import DeliveryPersonsList from './components/PantryDashBoard/DeliveryPerson.jsx';
import HospitalDashBoard from './components/HospitalDashBoard.jsx';
import PantryList from './components/HospitalDashBoard/Pantries.jsx';
import MealDeliveries from './components/HospitalDashBoard/Mealdelivereis.jsx';
import Patients from './components/HospitalDashBoard/Patients.jsx';
import DietChart from './components/HospitalDashBoard/DietChart.jsx';
import PatientDashBoard from './components/PatientDashBoard.jsx';
import MealDeliveryHistory from './components/PatientDashBoard/MealDelivery.jsx';
import UpcomingMeals from './components/PatientDashBoard/UpcomingMeals.jsx';
import MakeOrder from './components/PatientDashBoard/MakeOrder.jsx';
import UpdateProfile from './components/PatientDashBoard/UpdateProfile.jsx';
import AddDietChart from './components/PatientDashBoard/DietChart.jsx';
import DeliveryManDashBoard from './components/DeliveryManDashBoard.jsx';
import OrderHistory from './components/DeliveryManDashBoard/OrderHistory.jsx';
import NewOrders from './components/DeliveryManDashBoard/NewOrder.jsx';
import PendingTasks from './components/DeliveryManDashBoard/PendingTasks.jsx';



const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>,
      },{
        path:"/manager-login",
        element:<LoginManager/>
      },{
        path:"/manager-register",
        element:<RegisterManager/>
      },{
        path:"/pantry-login",
        element:<LoginPantry/>
      },{
        path:"/pantry-register",
        element:<RegisterPantry/>
      },{
        path:"/delivery-register",
        element:<RegisterDeliveryPerson/>
      },{
        path:"/delivery-login",
        element:<LoginDeliveryPerson/>
      },{
        path:"/pantry/dashboard",
        element:<PantryDashBoard/>,
        children:[
          {
            path:"/pantry/dashboard/",
            element:<PantryInfo/>
          },
          {
            path:"/pantry/dashboard/meal-deliveries",
            element:<MealDeliveriesList/>
          },{
            path:"/pantry/dashboard/orders",
            element:<OrderList/>
          },{
            path:"/pantry/dashboard/delivery-persons",
            element:<DeliveryPersonsList/>
          }
        ]

      },{
        path:"/hospitalManager/dashboard",
        element:<HospitalDashBoard/>,
        children:[
          {
            path:"/hospitalManager/dashboard/",
            element:<PantryList/>
          },{
            path:"/hospitalManager/dashboard/meal-deliveries",
            element:<MealDeliveries/>
          },{
            path:"/hospitalManager/dashboard/patients",
            element:<Patients/>
          },
          {
            path:"/hospitalManager/dashboard/diet-charts",
            element:<DietChart/>
          },
        ]
      },
      {
        path:"/hospitalManager/dashboard/patient/:patientId",
        element:<PatientDashBoard/>,
        children:[
          {
            path:"/hospitalManager/dashboard/patient/:patientId",
            element:<MealDeliveryHistory/>
          },{
            path:"/hospitalManager/dashboard/patient/:patientId/upcoming",
            element:<UpcomingMeals/>
          },{
            path:"/hospitalManager/dashboard/patient/:patientId/make-order",
            element:<MakeOrder/>
          },{
            path:"/hospitalManager/dashboard/patient/:patientId/update-profile",
            element:<UpdateProfile/>
          },{
            path:"/hospitalManager/dashboard/patient/:patientId/diet-chart",
            element:<AddDietChart/>
          }
        ]
      },{
        path:'/delivery/dashboard',
        element:<DeliveryManDashBoard/>,
        children:[
          {
            path:"/delivery/dashboard/",
            element:<OrderHistory/>
          },{
            path:"/delivery/dashboard/new-orders",
            element:<NewOrders/>
          },{
            path:"/delivery/dashboard/pending-tasks",
            element:<PendingTasks/>
          }
        ]
      }
    ]
  
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
