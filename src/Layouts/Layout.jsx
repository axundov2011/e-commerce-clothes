
import { isAdmin } from '../config/isAdmin';
import AdminLayout from './AdminLayout';
import MainLayout from './MainLayout'
//Burada ise deyirik ki eger isAdmin true dirse AdminLayout false dirse MainLoyaouta get.
export const Layout =  isAdmin ? AdminLayout : MainLayout;
export default Layout
