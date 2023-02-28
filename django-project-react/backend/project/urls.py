from django.urls import re_path as url, path
from project import views

from django.conf.urls.static import static
from django.conf import settings


urlpatterns=[
    url(r'^Users$',views.UsersApi),
    url(r'^Users/([0-9]+)$',views.UsersApi),


    url(r'^Employees$',views.EmployeesApi),
    url(r'^Employees/([0-9]+)$',views.EmployeesApi),

    
    url(r'^Skill_Level$',views.Skill_LevelApi),
    url(r'^Skill_Level/([0-9]+)$',views.Skill_LevelApi)]
