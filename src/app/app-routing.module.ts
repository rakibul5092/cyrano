import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { UserLoggedInGuard } from './_guards/user-logged-in.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: (): Promise<any> => import('./modules/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
    data: {
      title: 'Home',
    },
  },
  {
    path: 'privacy-term',
    loadChildren: (): Promise<any> => import('./modules/privacy-terms/privacy-terms.module').then((m) => m.PrivacyTermsModule),
  },
  {
    path: 'courses',
    loadChildren: (): Promise<any> => import('./modules/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'unmatched',
    loadChildren: (): Promise<any> => import('./modules/unmatched/unmatched.module').then((m) => m.UnmatchedModule),
  },
  {
    path: 'user-registration',
    data: {
      showFooter: false,
    },
    loadChildren: (): Promise<any> => import('./modules/user-registration/user-registration.module').then((m) => m.UserRegistrationModule),
  },
  {
    path: 'guru',
    loadChildren: (): Promise<any> => import('./modules/guru/guru.module').then((m) => m.GuruModule),
  },
  {
    path: '',
    loadChildren: (): Promise<any> => import('./modules/splash/splash.module').then((m) => m.SplashModule),
  },
  {
    path: 'admin',
    loadChildren: (): Promise<any> => import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'guru-services',
    loadChildren: (): Promise<any> => import('./modules/guru/guru-services/guru-services.module').then((m) => m.GuruServicesModule),
  },
  {
    path: 'guru-registration',
    loadChildren: (): Promise<any> => import('./modules/guru/guru-registration/guru-registration.module').then((m) => m.GuruRegistrationModule),
  },
  {
    path: 'calendar',
    loadChildren: (): Promise<any> => import('./modules/calendar/calendar.module').then((m) => m.CalendarModule),
  },
  {
    path: '',
    loadChildren: (): Promise<any> => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    data: {
      title: 'auth',
      showFooter: false,
      meta: [{ name: 'description', content: 'authenticate' }],
    },
    canActivate: [UserLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
