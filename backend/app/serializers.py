from rest_framework import serializers

from .models import *


class SpecialistSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, specialist):
        if specialist.image:
            return specialist.image.url.replace("minio", "localhost", 1)

        return "http://localhost:9000/images/default.png"

    class Meta:
        model = Specialist
        fields = "__all__"


class SpecialistItemSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    value = serializers.SerializerMethodField()

    def get_image(self, specialist):
        if specialist.image:
            return specialist.image.url.replace("minio", "localhost", 1)

        return "http://localhost:9000/images/default.png"

    def get_value(self, specialist):
        return self.context.get("value")

    class Meta:
        model = Specialist
        fields = ("id", "name", "image", "value")


class LectureSerializer(serializers.ModelSerializer):
    specialists = serializers.SerializerMethodField()
    owner = serializers.StringRelatedField(read_only=True)
    moderator = serializers.StringRelatedField(read_only=True)
            
    def get_specialists(self, lecture):
        items = SpecialistLecture.objects.filter(lecture=lecture)
        return [SpecialistItemSerializer(item.specialist, context={"value": item.value}).data for item in items]

    class Meta:
        model = Lecture
        fields = '__all__'


class LecturesSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(read_only=True)
    moderator = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Lecture
        fields = "__all__"


class SpecialistLectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialistLecture
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username')


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'username')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
