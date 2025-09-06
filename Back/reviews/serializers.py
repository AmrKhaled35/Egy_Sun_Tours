from rest_framework import serializers
from reviews.models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'username', 'rating', 'title', 'excerpt', 
                  'fullText', 'date', 'location', 'tourType']
        read_only_fields = ['date']
