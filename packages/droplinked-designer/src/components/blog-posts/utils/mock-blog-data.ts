import { BlogDisplayProps } from './types'

export const mockBlogPosts: BlogDisplayProps[] = [
    {
        image: 'https://upload-file-droplinked.s3.amazonaws.com/1330def2d33f7191bc04d067040458a2b5ac925869d374f419c6b681c65a4b33_or.png',
        category: 'Shop',
        updatedAt: new Date('2024-05-01'),
        title: '5 Strategies to Increase Online Sales',
        summary: 'Discover practical strategies to grow your online store sales in this article.',
        tags: ['Sales', 'Online', 'Marketing'],
        slug: 'increase-online-sales',
        direction: 'column',
    },
    {
        image: 'https://upload-file-droplinked.s3.amazonaws.com/cd6f3ce332ce151b942457c598cd1573fbf019edbd6d782cfb0f536a369b545e_or.png',
        category: 'Business',
        updatedAt: new Date('2024-04-15'),
        title: 'Inventory Management for Online Stores',
        summary: 'Learn how proper inventory management can reduce costs and boost customer satisfaction.',
        tags: ['Inventory', 'Management', 'Shop'],
        slug: 'inventory-management-ecommerce',
        direction: 'column',
    },
    {
        image: 'https://upload-file-droplinked.s3.amazonaws.com/140062ff49677771fedfb76bc132da00aa567a0b2ff6b2d258d7f689c64e63c2_or.png',
        category: 'Business',
        updatedAt: new Date('2024-03-20'),
        title: 'Product Pricing Strategies',
        summary: 'Increase your store’s profitability with effective product pricing strategies.',
        tags: ['Pricing', 'Product', 'Profit'],
        slug: 'product-pricing-strategies',
        direction: 'column',
    },
    {
        image: 'https://upload-file-droplinked.s3.amazonaws.com/75630c753f807c2fde9ba4056a90953cd8927a261db9a32fbffdfba0e8485631_or.png',
        category: 'Shop',
        updatedAt: new Date('2024-02-10'),
        title: 'How to Improve Customer Shopping Experience',
        summary: 'Tips to increase customer satisfaction and loyalty for your shop.',
        tags: ['Customer', 'Shopping', 'Loyalty'],
        slug: 'improve-customer-experience',
        direction: 'column',
    }
]
