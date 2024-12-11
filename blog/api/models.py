from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.utils.crypto import get_random_string

class CustomUser(AbstractUser):
    about = models.TextField(null=True, blank=True)
    bio = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(unique=True)
    image = models.FileField(upload_to='user_folder', default="default_images/img2.png", null=True, blank=True)
    facebook = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        email_username, full_name = self.email.split("@")
        if self.username == "" or self.username == None:
            self.username = email_username
        super(CustomUser, self).save(*args, **kwargs)

class Note(models.Model):
    CATEGORY = (("PROGRAMMING","Programming"),
                ("CLOUD", "Cloud"),
                ("DEVOPS", "Devops"))
    author = models.ForeignKey(
        "CustomUser", on_delete=models.CASCADE, null=True, blank=True
    )
    title = models.CharField(max_length=100)
    body = models.TextField()
    slug = models.SlugField(unique=True, blank=True)
    category = models.CharField(max_length=15, choices=CATEGORY, default="PROGRAMMING")
    featured_image = models.FileField(upload_to='blog_img', default='default_images/img2.png', blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created']  # Most recent notes first


    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            slug_base = slugify(self.title)
            slug = slug_base
            # Ensure slug is unique
            while Note.objects.filter(slug=slug).exists():
                slug = f"{slug_base}-{get_random_string(5)}"
            self.slug = slug
        super().save(*args, **kwargs)
