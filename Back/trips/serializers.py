from rest_framework import serializers
from trips.models import Trip, TimelineItem, TripImage

class TimelineItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineItem
        fields = ['id', 'time', 'title', 'description', 'image']


class TripImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripImage
        fields = ['id', 'image']


class TripSerializer(serializers.ModelSerializer):
    timeline = TimelineItemSerializer(many=True, read_only=True)
    gallery = TripImageSerializer(many=True, read_only=True)
    highlights = serializers.ListField(child=serializers.CharField(), required=False)
    
    class Meta:
        model = Trip
        fields = ['id', 'title', 'slug', 'shortDescription', 'fullDescription', 'duration', 
                  'price', 'image', 'category', 'highlights', 'timeline', 'gallery',
                  'created_at', 'updated_at']
        read_only_fields = ['slug', 'created_at', 'updated_at']


class TripDetailSerializer(TripSerializer):
    """
    Serializer for detailed trip information including timeline and gallery
    """
    pass
