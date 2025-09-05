from django.db import models

class ContactInfo(models.Model):
    phone = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=255)
    website = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    tripadvisor = models.URLField(blank=True, null=True)
    businessHours = models.CharField(max_length=255)
    emergencyContact = models.CharField(max_length=100)
    description = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Contact Information (Last updated: {self.updated_at.strftime('%Y-%m-%d')})"
    
    class Meta:
        verbose_name = 'Contact Information'
        verbose_name_plural = 'Contact Information'
        
    @classmethod
    def get_singleton(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.name} - {self.subject} ({self.date.strftime('%Y-%m-%d')})"
    
    class Meta:
        ordering = ['-date']
