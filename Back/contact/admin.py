from django.contrib import admin
from contact.models import ContactInfo, ContactMessage


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone', 'updated_at')
    
    def has_add_permission(self, request):
        # If there already exists a ContactInfo object, don't allow adding more
        return ContactInfo.objects.count() == 0


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'date', 'is_read')
    list_filter = ('date', 'is_read')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('date',)
    
    actions = ['mark_as_read']
    
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected messages as read"
