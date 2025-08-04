from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.conf import settings


# Create your models here.

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=50)
    category_image = models.ImageField(upload_to='category')

    class Meta:
        db_table = 'category_table'


class ProductWeight(models.Model):
    product_weight_id = models.AutoField(primary_key=True)
    product_weight = models.FloatField()

    class Meta:
        db_table = 'product_weight_table'


class CustomModel(AbstractUser):
    user_image = models.ImageField()
    user_address = models.TextField()
    user_city = models.CharField(max_length=255)
    user_phone = models.CharField(max_length=10)

    class Meta:
        db_table = 'user_table'


class ProductModel(models.Model):
    product_id = models.AutoField(primary_key=True)
    vendor = models.CharField(max_length=255)
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=100)
    product_price = models.IntegerField()
    product_weight = models.ForeignKey(ProductWeight, on_delete=models.CASCADE)
    product_image = models.ImageField(upload_to='products')
    product_details = models.TextField()
    average_rating = models.FloatField(default=0.0)

    @property
    def calculated_average_rating(self):
        ratings = ProductRating.objects.filter(product=self)
        return sum(r.rating for r in ratings) / ratings.count() if ratings.exists() else 0.0

    class Meta:
        db_table = 'product_table'


class ProductRating(models.Model):
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomModel, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])

    class Meta:
        unique_together = ('user', 'product')
        db_table = 'product_rating_table'


class FeaturedBadge(models.Model):
    badge_id = models.AutoField(primary_key=True)
    badge_name = models.CharField(max_length=200)

    class Meta:
        db_table = 'badge_table'


class FeaturedProduct(models.Model):
    featured_product_id = models.AutoField(primary_key=True)
    featured_items = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    our_price = models.FloatField(null=True)
    badge = models.ForeignKey(FeaturedBadge, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'featured_table'


class BestDeal(models.Model):
    best_deal_id = models.AutoField(primary_key=True)
    deal_items = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    deal_duration = models.IntegerField(null=True)

    class Meta:
        db_table = 'deal_table'


class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    cart_item = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    user = models.ForeignKey(CustomModel, null=True,on_delete=models.CASCADE)

    class Meta:
        db_table = 'cart_table'

    @property
    def total_amount(self):
        return self.cart_item.product_price * self.quantity
