from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Review(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, blank=True, null=True)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    title = models.CharField(max_length=255)
    excerpt = models.CharField(max_length=255)
    fullText = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=100)
    tourType = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.name} - {self.rating}/5 - {self.title}"
    
    class Meta:
        ordering = ['-date']
