export type Category = {
  category_id: string
  name: string
  slug: string
  type: 'MAIN' | 'PRODUCT' | 'SERVICE'
  parent_id: string
  icon_number: string
  description: string
}

export const categories: Category[] = [
  { category_id: 'CAT001', name: 'Hướng dẫn Dịch vụ', slug: 'revu_guide', type: 'MAIN', parent_id: '', icon_number: '6', description: 'REVU GUIDE - Hướng dẫn sử dụng dịch vụ' },
  { category_id: 'CAT002', name: 'Nhà hàng, cà phê', slug: 'restaurants_cafes', type: 'MAIN', parent_id: '', icon_number: '7', description: 'Restaurants & Cafes - Dịch vụ ăn uống' },
  { category_id: 'CAT003', name: 'Làm đẹp', slug: 'beauty', type: 'MAIN', parent_id: '', icon_number: '8', description: 'Beauty & Cosmetics - Mỹ phẩm và làm đẹp' },
  { category_id: 'CAT004', name: 'Du lịch', slug: 'travel', type: 'MAIN', parent_id: '', icon_number: '9', description: 'Travel & Tourism - Du lịch và khách sạn' },
  { category_id: 'CAT005', name: 'Giải trí', slug: 'entertainment', type: 'MAIN', parent_id: '', icon_number: '10', description: 'Entertainment - Giải trí và sự kiện' },
  { category_id: 'CAT006', name: 'Đồ ăn, thức uống', slug: 'food_beverage', type: 'MAIN', parent_id: '', icon_number: '11', description: 'Food & Beverage - Thực phẩm và đồ uống' },
  { category_id: 'CAT007', name: 'Lối sống', slug: 'lifestyle', type: 'MAIN', parent_id: '', icon_number: '12', description: 'Lifestyle - Phong cách sống' },
  { category_id: 'CAT008', name: 'Công nghệ', slug: 'technology', type: 'MAIN', parent_id: '', icon_number: '13', description: 'Technology - Công nghệ và điện tử' },
  { category_id: 'CAT009', name: 'Tuyển dụng', slug: 'recruitment', type: 'MAIN', parent_id: '', icon_number: '14', description: 'Recruitment - Tuyển dụng và việc làm' },
  { category_id: 'CAT010', name: 'Nhà quảng cáo', slug: 'advertiser', type: 'MAIN', parent_id: '', icon_number: '15', description: 'Advertiser - Dành cho nhà quảng cáo' },
  { category_id: 'P001', name: 'Tất cả', slug: 'all', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Tất cả sản phẩm' },
  { category_id: 'P002', name: 'Mỹ phẩm', slug: 'cosmetics', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Sản phẩm mỹ phẩm và làm đẹp' },
  { category_id: 'P003', name: 'Đồ ăn, thức uống', slug: 'food_drink', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Thực phẩm và đồ uống' },
  { category_id: 'P004', name: 'Mẹ và bé', slug: 'mom_baby', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Sản phẩm cho mẹ và bé' },
  { category_id: 'P005', name: 'Công nghệ - Gia dụng', slug: 'tech_home', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Công nghệ và đồ gia dụng' },
  { category_id: 'P006', name: 'Thời trang', slug: 'fashion', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Quần áo, phụ kiện, giày dép' },
  { category_id: 'P007', name: 'Lifestyle', slug: 'lifestyle_product', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Sản phẩm phong cách sống' },
  { category_id: 'P008', name: 'Dược phẩm', slug: 'pharmaceutical', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Thuốc và dược phẩm' },
  { category_id: 'P009', name: 'Nội thất', slug: 'furniture', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Đồ nội thất' },
  { category_id: 'P010', name: 'Game', slug: 'game', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Game và phụ kiện gaming' },
  { category_id: 'P003_1', name: 'Đồ ăn', slug: 'food', type: 'PRODUCT', parent_id: 'P003', icon_number: '', description: 'Thực phẩm' },
  { category_id: 'P003_2', name: 'Thức uống', slug: 'beverage', type: 'PRODUCT', parent_id: 'P003', icon_number: '', description: 'Đồ uống các loại' },
  { category_id: 'P011', name: 'Hóa dược phẩm', slug: 'pharma_chemical', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Hóa chất và dược phẩm' },
  { category_id: 'P012', name: 'Thú cưng', slug: 'pet', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Sản phẩm cho thú cưng' },
  { category_id: 'P013', name: 'Thực phẩm chức năng', slug: 'functional_food', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Thực phẩm bổ sung' },
  { category_id: 'P014', name: 'FMCG', slug: 'fmcg', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Hàng tiêu dùng nhanh' },
  { category_id: 'P015', name: 'Sức khỏe', slug: 'health', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Sản phẩm chăm sóc sức khỏe' },
  { category_id: 'P016', name: 'Thiết bị làm đẹp', slug: 'beauty_device', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Máy móc làm đẹp' },
  { category_id: 'P017', name: 'Thiết bị y tế', slug: 'medical_device', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Thiết bị y tế' },
  { category_id: 'P018', name: 'Giáo dục', slug: 'education', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Sản phẩm giáo dục' },
  { category_id: 'P019', name: 'Phong thuỷ', slug: 'feng_shui', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Vật phẩm phong thuỷ' },
  { category_id: 'P020', name: 'App', slug: 'app', type: 'PRODUCT', parent_id: '', icon_number: '', description: 'Ứng dụng di động' },
  { category_id: 'S001', name: 'Tất cả', slug: 'all_service', type: 'SERVICE', parent_id: '', icon_number: '', description: 'Tất cả dịch vụ' },
  { category_id: 'S002', name: 'Nhà hàng, cà phê', slug: 'restaurants_cafes_service', type: 'SERVICE', parent_id: '', icon_number: '7', description: 'Dịch vụ ăn uống' },
  { category_id: 'S003', name: 'Du lịch', slug: 'travel_service', type: 'SERVICE', parent_id: '', icon_number: '9', description: 'Du lịch và nghỉ dưỡng' },
  { category_id: 'S004', name: 'Giải trí', slug: 'entertainment_service', type: 'SERVICE', parent_id: '', icon_number: '10', description: 'Giải trí và sự kiện' },
  { category_id: 'S005', name: 'Làm đẹp', slug: 'beauty_service', type: 'SERVICE', parent_id: '', icon_number: '8', description: 'Spa và làm đẹp' },
  { category_id: 'S006', name: 'Sức khỏe', slug: 'health_service', type: 'SERVICE', parent_id: '', icon_number: '', description: 'Y tế và sức khỏe' },
  { category_id: 'S007', name: 'Giáo dục', slug: 'education_service', type: 'SERVICE', parent_id: '', icon_number: '', description: 'Giáo dục và đào tạo' },
  { category_id: 'S008', name: 'Game', slug: 'game_service', type: 'SERVICE', parent_id: '', icon_number: '', description: 'Game và esports' },
  { category_id: 'S009', name: 'Tài chính', slug: 'finance', type: 'SERVICE', parent_id: '', icon_number: '', description: 'Ngân hàng và tài chính' },
  { category_id: 'S010', name: 'Phong thuỷ', slug: 'feng_shui_service', type: 'SERVICE', parent_id: '', icon_number: '', description: 'Phong thuỷ và tâm linh' }
]

export type CategoryDisplay = {
  id: string
  name: string
  slug: string
  icon: string
  bgGradient: string
  iconColor: string
}

export const getDisplayCategories = (): CategoryDisplay[] => {
  const mainCategories = categories.filter(c => c.type === 'MAIN')
  
  const mapping: Record<string, { icon: string, bgGradient: string, iconColor: string }> = {
    'beauty': { 
      icon: 'sparkles', 
      bgGradient: 'from-pink-100 to-rose-100 group-hover:from-pink-200 group-hover:to-rose-200',
      iconColor: 'text-pink-600'
    },
    'technology': { 
      icon: 'device-phone', 
      bgGradient: 'from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200',
      iconColor: 'text-blue-600'
    },
    'food_beverage': { 
      icon: 'shopping-bag', 
      bgGradient: 'from-orange-100 to-amber-100 group-hover:from-orange-200 group-hover:to-amber-200',
      iconColor: 'text-orange-600'
    },
    'travel': { 
      icon: 'map-pin', 
      bgGradient: 'from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200',
      iconColor: 'text-green-600'
    },
    'fashion': { 
      icon: 'squares-2x2', 
      bgGradient: 'from-rose-100 to-pink-100 group-hover:from-rose-200 group-hover:to-pink-200',
      iconColor: 'text-rose-600'
    },
    'lifestyle': { 
      icon: 'heart', 
      bgGradient: 'from-purple-100 to-violet-100 group-hover:from-purple-200 group-hover:to-violet-200',
      iconColor: 'text-purple-600'
    },
    'entertainment': { 
      icon: 'video-camera', 
      bgGradient: 'from-yellow-100 to-amber-100 group-hover:from-yellow-200 group-hover:to-amber-200',
      iconColor: 'text-yellow-600'
    },
    'restaurants_cafes': { 
      icon: 'coffee', 
      bgGradient: 'from-amber-100 to-orange-100 group-hover:from-amber-200 group-hover:to-orange-200',
      iconColor: 'text-amber-600'
    }
  }

  return [
    { id: 'CAT003', name: 'Làm đẹp', slug: 'beauty', ...mapping['beauty'] },
    { id: 'CAT008', name: 'Công nghệ', slug: 'technology', ...mapping['technology'] },
    { id: 'CAT006', name: 'Ẩm thực', slug: 'food_beverage', ...mapping['food_beverage'] },
    { id: 'CAT004', name: 'Du lịch', slug: 'travel', ...mapping['travel'] },
    { id: 'P006', name: 'Thời trang', slug: 'fashion', ...mapping['fashion'] },
    { id: 'CAT007', name: 'Lối sống', slug: 'lifestyle', ...mapping['lifestyle'] },
    { id: 'CAT005', name: 'Giải trí', slug: 'entertainment', ...mapping['entertainment'] },
    { id: 'CAT002', name: 'Nhà hàng, cà phê', slug: 'restaurants_cafes', ...mapping['restaurants_cafes'] }
  ]
}
