from django.contrib import admin
from trips.models import Trip, TimelineItem, TripImage


class TimelineItemInline(admin.TabularInline):
    model = TimelineItem
    extra = 1


class TripImageInline(admin.TabularInline):
    model = TripImage
    extra = 3


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'duration', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'shortDescription', 'fullDescription')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [TimelineItemInline, TripImageInline]
