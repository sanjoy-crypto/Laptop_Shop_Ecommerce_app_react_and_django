from django.urls import path, include
from .views import *
from rest_framework import routers



urlpatterns = [


    path('products/', ProductView.as_view(), name="products"),
    path('products/<int:id>/', ProductView.as_view(), name="products"),

    path('category/', CategoryView.as_view(), name="category"),
    path('category/<int:pk>/', CategoryDetailView.as_view(), name="category_details"),

    path('profile/',ProfileView.as_view(),name="profile"),
    path('updateprofile/',updateProfile.as_view(),name="updateprofile"),
    path('updateprofileimage/',updateProfileImage.as_view(),name="updateprofileimage"),

    path('cart/',Mycart.as_view(),name="cart"),
    path('oldorders/',OldOrders.as_view(),name="oldorders"),
    path('oldorderscreate/',OldOrdersCreate.as_view(),name="oldorderscreate"),
    path('orderdetails/<int:id>/',OldOrdersDetails.as_view(),name="orderdetails"),
    path('oldordersdelete/<int:id>/',OldOrdersDelete.as_view(),name="oldordersdelete"),

    path('addtocart/',AddToCart.as_view(),name="addtocart"),
    path('updatecart/',UpdateCart.as_view(),name="updatecart"),
    path('editcart/',EditCart.as_view(),name="editcart"),
    path('deletecart/',DeleteCart.as_view(),name="deletecart"),

    path('deletefullcart/',DeleteFullCart.as_view(),name="deletefullcart"),
    path('register/',RegisterView.as_view(),name="register"),

 
]
