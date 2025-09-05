from rest_framework import serializers
from gallery.models import GalleryItem

class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = ['id', 'image', 'alt', 'category', 'type', 'created_at']
        read_only_fields = ['created_at']
