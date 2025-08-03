import { Link } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { Channels, getSocialMediaLogo } from "lib/utils/getSocialMediaLogo";

interface Props {
    appearance?: { variant?: "secondary" | "outline" | "default" };
    linkTo?: {
        data?: {
            url?: string;
            label?: string;
            type?: "url" | "social";
            channel?: Channels;
        }
    };
}

export default function ButtonComponent({ appearance, linkTo }: Props) {
    const buttonText = linkTo?.data?.label;
    const buttonVariant = appearance?.variant;
    const buttonUrl = linkTo?.data?.url;
    const socialChannel = linkTo?.data?.channel;

    let content: React.ReactNode = buttonText;
    if (linkTo?.data.type === "social" && socialChannel) {
        const Logo = getSocialMediaLogo(socialChannel, true);
        content = Logo ? <Logo /> : buttonText;
    }

    return (
        <Link href={buttonUrl}>
            <Button
                className="min-w-[100px] w-max"
                style={{
                    minWidth: linkTo?.data?.type === "url" ? "100px" : "auto",
                    width: linkTo?.data?.type === "url" ? "max-content" : "min-content",
                }}
                variant={buttonVariant}
            >
                {content}
            </Button>
        </Link>
    );
}
