from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import IntegrityError
import os

class Command(BaseCommand):
    help = 'Creates a default admin user when deploying to production'

    def handle(self, *args, **options):
        username = os.environ.get('ADMIN_USERNAME', 'admin')
        email = os.environ.get('ADMIN_EMAIL', 'admin@egysuntours.com')
        password = os.environ.get('ADMIN_PASSWORD')

        if not password:
            self.stdout.write(self.style.ERROR('ADMIN_PASSWORD environment variable is not set. Skipping admin creation.'))
            return

        try:
            admin = User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created admin user: {username}'))
        except IntegrityError:
            self.stdout.write(self.style.WARNING(f'Admin user {username} already exists. Updating password...'))
            admin = User.objects.get(username=username)
            admin.set_password(password)
            admin.is_superuser = True
            admin.is_staff = True
            admin.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully updated admin user: {username}'))
