from rest_framework import viewsets, status
from rest_framework.response import Response
from reviews.models import Review
from reviews.serializers import ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    """
    API endpoint for reviews
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        queryset = Review.objects.all()
        rating = self.request.query_params.get('rating', None)
        tourType = self.request.query_params.get('tourType', None)
        
        if rating:
            queryset = queryset.filter(rating=rating)
        if tourType:
            queryset = queryset.filter(tourType=tourType)
            
        return queryset
