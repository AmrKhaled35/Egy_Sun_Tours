from django.conf import settings
from django.core.files.storage import FileSystemStorage
import os

class MediaStorage(FileSystemStorage):
    """
    Custom storage for media files that ensures directories exist.
    
    This is particularly useful for Railway deployment where the filesystem
    is ephemeral but we still need to handle uploads during the instance lifetime.
    For production with persistent storage, consider using cloud storage like S3.
    """
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Ensure media directory exists
        os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
    
    def save(self, name, content, max_length=None):
        # Ensure the directory for this file exists
        directory = os.path.dirname(os.path.join(settings.MEDIA_ROOT, name))
        os.makedirs(directory, exist_ok=True)
        return super().save(name, content, max_length)
