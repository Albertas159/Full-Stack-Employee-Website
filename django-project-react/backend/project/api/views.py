from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from.serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth import get_user_model
from .serializers import UsersSerializer, EmployeesSerializer,Skill_LevelSerializer
from project.models import Users, Employees, Skill_Level
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.parsers import JSONParser

## token generated inside the djangorestframework_simplejwt
## needs username and password to allow the creation of the token
## the data gets encoded into a jwt string
## cotains the id and time/expiration
## signed using a secret key
## returned to the 'token'

# class TokenObtainPairSerializer(Serializer):
#     @classmethod
#     def get_token(cls, user):
#         token = {
#             'user_id': str(user.pk),
#             'email': user.email,
#             'iat': datetime.utcnow(),
#         }
#         return jwt.encode(token, settings.SECRET_KEY, algorithm='HS256')

## generates token based on user,time,email then encoded with HS256 and a security key is applied
        
## can impement and change above parameters to specification but leaving default here
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
        
        ## The parent class generates the JWT by encoding a header, payload and signature with a secret key. 
## The header contains information such as the algorithm used to sign the JWT, while the payload contains the user claims, such as the username and email. 
##The signature is a hash of the header and payload, encrypted with a secret key.

## In this class, the method adds custom claims (username and email) to the JWT by adding key-value pairs to the token object. Finally, the method returns the token.

## Below is how the token is being generated within the parent class of get_token
# class AccessToken(Token):
#     class Meta:
#         verbose_name = _('Access token')

#     @staticmethod
#     def for_user(user):
#         payload = {
#             'user_id': user.pk,
#             settings.AUTH_USER_MODEL.lower(): user.pk,
#             'exp': datetime.utcnow() + settings.ACCESS_TOKEN_LIFETIME,
#         }
#         token = jwt.encode(payload, settings.SECRET_KEY, settings.ALGORITHM)

#         return AccessToken(
#             user=user,
#             token=token,
#         )


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


## CRUD OPERATIONS FOR USER EMPLOYEES AND SKILL LEVEL ####

class EmployeeView(APIView):
    permission_classes= (IsAuthenticated,)
    def get(self, request, id=None):
        if id:
            item = Employees.objects.get(EmployeesID=id)
            serializer = EmployeesSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)

        items = Employees.objects.all()
        serializer = EmployeesSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    
    def post(self, request):
        serializer = EmployeesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
            
    def delete(self, request, id=None):
        item = get_object_or_404(Employees, EmployeesID=id)
        item.delete()
        return Response({"status": "success", "dataEmp": "Item Deleted"}, status=status.HTTP_200_OK)
        
    def put(self, request):
        employee_data=JSONParser().parse(request)
        employee=Employees.objects.get(EmployeesID=employee_data['EmployeesID'])
        Employee_serializer=EmployeesSerializer(employee,data=employee_data)
        if Employee_serializer.is_valid():
            Employee_serializer.save()
            return JsonResponse("Updated Successfully",safe=False, status=status.HTTP_200_OK)
        return JsonResponse("Failed to Update" , status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    permission_classes= (IsAuthenticated,)
    def get(self, request, id=None):
        skill = request.query_params.get('skill')
        if id:
            item = Users.objects.get(UsersID=id)
            serializer = UsersSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        if skill:
            items = Employees.objects.filter(skills__skill=skill)
        else:
            items = Employees.objects.all()
        items = Users.objects.all()
        serializer = UsersSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
            
    def delete(self, request, id=None):
        item = get_object_or_404(Users, UsersID=id)
        item.delete()
        return Response({"status": "success", "dataEmp": "Item Deleted"})
        
    def put(self, request):
        employee_data=JSONParser().parse(request)
        employee=Users.objects.get(UsersID=employee_data['UsersID'])
        Employee_serializer=UsersSerializer(employee,data=employee_data)
        if Employee_serializer.is_valid():
            Employee_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")

class SkillLevelView(APIView):
    permission_classes= (IsAuthenticated,)
    def get(self, request, id=None):
        if id:
            item = Skill_Level.objects.get(Skill_Level_ID=id)
            serializer = Skill_LevelSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)

        items = Skill_Level.objects.all()
        serializer = Skill_LevelSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = Skill_LevelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
            
    def delete(self, request, id=None):
        item = get_object_or_404(Skill_Level, Skill_Level_ID=id)
        item.delete()
        return Response({"status": "success", "dataEmp": "Item Deleted"})
        
    def put(self, request):
        employee_data=JSONParser().parse(request)
        employee=Skill_Level.objects.get(Skill_Level_ID=employee_data['Skill_Level_ID'])
        Employee_serializer=Skill_LevelSerializer(employee,data=employee_data)
        if Employee_serializer.is_valid():
            Employee_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
#####################


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/EmployeeView/',
        '/api/SkillLevelView/',
        '/api/UserView/'
    ]

    return Response(routes)

