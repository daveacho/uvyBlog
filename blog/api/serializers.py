from rest_framework import serializers
from .models import CustomUser, Note
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Get the original token
        token = super().get_token(user)

        # Add custom claims (optional)
        token['username'] = user.username
        token['email'] = user.email

        return token

    def validate(self, attrs):
        # Call the original validate method
        data = super().validate(attrs)

        # Add user details to the response
        data['user'] = {
            'id':self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
        }

        return data

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email','username', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {"write_only": True}}

    def create(self, validated_data):
        # Using create_user ensures proper password hashing and handling.
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],  # Directly pass the password
        )
        return user

# class UserInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'email', 'username', 'first_name', 'last_name', 'image',
#                   'bio', 'about', 'facebook', 'twitter', 'linkedin']
#         extra_kwargs = {
#             'image': {'required': False, 'allow_null': True},  # Make the image field optional
#         }

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'image',
                  'bio', 'about', 'facebook', 'twitter', 'linkedin']
        extra_kwargs = {
            'image': {'required': False, 'allow_null': True},  # Make the image field optional
        }
#
#     def validate(self, attrs):
#         # Get the current user instance
#         user = self.instance
#
#         # Validate email
#         if 'email' in attrs and CustomUser.objects.filter(email=attrs['email']).exclude(id=user.id).exists():
#             raise serializers.ValidationError({'email': 'A user with this email already exists.'})
#
#         # Validate username
#         if 'username' in attrs and CustomUser.objects.filter(username=attrs['username']).exclude(id=user.id).exists():
#             raise serializers.ValidationError({'username': 'A user with this username already exists.'})
#
#         return attrs


class BlogSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)  # Make 'author' read-only

    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ['author']


# class BlogSerializer(serializers.ModelSerializer):
#     author = serializers.StringRelatedField()
#     class Meta:
#         model = Note
#         fields = '__all__'

# This uses the __str__ method of the User model

# class NoteSerializer(serializers.ModelSerializer):
#     author = serializers.SlugRelatedField(
#         queryset=CustomUser.objects.all(),
#         slug_field='username',  # Display username
#     )
#
#     class Meta:
#         model = Note
#         fields = ['id', 'author', 'title', 'body', 'category', 'created', 'updated']