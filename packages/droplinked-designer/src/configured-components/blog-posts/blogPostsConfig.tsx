import { ComponentMd } from "assets/icon/StyleDesigner/Component/ComponentMd";
import BlogPosts from "components/blog-posts/BlogPosts";
import { Config } from "puck-editor";

export const blogPostsConfig: Config["components"][string] = {
    label: "Blog Posts",
    hideLabel: true,
    labelIcon: <ComponentMd color="#fff" />,
    visualExample: "https://upload-file-droplinked.s3.amazonaws.com/2d1ca942413757b04e5d9d8f451a913276f63484fdd3e5859eec04beabd33799_or.png",
    fields: {
        title: {
            type: "object",
            label: "Title",
            objectFields: {
                text: {
                    type: "textarea",
                }
            }
        }
    },
    defaultProps: {
        title: {
            text: "Discover Our Latest Blogs!"
        }
    },
    render: ({ title: { text } }) => {
        return <BlogPosts text={text} />;
    },
}; 