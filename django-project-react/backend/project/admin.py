from django.contrib import admin
from .models import Users, Employees,Skill_Level



class projectAdmin(admin.ModelAdmin):
    list_display = ('UsersID', 'Username', 'Password')

# Register your models here.

admin.site.register(Users, projectAdmin)

admin.site.register(Employees)
admin.site.register(Skill_Level)

