from django.contrib import admin
from reviews.models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'title', 'date', 'location', 'tourType')
    list_filter = ('rating', 'tourType', 'date')
    search_fields = ('name', 'title', 'fullText', 'location')
