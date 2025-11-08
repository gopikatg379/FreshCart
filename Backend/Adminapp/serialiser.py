from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import *
import urllib.parse


class CategorySerializer(serializers.ModelSerializer):
    category_image = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ['category_id', 'category_name', 'category_image']
    def get_category_image(self,obj):
        # Return the full Cloudinary URL
        if obj.category_image:
            try:
                return obj.category_image.url
            except Exception:
                return str(obj.category_image)
        return None

class ProductWeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductWeight
        fields = ['product_weight_id', 'product_weight']


class ProductSerializer(serializers.ModelSerializer):
    product_category = CategorySerializer(read_only=True)
    product_weight = ProductWeightSerializer(read_only=True)
    product_image = serializers.SerializerMethodField()
    class Meta:
        model = ProductModel
        fields = ['product_id', 'vendor', 'product_category', 'product_name', 'product_price', 'product_weight',
                  'product_image', 'product_details', 'average_rating']

    def get_product_image(self, obj):
        # Return the full Cloudinary URL
        if obj.product_image:
            try:
                return obj.product_image.url
            except Exception:
                return str(obj.product_image)
        return None


class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedBadge
        fields = ['badge_id', 'badge_name']


class FeaturedSerializer(serializers.ModelSerializer):
    featured_items = ProductSerializer(read_only=True)
    badge = BadgeSerializer(read_only=True)

    class Meta:
        model = FeaturedProduct
        fields = ['featured_product_id', 'featured_items', 'our_price', 'badge']


class DealSerializer(serializers.ModelSerializer):
    deal_items = ProductSerializer(read_only=True)

    class Meta:
        model = BestDeal
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    cart_item = ProductSerializer(read_only=True)
    total_amount = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['cart_id', 'cart_item', 'quantity', 'total_amount', 'user']

    def get_total_amount(self, obj):
        return obj.cart_item.product_price * obj.quantity


class CustomModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomModel
        fields = ['username', 'email', 'password', 'user_image', 'user_address', 'user_city', 'user_phone']

    def create(self, validated_data):
        password = validated_data.get('password')
        validated_data['password'] = make_password(password)
        user = super().create(validated_data)
        return user
