from Adminapp.models import Category, ProductModel

def fix_url(url):
    if not url:
        return url  # skip empty

    url = str(url).strip()

    # Remove leading "image/upload/" if the rest is already a full URL
    if url.startswith("image/upload/https://res.cloudinary.com"):
        url = url[len("image/upload/"):]  # remove leading "image/upload/"

    # Already correct Cloudinary URL
    if url.startswith("https://res.cloudinary.com/dn1knnudm/"):
        return url

    # Relative path without full URL
    if not url.startswith("https://"):
        url = "https://res.cloudinary.com/dn1knnudm/image/upload/" + url.lstrip("/")

    return url



def run():
    print("🔍 Fixing Category URLs...")
    for c in Category.objects.all():
        image_str = str(c.category_image) if c.category_image else ''
        fixed = fix_url(image_str)
        if fixed != image_str:
            c.category_image = fixed
            c.save()
            print(f"✅ Fixed Category: {c.category_name} → {fixed}")

    print("\n🔍 Fixing Product URLs...")
    for p in ProductModel.objects.all():
        image_str = str(p.product_image) if p.product_image else ''
        fixed = fix_url(image_str)
        if fixed != image_str:
            p.product_image = fixed
            p.save()
            print(f"✅ Fixed Product: {p.product_name} → {fixed}")

    print("\n🎉 Done fixing all URLs!")
