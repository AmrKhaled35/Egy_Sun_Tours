from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from contact.models import ContactInfo, ContactMessage
from contact.serializers import ContactInfoSerializer, ContactMessageSerializer


class ContactInfoViewSet(mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.ListModelMixin,
                         viewsets.GenericViewSet):
    """
    API endpoint for contact info (singleton)
    """
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    
    def list(self, request, *args, **kwargs):
        # Return the singleton instance
        instance = ContactInfo.get_singleton()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        # Always return the singleton
        instance = ContactInfo.get_singleton()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        # Update the singleton
        instance = ContactInfo.get_singleton()
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        
    def partial_update(self, request, *args, **kwargs):
        # Partially update the singleton
        instance = ContactInfo.get_singleton()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ContactMessageViewSet(mixins.CreateModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.DestroyModelMixin,
                           mixins.ListModelMixin,
                           viewsets.GenericViewSet):
    """
    API endpoint for contact messages
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    @action(detail=True, methods=['patch'])
    def mark_as_read(self, request, pk=None):
        """Mark a message as read"""
        message = self.get_object()
        message.is_read = True
        message.save()
        return Response({'status': 'message marked as read'})
