from django.urls import path, include
from rest_framework.routers import DefaultRouter
from trips.views import TripViewSet
from gallery.views import GalleryViewSet
from reviews.views import ReviewViewSet
from contact.views import ContactInfoViewSet, ContactMessageViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'trips', TripViewSet, basename='trip')
router.register(r'gallery', GalleryViewSet, basename='gallery')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'contact-info', ContactInfoViewSet, basename='contact-info')
router.register(r'messages', ContactMessageViewSet, basename='message')

# The API URLs are determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
