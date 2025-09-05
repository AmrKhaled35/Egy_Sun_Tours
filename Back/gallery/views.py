from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from gallery.models import GalleryItem
from gallery.serializers import GalleryItemSerializer


class GalleryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for gallery items
    """
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def get_queryset(self):
        queryset = GalleryItem.objects.all()
        category = self.request.query_params.get('category', None)
        type = self.request.query_params.get('type', None)
        
        if category:
            queryset = queryset.filter(category=category)
        if type:
            queryset = queryset.filter(type=type)
            
        return queryset
