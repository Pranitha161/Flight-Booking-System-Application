import { Routes } from '@angular/router';
import { adminGuard } from './auth/admin-guard';

export const routes: Routes = [
  // { path: '**', redirectTo: 'flights' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
  { path: 'signup', loadComponent: () => import('./auth/signup/signup').then(m => m.Signup) },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home)
  },
  { 
    path: 'flights', 
    loadComponent: () => import('./flights/flight-list/flight-list').then(m => m.FlightListComponent) 
  },
  { 
    path: 'admin/flights', 
    loadComponent: () => import('./flights/admin-flight-list/admin-flight-list').then(m => m.AdminFlightList), canActivate: [adminGuard] 
  },
  {
    path: 'search',
    loadComponent: () => import('./flight-search/flight-search').then(m => m.FlightSearch)
  },
  {
    path: 'admin/flights/add',
    loadComponent: () => import('./flights/add-flight/add-flight').then(m => m.AddFlight),
    canActivate: [adminGuard]
  },
  {
    path: 'admin',
    loadComponent: () =>import('./flights/admin-flight-list/admin-flight-list').then(m => m.AdminFlightList),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/flights/edit/:id',
    loadComponent: () =>import('./flights/edit-flight/edit-flight').then(m => m.EditFlight),
    canActivate: [adminGuard]
  }, 
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then(m => m.Profile)
  },
  {
    path: 'admin/airlines',
    loadComponent: () => import('./airlines/admin-airline-list/admin-airline-list').then(m => m.AdminAirlineList),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/airlines/add',
    loadComponent: () => import('./airlines/admin-add-airline/admin-add-airline').then(m => m.AdminAddAirline),
    canActivate: [adminGuard]
  },
  {
    path: 'add',
    loadComponent: () => import('./booking/add-booking/add-booking').then(m => m.AddBooking),
  },
  {
    path: 'payment',
    loadComponent: () => import('./booking/payment/payment').then(m => m.Payment),
  },
  {
    path: 'history',
    loadComponent: () => import('./booking/user-bookings/user-bookings').then(m => m.UserBookings)
  },
  {
    path:'delete',
    loadComponent:()=>import('./booking/delete-booking/delete-booking').then(m=>m.DeleteBooking)
  }
];

