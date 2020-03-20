from django.contrib import admin

from .models import Category, Thread, Post


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    '''Admin View for Category'''

    list_display = ('__str__', 'threads', 'posts', 'created')
    readonly_fields = ('created', 'updated', 'threads', 'posts')


@admin.register(Thread)
class ThreadAdmin(admin.ModelAdmin):
    '''Admin View for Thread'''

    list_display = ('__str__', 'user', 'category', 'created', 'posts', 'latest_post_time', 'id')
    list_filter = ('category', 'sticky', 'closed')
    readonly_fields = ('id', 'posts', 'latest_post_time', 'created', 'updated', )
    search_fields = ('title', 'subject', 'category')
    save_on_top = True


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    '''Admin View for Post'''

    list_display = ('__str__', 'user', 'thread', 'created')
    readonly_fields = ('id', 'created', 'updated')
    search_fields = ('content', 'user', 'thread')
