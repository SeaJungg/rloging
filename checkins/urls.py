from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.signup, name = "signup"),
    path('signin/', views.signin, name = "signin"),
    path('logout/', views.logout, name = "logout"),
    path('create/', views.create_session, name = "create_session"),
    path('myqr/<str:member_id>/', views.get_qr, name = "get_qr")
]