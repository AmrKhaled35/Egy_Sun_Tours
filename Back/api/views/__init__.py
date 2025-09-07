from .health import health_check

from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    """
    API root endpoint
    """
    return Response({
        'trips': reverse('trip-list', request=request, format=format),
        'gallery': reverse('gallery-list', request=request, format=format),
        'reviews': reverse('review-list', request=request, format=format),
        'contact': reverse('contact-list', request=request, format=format),
        'messages': reverse('message-list', request=request, format=format),
    })
