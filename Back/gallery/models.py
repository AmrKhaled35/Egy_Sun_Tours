from django.db import models

class GalleryItem(models.Model):
    TYPE_CHOICES = (
        ('image', 'Image'),
        ('video', 'Video'),
    )
    
    image = models.ImageField(upload_to='gallery/')
    alt = models.CharField(max_length=255)
    category = models.CharField(max_length=50)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='image')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.category} - {self.alt}"
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Gallery Items'
