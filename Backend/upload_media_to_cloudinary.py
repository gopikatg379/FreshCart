import cloudinary
import cloudinary.uploader
import cloudinary.api
from pathlib import Path

cloudinary.config(
    cloud_name="dn1knnudm",
    api_key="469315845734452",
    api_secret="GnzVj37XVHcP_pLpRPcd_c3H1d0"
)

media_path = Path("media/")


def upload_media(folder_path):
    files = list(folder_path.rglob("*.*"))
    if not files:
        print("No media files found in folder.")
        return

    print(f"Found {len(files)} files. Starting upload...")

    for idx, file in enumerate(files, start=1):
        # Convert Windows path to Cloudinary-friendly path
        public_id = str(file.relative_to(folder_path)).replace("\\", "/")

        try:
            print(f"[{idx}/{len(files)}] Uploading '{file}' as '{public_id}'...")
            cloudinary.uploader.upload(str(file), public_id=public_id)
        except Exception as e:
            print(f" Failed to upload '{file}': {e}")

    print("Upload completed.")


upload_media(media_path)
