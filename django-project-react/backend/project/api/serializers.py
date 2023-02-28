from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.validators import RegexValidator


#####################
from django.core.exceptions import ValidationError

# validator_mix = [
#     validate_password,
#     RegexValidator('[+-/%=]', inverse_match=True)
# ]

# def regex_validators_mix(value):
#     err = None
#     for validator in validator_mix:
#         try:
#             validator(value)
#             # Valid value, return it
#             return value
#         except ValidationError as exc:
#             err = exc
#     # Value match nothing, raise error
#     raise err

###################

        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password, RegexValidator('[+-/%=]', inverse_match=True)], max_length = 15)
    password2 = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(
        write_only=True, required=True, validators=[validate_password, RegexValidator('[+-/%=]', inverse_match=True)], max_length = 12)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
 
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
        
#         from django.contrib.auth.hashers import make_password, check_password

# class AbstractBaseUser:
#     ...

#     def set_password(self, raw_password):
#         self.password = make_password(raw_password)

#     def check_password(self, raw_password):
#         return check_password(raw_password, self.password)
        
        
        ## the hashing process in the from django.contrib.auth.models works in 3 steps
        ## set a password and it hashes it with an algorithm ex. SH256
        ## hased password is stored in the database under 'password'
        ## when logging in the entered password is hashed and compared to the data base of hashed passwords
        
        ## Django uses a secure hash function, a salt, and multiple iterations to ensure that the hashed password is difficult to crack
        
        ## this is the make_password function which shows the steps of hashing
        
#         from django.contrib.auth.hashers import PBKDF2PasswordHasher

# def make_password(password, salt=None, hasher='default'):
#     if hasher == 'default':
#         hasher = PBKDF2PasswordHasher()
#     else:
#         hasher = get_hasher(hasher)

#     return hasher.encode(password, salt)

# within each specific hasher you can specify the salt, iterations, the algorithm used example of hasher below

# from hashlib import pbkdf2_hmac
# from django.conf import settings

# class PBKDF2PasswordHasher:
#     ...

#     def encode(self, password, salt, iterations=None):
#         if not iterations:
#             iterations = self.iterations

#         hash = pbkdf2_hmac(
#             hash_name=self.algorithm,
#             password=password.encode(),
#             salt=salt.encode(),
#             iterations=iterations,
#             dklen=self.digest
#         )
#         hash = base64.b64encode(hash).decode()
#         return f"{self.algorithm}${iterations}${salt}${hash}" ## returns hashed value as string here

        ################
        
        
from rest_framework import serializers
from project.models import Users, Employees, Skill_Level

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
        
        