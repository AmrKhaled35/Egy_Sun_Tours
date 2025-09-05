from rest_framework import serializers
from contact.models import ContactInfo, ContactMessage

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['id', 'phone', 'email', 'address', 'website', 'facebook', 'instagram', 
                  'twitter', 'tripadvisor', 'businessHours', 'emergencyContact', 
                  'description', 'updated_at']
        read_only_fields = ['updated_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'date', 'is_read']
        read_only_fields = ['date', 'is_read']
