import { Config, Data, Permissions, Puck } from "puck-editor";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
    config: Config;
    iframe?: {
        waitForStyles?: boolean;
        enabled?: boolean;
    };
    initialData: Data;
    isLive?: boolean;
    isNewTheme?: boolean;
    onDraft?: (data: Data) => void;
    onExit?: () => void;
    onPublish?: (data: Data) => void;
    onUpdate?: (data: Data) => void;
    onChange?: (data: Data) => void;
    themeName?: string;
    publishLoading?: boolean;
    draftLoading?: boolean;
    permissions?: Permissions
    children?: React.ReactNode;
}

export default function Editor({
    config,
    iframe,
    initialData,
    isLive,
    isNewTheme,
    onDraft,
    onExit,
    onPublish,
    onUpdate,
    onChange,
    themeName,
    publishLoading,
    draftLoading,
    permissions,
    children
}: Props) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Puck
                config={config}
                iframe={iframe}
                data={initialData}
                isLive={isLive}
                isNewTheme={isNewTheme}
                themeName={themeName}
                publishLoading={publishLoading}
                draftLoading={draftLoading}
                permissions={permissions}
                onDraft={onDraft}
                onExit={onExit}
                onPublish={onPublish}
                onUpdate={onUpdate}
                onChange={onChange}
            >
                {children}
            </Puck>
        </QueryClientProvider>
    );
}
