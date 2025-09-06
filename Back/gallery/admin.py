from django.contrib import admin
from gallery.models import GalleryItem


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('alt', 'category', 'type', 'created_at')
    list_filter = ('category', 'type', 'created_at')
    search_fields = ('alt', 'category')
