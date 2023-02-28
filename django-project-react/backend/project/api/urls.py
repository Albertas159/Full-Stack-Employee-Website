from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),


    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('EmployeeView/',views.EmployeeView.as_view(), name='EmployeeView'),
    path('EmployeeView/<int:id>/',views.EmployeeView.as_view(), name='EmployeeView'),
    path('SkillLevelView/',views.SkillLevelView.as_view(), name='SkillLevelView'),
    path('SkillLevelView/<int:id>/',views.SkillLevelView.as_view(), name='SkillLevelView'),
    path('UserView/',views.UserView.as_view(), name='UserView'),
    path('UserView/<int:id>/',views.UserView.as_view(), name='UserView')
]