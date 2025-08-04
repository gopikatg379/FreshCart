from django.urls import path
from .views import *
urlpatterns = [
    path('add_category',add_category,name='add_category'),
    path('get_category',get_all_categories,name='get_category'),
    path('one_category/<int:id>',get_one_category,name='one_category'),
    path('get_product',get_all_products,name='get_product'),
    path('get_featured',get_featured_products,name='get_featured'),
    path('get_best',get_deal_products,name='get_best'),
    path('get_category_product/<int:id>',get_cat_product,name='get_category_product'),
    path('add_cart/<int:id>',add_to_cart,name='add_cart'),
    path('register',add_user,name='register'),
    path('login',user_login,name='login'),
    path('get_user',user_details,name='get_user'),
    path('view_cart',view_cart,name='view_cart')
]