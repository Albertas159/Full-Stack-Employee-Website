from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from project.models import Users,Employees,Skill_Level
from project.serializers import UsersSerializer,EmployeesSerializer,Skill_LevelSerializer

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def UsersApi(request,id=0):
    if request.method=='GET':
        User = Users.objects.all()
        User_serializer=UsersSerializer(User,many=True)
        return JsonResponse(User_serializer.data,safe=False)
    elif request.method=='POST':
        User_data=JSONParser().parse(request)
        User_serializer=UsersSerializer(data=User_data)
        if User_serializer.is_valid():
            User_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        User_data=JSONParser().parse(request)
        user=Users.objects.get(UsersID=User_data['UsersID'])
        User_serializer=UsersSerializer(user,data=User_data)
        if User_serializer.is_valid():
            User_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        user=Users.objects.get(UsersID=id)
        user.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def EmployeesApi(request,id=0):
    if request.method=='GET':
        Employee = Employees.objects.all()
        Employee_serializer=EmployeesSerializer(Employee,many=True)
        return JsonResponse(Employee_serializer.data,safe=False)
    elif request.method=='POST':
        employee_data=JSONParser().parse(request)
        Employee_serializer=EmployeesSerializer(data=employee_data)
        if Employee_serializer.is_valid():
            Employee_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        employee_data=JSONParser().parse(request)
        employee=Employees.objects.get(EmployeesID=employee_data['EmployeesID'])
        Employee_serializer=EmployeesSerializer(employee,data=employee_data)
        if Employee_serializer.is_valid():
            Employee_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        employee=Employees.objects.get(EmployeesID=id)
        employee.delete()
        return JsonResponse("Deleted Successfully",safe=False)
        
        
@csrf_exempt
def Skill_LevelApi(request,id=0):
    if request.method=='GET':
        Skill_Levels = Skill_Level.objects.all()
        Skill_Levels_serializer=Skill_LevelSerializer(Skill_Levels,many=True)
        return JsonResponse(Skill_Levels_serializer.data,safe=False)
    elif request.method=='POST':
        Skill_Levels_data=JSONParser().parse(request)
        Skill_Levels_serializer=Skill_LevelSerializer(data=Skill_Levels_data)
        if Skill_Levels_serializer.is_valid():
            Skill_Levels_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        Skill_Levels_data=JSONParser().parse(request)
        Skill_Levels=Skill_Level.objects.get(Skill_Level_ID=Skill_Levels_data['Skill_Level_ID'])
        Skill_Levels_serializer=Skill_LevelSerializer(Skill_Levels,data=Skill_Levels_data)
        if Skill_Levels_serializer.is_valid():
            Skill_Levels_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        Skill_Levels=Skill_Level.objects.get(Skill_Level_ID=id)
        Skill_Levels.delete()
        return JsonResponse("Deleted Successfully",safe=False)
        
@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)
    
#############################################################################################
from django.views.generic.detail import DetailView
from django.core.cache import cache

class CachedDetailView(DetailView):

    def get_queryset(self):
        return super(CachedDetailView, self).get_queryset().select_related()
        
    def get_object(self, queryset = None):
        obj = cache.get('%s-%s' % (self.model.__name__.lower(),self.kwargs['pk']),None)
    
        if not obj:
            obj = super(CachedDetailView, self).get_object(queryset)
            cache.set('%s-%s' % (self.model.__name__.lower(),self.kwargs['pk']),obj)
        return obj
        
class UserDetail(CachedDetailView):
    model = Users
    template_name = 'Users_Detail.html'
    
class EmployeeDetail(CachedDetailView):
    model = Employees
    template_name = 'Employees_Detail.html'
    
class SkillDetail(CachedDetailView):
    model = Skill_Level
    template_name = 'Skill_Level_Detail.html'