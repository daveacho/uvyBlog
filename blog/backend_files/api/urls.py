from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.register_user, name='user-register'),
    path("blog_list/", views.blog_list, name="blog_list"),
    path('searchblog/', views.search_blogs, name='search'),
    path("blog_detail/<slug:slug>/", views.blog_detail, name="blog_detail"),
    path("create_blog/", views.create_blog, name="create_blog"),
    path("update_blog/<slug:slug>/", views.update_blog, name="update_blog"),
    path("delete_blog/<slug:slug>/", views.delete_blog, name="delete_blog"),
    path("user_info/<slug:username>", views.user_info, name="user_info"),
    path("get_username", views.get_username, name="get_username"),
    path("update_profile/", views.update_profile, name="update_profile")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# from django.urls import path
# from .views import RegisterUser, CreateNote, GetNotes, NoteDetail, search_notes, CustomTokenObtainPairView, update_user
# from rest_framework_simplejwt.views import TokenRefreshView
# from django.conf import settings
# from django.conf.urls.static import static
#
# urlpatterns = [
#     path("register/", RegisterUser, name = 'registered'),
#     path("update_user/", update_user, name='update_user_profile'),
#     path('create_note/', CreateNote, name='created'),
#     path('getnotes/', GetNotes, name='notes'),
#     path('notedetails/<slug:slug>', NoteDetail, name='details'),
#     path('searchnotes/', search_notes, name='search'),
#     path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]
#
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#
#
# #path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
# #TokenObtainPairView,