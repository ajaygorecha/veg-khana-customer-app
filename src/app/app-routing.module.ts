import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'subcategory/:categoryid/:title',
    loadChildren: () => import('./subcategory/subcategory.module').then( m => m.SubcategoryPageModule)
  },
  {
    path: 'products/:category/:subcategory/:title',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'aboutus/:pgtype',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'offers/:pgtype',
    loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'myacount/:status',
    loadChildren: () => import('./myacount/myacount.module').then( m => m.MyacountPageModule)
  },
  {
    path: 'myorders',
    loadChildren: () => import('./myorders/myorders.module').then( m => m.MyordersPageModule)
  },
  {
    path: 'orderdetails/:orderid/:pagetype',
    loadChildren: () => import('./orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'itemdetails',
    loadChildren: () => import('./itemdetails/itemdetails.module').then( m => m.ItemdetailsPageModule)
  },
  {
    path: 'mycart',
    loadChildren: () => import('./mycart/mycart.module').then( m => m.MycartPageModule)
  },
  {
    path: 'addressbook/:pgtype',
    loadChildren: () => import('./addressbook/addressbook.module').then( m => m.AddressbookPageModule)
  },
  {
    path: 'addaddress',
    loadChildren: () => import('./addaddress/addaddress.module').then( m => m.AddaddressPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'thankyou/:orderid',
    loadChildren: () => import('./thankyou/thankyou.module').then( m => m.ThankyouPageModule)
  },
  {
    path: 'catering',
    loadChildren: () => import('./catering/catering.module').then( m => m.CateringPageModule)
  },
  {
    path: 'listviews/:pgtype',
    loadChildren: () => import('./listviews/listviews.module').then( m => m.ListviewsPageModule)
  },
  {
    path: 'profileupdate',
    loadChildren: () => import('./profileupdate/profileupdate.module').then( m => m.ProfileupdatePageModule)
  },
  {
    path: 'teams/:pgtype',
    loadChildren: () => import('./teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'writereview',
    loadChildren: () => import('./writereview/writereview.module').then( m => m.WritereviewPageModule)
  },
  {
    path: 'nonetwork',
    loadChildren: () => import('./nonetwork/nonetwork.module').then( m => m.NonetworkPageModule)
  },
  {
    path: 'extras',
    loadChildren: () => import('./extras/extras.module').then( m => m.ExtrasPageModule)
  },
  {
    path: 'variation',
    loadChildren: () => import('./variation/variation.module').then( m => m.VariationPageModule)
  },
  {
    path: 'itmoptions',
    loadChildren: () => import('./itmoptions/itmoptions.module').then( m => m.ItmoptionsPageModule)
  },
  {
    path: 'itemsearch',
    loadChildren: () => import('./itemsearch/itemsearch.module').then( m => m.ItemsearchPageModule)
  },
  {
    path: 'mealdeal',
    loadChildren: () => import('./mealdeal/mealdeal.module').then( m => m.MealdealPageModule)
  },
  {
    path: 'bookbuffet',
    loadChildren: () => import('./bookbuffet/bookbuffet.module').then( m => m.BookbuffetPageModule)
  },
  {
    path: 'bookabuffet',
    loadChildren: () => import('./bookabuffet/bookabuffet.module').then( m => m.BookabuffetPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
