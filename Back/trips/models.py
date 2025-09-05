from django.db import models
from django.utils.text import slugify

class Trip(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    shortDescription = models.CharField(max_length=255)
    fullDescription = models.TextField()
    duration = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='trips/')
    category = models.CharField(max_length=50)
    highlights = models.JSONField(default=list)  # Store array of strings
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']


class TimelineItem(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='timeline')
    time = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='timeline/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.trip.title} - {self.title}"


class TripImage(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='gallery')
    image = models.ImageField(upload_to='trips/gallery/')
    
    def __str__(self):
        return f"Image for {self.trip.title}"
