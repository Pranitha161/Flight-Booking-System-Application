import { Routes } from '@angular/router';
import { adminGuard } from './auth/admin-guard';
export const routes: Routes = [
  { path: '', redirectTo: 'flights', pathMatch: 'full' },


//   // Auth
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
  { path: 'signup', loadComponent: () => import('./auth/signup/signup').then(m => m.Signup) },

//   // User routes
  { path: 'flights', loadComponent: () => import('./flights/flight-list/flight-list').then(m => m.FlightListComponent ) },
//   { path: 'bookings', loadComponent: () => import('./bookings/booking-list/booking-list.component').then(m => m.BookingListComponent), canActivate: [AuthGuard] },

//   // Admin routes
  { path: 'admin/flights', loadComponent: () => import('./flights/admin-flight-list/admin-flight-list').then(m => m.AdminFlightList), canActivate: [adminGuard] },
    { 
  path: 'search', 
  loadComponent: () => import('./flight-search/flight-search').then(m => m.FlightSearch) 
},{
  path: 'admin/flights/add',
  loadComponent: () => import('./flights/add-flight/add-flight').then(m => m.AddFlight),
  canActivate: [adminGuard]
},
{
  path: 'admin',
  loadComponent: () =>
    import('./flights/admin-flight-list/admin-flight-list').then(m => m.AdminFlightList),
  canActivate: [adminGuard]
},
{
  path: 'admin/flights/edit/:id',
  loadComponent: () =>
    import('./flights/edit-flight/edit-flight').then(m => m.EditFlight),
  canActivate: [adminGuard]
}
,

{
  path: 'profile',
  loadComponent:()=>import('./profile/profile').then(m=>m.Profile)
},

  { path: '**', redirectTo: 'flights' }
];

