# Hướng dẫn đẩy code lên GitHub

## Repository đã tạo
- **URL**: https://github.com/thanhxuancmd/ikk-design-system-v1
- **Clone URL**: https://github.com/thanhxuancmd/ikk-design-system-v1.git

## Các bước thực hiện (chạy trong Shell của Replit)

### Bước 1: Xóa .git cũ (nếu có)
```bash
rm -rf .git
```

### Bước 2: Khởi tạo git mới
```bash
git init
```

### Bước 3: Thêm tất cả files (trừ những gì trong .gitignore)
```bash
git add .
```

### Bước 4: Commit
```bash
git commit -m "Initial commit: IKK Design System v1 - Complete platform with admin management"
```

### Bước 5: Thêm remote repository
```bash
git remote add origin https://github.com/thanhxuancmd/ikk-design-system-v1.git
```

### Bước 6: Đổi tên branch thành main
```bash
git branch -M main
```

### Bước 7: Push lên GitHub
```bash
git push -u origin main
```

## Lưu ý
- Nếu gặp lỗi authentication, sếp cần authenticate GitHub trong Replit
- Repository đã được tạo và sẵn sàng nhận code
- File này có thể xóa sau khi hoàn tất

## Thông tin Repository
- **Tên**: ikk-design-system-v1
- **Mô tả**: IKK Design System - Complete design system platform for SOOPLIVE with admin management, Vietnamese localization, and pink branding
- **Visibility**: Public
