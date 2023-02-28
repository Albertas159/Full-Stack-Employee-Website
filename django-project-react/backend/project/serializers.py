from rest_framework import serializers
from .models import Users, Employees, Skill_Level

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('UsersID','Username','Password')
        
class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ('EmployeesID','First_Name','Last_Name','DOB','Email','Skill_Level','Active','Age')
        
class Skill_LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill_Level
        fields = ('Skill_Level_ID','Skill_Name','Skill_Description')
        
