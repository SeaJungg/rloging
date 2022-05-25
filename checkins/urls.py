from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.signup, name = "signup"),
    path('signin/', views.signup, name = "signin"),
    path('logout/', views.logout, name = "logout"),
    path('myqr/<str:member_id>/', views.get_qr, name = "get_qr")
]