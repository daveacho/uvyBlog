from django.contrib import admin
from .models import CustomUser, Note

class CustomUserAdmin(admin.ModelAdmin):
    list_display = [
        'username',
        'first_name',
        'last_name',
        'email',
        'bio',
        'about',
        'image',
        'facebook',
        'twitter',
        'linkedin',
    ]


class NoteAdmin(admin.ModelAdmin):
    list_display = ["author", "title", "category", "created", "updated"]

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Note, NoteAdmin)
