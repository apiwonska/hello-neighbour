"""Contains models for category, thread and post."""

from django.db import models
# from django.contrib.auth.models import User

class Category(models.Model):
    """Category model."""

    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=100)
    order = models.PositiveSmallIntegerField(null=True, blank=True, verbose_name='display order')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
        
    def __str__(self):
        return self.name
