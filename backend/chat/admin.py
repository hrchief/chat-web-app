from django.contrib import admin
from .models import Message


class MessageAdmin(admin.ModelAdmin):
    list_display = ('donor', 'recipient', 'title', 'body', 'checked')


# Register your models here.
admin.site.register(Message, MessageAdmin)
