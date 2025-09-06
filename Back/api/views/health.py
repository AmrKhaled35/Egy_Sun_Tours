from django.http import JsonResponse
from django.db import connection
from django.db.utils import OperationalError
from django.conf import settings
import os

def health_check(request):
    """
    A simple health check endpoint that:
    1. Verifies the API is responding
    2. Checks database connection
    3. Returns basic system information
    
    This is useful for monitoring and ensuring the application is running properly.
    """
    # Check database connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            database_ok = True
    except OperationalError:
        database_ok = False
    
    # Get environment info
    environment = "Production" if not settings.DEBUG else "Development"
    
    # Check if media directory exists and is writable
    media_exists = os.path.exists(settings.MEDIA_ROOT)
    media_writable = os.access(settings.MEDIA_ROOT, os.W_OK) if media_exists else False
    
    # Check if static directory exists and is writable
    static_root = getattr(settings, 'STATIC_ROOT', None)
    static_exists = os.path.exists(static_root) if static_root else False
    static_writable = os.access(static_root, os.W_OK) if static_exists else False
    
    return JsonResponse({
        "status": "ok",
        "database_connected": database_ok,
        "environment": environment,
        "media_directory": {
            "exists": media_exists,
            "writable": media_writable,
        },
        "static_directory": {
            "exists": static_exists,
            "writable": static_writable,
        }
    })
