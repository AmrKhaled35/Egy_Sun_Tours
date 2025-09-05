from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from trips.models import Trip, TimelineItem, TripImage
from trips.serializers import TripSerializer, TripDetailSerializer, TimelineItemSerializer, TripImageSerializer


class TripViewSet(viewsets.ModelViewSet):
    """
    API endpoint for trips
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TripDetailSerializer
        return TripSerializer
    
    def create(self, request, *args, **kwargs):
        # First create the trip
        trip_data = request.data.copy()
        
        # Parse the highlights if they come as a string
        if 'highlights' in trip_data and isinstance(trip_data['highlights'], str):
            try:
                import json
                trip_data['highlights'] = json.loads(trip_data['highlights'])
            except:
                pass
        
        serializer = self.get_serializer(data=trip_data)
        serializer.is_valid(raise_exception=True)
        trip = serializer.save()
        
        # Process timeline items if provided
        timeline_items = request.data.getlist('timeline', [])
        for item_data in timeline_items:
            if isinstance(item_data, str):
                try:
                    import json
                    item_data = json.loads(item_data)
                except:
                    continue
            
            item_data['trip'] = trip.id
            timeline_serializer = TimelineItemSerializer(data=item_data)
            if timeline_serializer.is_valid():
                timeline_serializer.save()
        
        # Process gallery images if provided
        gallery_images = request.FILES.getlist('gallery', [])
        for image in gallery_images:
            image_data = {'trip': trip.id, 'image': image}
            image_serializer = TripImageSerializer(data=image_data)
            if image_serializer.is_valid():
                image_serializer.save()
        
        return Response(TripDetailSerializer(trip).data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def add_timeline_item(self, request, pk=None):
        """Add a timeline item to a trip"""
        trip = self.get_object()
        data = request.data.copy()
        data['trip'] = trip.id
        
        serializer = TimelineItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def add_gallery_image(self, request, pk=None):
        """Add an image to a trip gallery"""
        trip = self.get_object()
        data = request.data.copy()
        data['trip'] = trip.id
        
        serializer = TripImageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
