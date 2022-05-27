from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<str:session_id>/camera/', views.camera, name = "camera"),
    path('<str:session_id>/checkin/<str:member_id>/', views.checkin, name = "checkin"),
    path('signup/', views.signup, name = "signup"),
    path('signin/', views.signin, name = "signin"),
    path('logout/', views.logout, name = "logout"),
    path('create/', views.create_session, name = "create_session"),
    path('myqr/', views.get_qr, name = "get_qr"),
    path('read/', views.read_qr, name = "read_qr")
]