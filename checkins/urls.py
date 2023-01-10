from django.contrib import admin
from django.urls import path, include
from checkins import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('session', views.SessionViewSet)
router.register('session_history', views.SessionHistoryViewSet)
router.register('user', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('', views.index, name='index'),
    path('signup/', views.signup, name = "signup"),
    path('signin/', views.signin, name = "signin"),
    path('logout/', views.logout, name = "logout"),
    # path('session/create', views.session_create, name = "session_create"),
    # path('session/<str:session_id>/', views.session_home, name = "session_home"),
    # path('session/<str:session_id>/apply', views.session_apply, name = "session_apply"),
    # path('session/<str:session_id>/camera/', views.session_camera, name = "session_camera"),
    # path('<str:session_id>/checkin/<str:member_id>/', views.session_checkin, name = "session_checkin"),
    path('myqr/', views.qr_get, name = "qr_get"),
]
