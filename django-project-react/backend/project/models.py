from django.db import models
from django.contrib.auth.models import User
from django.core.cache import cache
from django.core.validators import RegexValidator
#from django_cryptography.fields import encrypt 
from encrypted_model_fields.fields import EncryptedCharField
# Create your models here.


# Users database 

class Users(models.Model):
    UsersID = models.AutoField(primary_key =True )
    Username = models.CharField(max_length = 12,validators=[RegexValidator('[+-/%=]', inverse_match=True)] ,unique=True)
    Password = EncryptedCharField(max_length = 15,validators=[RegexValidator('[+-/%=]', inverse_match=True)])

    def save(self, *args, **kwargs):
        super(Users, self).save(*args, **kwargs)
        cache.delete('Users-%s' % self.pk)
        
        # Skill database 

class Skill_Level(models.Model):
    Skill_Level_ID = models.AutoField(primary_key =True )
    Skill_Name = models.CharField(max_length = 100 , validators=[RegexValidator('[+-/%=]', inverse_match=True)])
    Skill_Description = models.CharField(max_length = 500 )
    
    def save(self, *args, **kwargs):
        super(Skill_Level, self).save(*args, **kwargs)
        cache.delete('Skill_Level-%s' % self.pk)

# Employees database 

class Employees(models.Model):
    EmployeesID = models.OneToOneField(Users, primary_key =True, on_delete=models.CASCADE, db_column='EmployeesID')
    First_Name = models.CharField(max_length = 12, blank=True, validators=[RegexValidator('[+-/%=]', inverse_match=True)])
    Last_Name = models.CharField(max_length = 15, blank=True , validators=[RegexValidator('[+-/%=]', inverse_match=True)])
    DOB = models.DateField()
    Email = models.EmailField(max_length = 50, unique=True)
    Skill_Level = models.ForeignKey(Skill_Level, on_delete=models.CASCADE, blank=True, null=True, related_name='Skill_Level')
    Active = models.BooleanField(default=False)
    Age = models.IntegerField()
    def __str__(self):
        return str(self.name)





