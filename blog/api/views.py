from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Note, CustomUser
from .serializers import UserRegistrationSerializer, BlogSerializer, UserInfoSerializer, CustomTokenObtainPairSerializer
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()  # Save the user
        return Response({'id': user.id, 'username': user.username}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def blog_list(request):
#     blogs = Blog.objects.all()
#     serializer = BlogSerializer(blogs, many=True)
#     return Response(serializer.data)


class BlogPagination(PageNumberPagination):
    page_size = 8 # Number of results per page


@api_view(['GET'])
def blog_list(request):
    blogs = Note.objects.all()
    paginator = BlogPagination()
    paginated_blogs = paginator.paginate_queryset(blogs, request)
    serializer = BlogSerializer(paginated_blogs, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(["GET"])
def search_blogs(request):
    query = request.query_params.get("search")  # 'search' is the query parameter from the user
    notes = Note.objects.filter(
        Q(title__icontains=query) | Q(body__icontains=query) | Q(category__icontains=query)
#the user will fetch the notes if the search word matches any words in the title,body or category
    )
    serializer = BlogSerializer(notes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def blog_detail(request, slug):
    blog = Note.objects.get(slug=slug)
    serializer = BlogSerializer(blog)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_blog(request):
    user = request.user
    # Debugging: Print the authenticated user
    print(f"Authenticated user: {user}")
    # Debugging: Print the token and user
    print(f"Authorization Header: {request.headers.get('Authorization')}")
    print(f"Authenticated user: {request.user}")

    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=user)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def update_blog(request, slug):
    user = request.user
    print(f"Authenticated user: {user}")
    blog = Note.objects.get(slug=slug)
    if blog.author != user:
        return Response({"error": "You are not the author of this blog"}, status=403)
    serializer = BlogSerializer(blog, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_blog(request, slug):
    user = request.user
    blog = Note.objects.get(slug=slug)
    if blog.author != user:
        return Response({"error": "You are not the author of this blog"}, status=403)
    blog.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request, username):
    try:
        # Debugging: Print the authenticated user
        print(f"Authenticated user: {request.user}")
        # Fetch the user profile based on the provided username
        user_profile = CustomUser.objects.get(username=username)
    except CustomUser.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Serialize the user profile data
    serializer = UserInfoSerializer(user_profile)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    return Response({"username": user.username})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_profile(request):
    user = request.user
    serializer = UserInfoSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    else:
        print(serializer.errors)  # Debugging
        print("Request data:", request.data)  # Debugging request data
        return Response(serializer.errors, status=400)



# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# @parser_classes([MultiPartParser, FormParser])  # Add parsers here
# def update_profile(request):
#     user = request.user
#     data = request.data.copy()
#     # Only include image if it's a file
#     if 'image' in request.FILES:
#         data['image'] = request.FILES['image']
#
#     serializer = UserInfoSerializer(user, data=data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     else:
#          print(serializer.errors)  # Debugging: Print serializer errors
#          return Response(serializer.errors, status=400)



# from django.core.serializers import serialize
# from django.shortcuts import get_object_or_404
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from .serializers import UserSerializer, NoteSerializer, UpdateUserSerializer, CustomTokenObtainPairSerializer
# from django.db.models import Q
# from rest_framework.pagination import PageNumberPagination
# from .models import Note, CustomUser
# from rest_framework_simplejwt.views import TokenObtainPairView
#
# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer
#
# class NotePagination(PageNumberPagination):
#     page_size = 6
#
# @api_view(['POST'])
# def RegisterUser(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def update_user(request):
#     user = request.user
#     serializer = UpdateUserSerializer(instance=user, data=request.data, partial=True)  # Use partial for partial updates
#     if serializer.is_valid():
#         serializer.save()  # Save changes to the user instance
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# @api_view(['GET'])
# def get_user_bio(request, username):
#     user = request.user
#     us = CustomUser.objects.get(username=username)
#     serializer = UserSerializer(us, many=True)
#     return Response(serializer.data, status=status.HTTP_201_CREATED)
#
#
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def CreateNote(request):
#     serializer = NoteSerializer(data=request.data)
#     if serializer.is_valid():
#         # Ensure the note is always assigned to the current authenticated user
#         serializer.save(author=request.user)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# @api_view(["GET"])
# def search_notes(request):
#     query = request.query_params.get("search")  # 'search' is the query parameter from the user
#     notes = Note.objects.filter(
#         Q(title__icontains=query) | Q(body__icontains=query) | Q(category__icontains=query)
# #the user will fetch the notes if the search word matches any words in the title,body or category
#     )
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)
#
# @api_view(['GET'])
# def GetNotes(request):
#     notes = Note.objects.all()
#     paginator = NotePagination()
#     paginated_notes = paginator.paginate_queryset(notes, request)
#     serializer = NoteSerializer(paginated_notes, many=True)
#     return paginator.get_paginated_response(serializer.data)
#
#
# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def NoteDetail(request, slug):
#     user = request.user
#     note = get_object_or_404(Note, slug=slug)
#
#     # Ensure the authenticated user is the owner of the note
#     if note.author != user:
#         return Response(
#             {"error": "You are not the author of this note!"},
#             status=status.HTTP_403_FORBIDDEN,
#         )
#
#     if request.method == 'GET':
#         serializer = NoteSerializer(note)
#         return Response(serializer.data)
#
#     elif request.method == 'PUT':
#         # Prevent changing the author of the note
#         data = request.data.copy()
#         data['author'] = note.author.id
#
#         serializer = NoteSerializer(note, data=data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     elif request.method == 'DELETE':
#         note.delete()
#         return Response({"message": "Note deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
#
#
# # from django.core.serializers import serialize
# # from django.shortcuts import render
# # from rest_framework.decorators import api_view, permission_classes
# # from rest_framework.response import Response
# # from rest_framework import status
# # from .serializers import UserSerializer, NoteSerializer
# # from rest_framework.permissions import IsAuthenticated
# # from .models import Note
# #
# # @api_view(['POST'])
# # def RegisterUser(request):
# #     serializer = UserSerializer(data=request.data)
# #     if serializer.is_valid():
# #         serializer.save()
# #         return Response(serializer.data, status=status.HTTP_201_CREATED)
# #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# #
# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def CreateNote(request):
# #     user = request.user
# #     serializer = NoteSerializer(data=request.data)
# #     if serializer.is_valid():
# #         serializer.save(author=user)
# #         return Response(serializer.data, status=status.HTTP_201_CREATED)
# #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# #
# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def GetNote(request):
# #     notes = Note.objects.filter(author=request.user)  # Only return user's notes
# #     serializer = NoteSerializer(notes, many=True)
# #     return Response(serializer.data)
# #
# # @api_view(['GET', 'PUT', 'DELETE'])
# # @permission_classes([IsAuthenticated])
# # def NoteDetail(request, pk):
# #     user = request.user
# #     try:
# #         note = Note.objects.get(pk=pk)
# #         if note.author != user:
# #             return Response({"error": "you are the author of this note!"},status=status.HTTP_404_NOT_FOUND)
# #     except Note.DoesNotExist:
# #         return Response(status=status.HTTP_404_NOT_FOUND)
# #
# #     if request.method == 'GET':
# #         serializer = NoteSerializer(note)
# #         return Response(serializer.data)
# #
# #     elif request.method == 'PUT':
# #         serializer = NoteSerializer(note, data=request.data)
# #         if serializer.is_valid():
# #             serializer.save()
# #             return Response(serializer.data)
# #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# #
# #     elif request.method == 'DELETE':
# #         note.delete()
# #         return Response(status=status.HTTP_204_NO_CONTENT)
# #
