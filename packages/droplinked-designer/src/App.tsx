import Editor from "Editor";
import LZString from "lz-string";
import { Data } from "./puck-editor";
import './puck-editor/index.css';
import { EditorMainConfig } from "index";

// Describe the initial data
const initialData: Data = {
  content: [
    {
      type: "headerComponent",
      props: {
        linkManagement: [
          {
            link: {
              label: "Example Link",
              url: "#"
            }
          }
        ],
        id: "headerComponent-012746f3-cc7f-4e4e-baf3-ebc4c6369a18"
      }
    },
    {
      type: "footerComponent",
      props: {
        linkManagement: {
          firstColumn: {
            name: "Useful Links",
            links: [
              { list: { label: "Collections", url: "#" } },
              { list: { label: "Landing Page", url: "#" } }
            ]
          },
          secondColumn: {
            name: "Site Links",
            links: [
              { list: { label: "Home", url: "/" } },
              { list: { label: "Blogs", url: "/blogs" } }
            ]
          }
        },
        id: "footerComponent-012746f3-cc7f-4e4e-baf3-ebc4c6369a18",
        description: {
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et"
        },
        socialChannels: [
          {
            links: {
              type: "social",
              channel: "discord",
              url: "#"
            }
          },
          {
            links: {
              type: "social",
              channel: "linkedin",
              url: "#"
            }
          },
          {
            links: {
              type: "social",
              channel: "twitter",
              url: "#"
            }
          }
        ]
      }
    }
  ],
  root: {
    props: {}
  },
  shopDefaultData: {
    backgroundColor: "#141414",
    headerIcon: "",
    logo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/46be9343e7aedf68e24c6cdefbd4937ad66d1eaa7abb0285da9926545ae5ad48.png_or.png",
    shopDesign: {
      fontfamily: "Nunito Sans",
      backgroundBody: "#141414",
      foreground: "#222222",
      textColorParagraphs: "#fff",
      iconHeaderColor: "#fff",
      isLogoAsFavicon: false,
      faviconURL: ""
    },
    launchDate: null
  }
};

// Save the data to your database
const save = (data) => {
  console.log("main Data:", data)
  const compressedData = LZString.compressToBase64(JSON.stringify(data));
  console.log("Compressed Base64 data :", compressedData);
};

// Render Puck editor
export default function App() {
  return (
    <Editor
      config={EditorMainConfig}
      iframe={{ waitForStyles: true }}
      initialData={initialData}
      onPublish={save}
      onUpdate={save}
    />
  )
}