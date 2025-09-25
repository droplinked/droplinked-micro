import Text from 'components/ui/Text'
import BlogCard from './components/blog-card/BlogCard'
import { mockBlogPosts } from './utils/mock-blog-data'
import AppContainer from 'components/legacy-components/container/AppContainer'

export default function BlogPosts({ text }: { text: string }) {
    return (
        <AppContainer props={{ margin: "auto", paddingBlock: { base: 6, md: "48px" } }}>
            <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <Text className='text-xl font-bold'>{text}</Text>
                    <Text className='text-sm font-bold text-text-link'>All Blogs</Text>
                </div>
                <div className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 lg:gap-6 gap-4'>
                    {mockBlogPosts.map((blog) => (
                        <div className="px-1" key={blog.slug}>
                            <BlogCard {...blog} />
                        </div>
                    ))}
                </div>
            </div>
        </AppContainer>
    )
}