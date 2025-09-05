# Create a management command to initialize admin user and contact info
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from contact.models import ContactInfo


class Command(BaseCommand):
    help = 'Initialize admin user and contact info'

    def handle(self, *args, **kwargs):
        # Create a superuser if it doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@egyptours.com',
                password='adminpass123'
            )
            self.stdout.write(self.style.SUCCESS('Admin user created successfully'))
        else:
            self.stdout.write(self.style.WARNING('Admin user already exists'))
        
        # Create contact info if it doesn't exist
        if not ContactInfo.objects.exists():
            ContactInfo.objects.create(
                phone='+20 123 456 7890',
                email='contact@egyptours.com',
                address='123 Pyramid Street, Giza, Egypt',
                website='https://egyptours.com',
                facebook='https://facebook.com/egyptours',
                instagram='https://instagram.com/egyptours',
                twitter='https://twitter.com/egyptours',
                tripadvisor='https://tripadvisor.com/egyptours',
                businessHours='Mon–Fri: 9 AM – 6 PM',
                emergencyContact='+20 987 654 3210',
                description='Egypt Sun Tours is your gateway to exploring the wonders of Egypt.'
            )
            self.stdout.write(self.style.SUCCESS('Contact info created successfully'))
        else:
            self.stdout.write(self.style.WARNING('Contact info already exists'))
