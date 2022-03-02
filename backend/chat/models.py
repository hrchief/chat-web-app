from typing import Text
from django.db import models

# Create your models here.


class Message(models.Model):
    donor = models.CharField(max_length=20)
    recipient = models.CharField(max_length=20)
    title = models.CharField(max_length=120)
    body = models.TextField()
    checked = models.BooleanField(default=False)

    def _str_(self):
        return self.title


class MessageForChat(models.Model):
    author = models.CharField(max_length=20)
    text = models.TextField()

    def _str_(self):
        return self.author
